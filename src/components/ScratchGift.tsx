import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { burst } from '../lib/confetti'

interface ScratchGiftProps {
    message: string
}

/** Kartu gosok: gosok lapisan pink dengan jari untuk melihat pesan di baliknya. */
export function ScratchGift({ message }: ScratchGiftProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const drawing = useRef(false)
    const last = useRef<{ x: number; y: number } | null>(null)
    const [revealed, setRevealed] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const paint = () => {
            const rect = canvas.getBoundingClientRect()
            const dpr = window.devicePixelRatio || 1
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            const ctx = canvas.getContext('2d')!
            ctx.scale(dpr, dpr)
            ctx.fillStyle = '#f7b6cb'
            ctx.fillRect(0, 0, rect.width, rect.height)
            // pola hati kecil
            ctx.fillStyle = 'rgba(229,72,123,0.35)'
            ctx.font = '18px sans-serif'
            for (let y = 22; y < rect.height + 20; y += 34) {
                for (let x = (y / 34) % 2 ? 10 : 28; x < rect.width; x += 36) ctx.fillText('♥', x, y)
            }
            ctx.fillStyle = '#1f2a44'
            ctx.font = '600 22px "Shantell Sans Variable", cursive'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('Gosok di sini', rect.width / 2, rect.height / 2)
        }
        // tunggu font siap supaya tulisan di lapisan gosok memakai font tangan
        document.fonts.ready.then(paint)
    }, [])

    const pointAt = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!drawing.current || revealed) return
        const ctx = e.currentTarget.getContext('2d')!
        const p = pointAt(e)
        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineWidth = 42
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(last.current?.x ?? p.x, last.current?.y ?? p.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
        last.current = p
    }

    const checkCleared = () => {
        const canvas = canvasRef.current
        if (!canvas || revealed) return
        const ctx = canvas.getContext('2d')!
        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
        let clear = 0
        let total = 0
        for (let i = 3; i < data.length; i += 4 * 16) {
            total++
            if (data[i] === 0) clear++
        }
        if (clear / total > 0.5) {
            setRevealed(true)
            const r = canvas.getBoundingClientRect()
            burst((r.left + r.width / 2) / window.innerWidth, (r.top + r.height / 2) / window.innerHeight)
        }
    }

    return (
        <section className="px-5 py-16 text-center">
            <h2 className="font-hand text-3xl font-semibold text-paper">Ada kado kecil</h2>
            <p className="mt-2 text-base text-paper/75">Gosok kartunya pakai jari.</p>

            <div className="relative mx-auto mt-8 aspect-[3/2] w-full max-w-[340px] -rotate-1 overflow-hidden rounded-xl bg-paper shadow-[0_20px_36px_-14px_rgb(0_0_0/0.5)]">
                <div className="absolute inset-0 grid place-items-center p-6">
                    <p className="font-hand text-xl font-medium leading-snug text-ink">“{message}”</p>
                </div>
                <motion.canvas
                    ref={canvasRef}
                    aria-label="Lapisan kartu gosok"
                    role="img"
                    animate={{ opacity: revealed ? 0 : 1 }}
                    transition={{ duration: 0.6 }}
                    className={`absolute inset-0 size-full touch-none ${revealed ? 'pointer-events-none' : 'cursor-crosshair'}`}
                    onPointerDown={(e) => {
                        drawing.current = true
                        last.current = pointAt(e)
                        e.currentTarget.setPointerCapture(e.pointerId)
                        scratch(e)
                    }}
                    onPointerMove={scratch}
                    onPointerUp={() => {
                        drawing.current = false
                        last.current = null
                        checkCleared()
                    }}
                    onPointerCancel={() => {
                        drawing.current = false
                        last.current = null
                    }}
                />
            </div>

            {!revealed && (
                <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="mt-5 cursor-pointer text-sm text-paper/60 underline underline-offset-4 hover:text-paper"
                >
                    Buka langsung tanpa digosok
                </button>
            )}
        </section>
    )
}
