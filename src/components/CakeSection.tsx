import { AnimatePresence, motion } from 'framer-motion'
import { Mic, MicOff, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useBlowDetector, type BlowStatus } from '../hooks/useBlowDetector'
import { celebrate } from '../lib/confetti'

interface CakeSectionProps {
    candles: number
    /** Dipanggil saat mikrofon aktif/nonaktif — dipakai untuk mengecilkan musik. */
    onListeningChange?: (listening: boolean) => void
}

const VIEW_W = 300

const micMessage: Partial<Record<BlowStatus, string>> = {
    insecure: 'Mikrofon hanya bisa dipakai kalau link-nya https://. Untuk sekarang, sentuh apinya saja.',
    denied: 'Izin mikrofon ditolak. Ketuk ikon gembok di samping alamat web, izinkan Mikrofon, lalu coba lagi. Atau sentuh apinya saja.',
    unsupported: 'Browser ini tidak mendukung mikrofon. Sentuh apinya saja untuk meniup.',
}

/** Kue dengan lilin yang bisa ditiup sungguhan lewat mikrofon, atau disentuh satu per satu. */
export function CakeSection({ candles, onListeningChange }: CakeSectionProps) {
    const [lit, setLit] = useState<boolean[]>(() => Array(candles).fill(true))
    const allOut = lit.every((l) => !l)

    const blowOne = (index?: number) =>
        setLit((prev) => {
            const next = [...prev]
            const i = index ?? next.findIndex(Boolean)
            if (i >= 0) next[i] = false
            return next
        })

    const mic = useBlowDetector(() => blowOne())
    const listening = mic.status === 'listening'

    useEffect(() => {
        onListeningChange?.(listening)
    }, [listening, onListeningChange])

    useEffect(() => {
        if (allOut) {
            mic.stop()
            celebrate()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allOut])

    const relight = () => setLit(Array(candles).fill(true))

    const spacing = 150 / Math.max(1, candles - 1)
    const candleX = (i: number) => (candles === 1 ? VIEW_W / 2 : 75 + i * spacing)
    const hue = ['#f7b6cb', '#ffc94d', '#8fb3e6', '#fffdfb', '#e5487b']

    return (
        <section id="kue" className="scroll-mt-6 px-5 py-16 text-center">
            <h2 className="font-hand text-3xl font-semibold text-paper">Tiup lilinnya dulu</h2>
            <p className="mx-auto mt-2 max-w-[30ch] text-base text-paper/75">
                {allOut
                    ? 'Semoga semua yang kamu minta tadi terkabul.'
                    : 'Pejamkan mata, buat permohonan, lalu tiup ke mikrofon HP-mu. Atau sentuh apinya satu per satu.'}
            </p>

            <div className="relative mx-auto mt-8 max-w-[340px]">
                <svg viewBox={`0 0 ${VIEW_W} 270`} className="w-full overflow-visible" role="img" aria-label={`Kue ulang tahun dengan ${lit.filter(Boolean).length} lilin menyala`}>
                    {/* piring */}
                    <ellipse cx="150" cy="250" rx="140" ry="14" fill="#1d365e" />
                    <ellipse cx="150" cy="244" rx="130" ry="12" fill="#fffdfb" />
                    {/* tingkat bawah */}
                    <rect x="35" y="160" width="230" height="84" rx="12" fill="#f7b6cb" />
                    <path d="M35 190 h230" stroke="#fffdfb" strokeWidth="5" strokeDasharray="2 12" strokeLinecap="round" />
                    {/* tingkat atas */}
                    <rect x="60" y="100" width="180" height="66" rx="12" fill="#fffdfb" />
                    <path
                        d="M60 112 q0 -12 12 -12 h156 q12 0 12 12 v8 q-10 0 -12 10 q-3 12 -9 0 q-4 -10 -14 -6 q-8 4 -10 14 q-3 10 -8 0 q-4 -16 -18 -10 q-9 4 -10 12 q-3 8 -7 0 q-5 -14 -20 -8 q-6 3 -8 10 q-3 9 -8 0 q-4 -12 -16 -10 q-10 2 -12 10 q-3 8 -7 0 q-3 -10 -12 -10 z"
                        fill="#e5487b"
                    />
                    {/* lilin */}
                    {lit.map((on, i) => {
                        const x = candleX(i)
                        return (
                            <g key={i}>
                                <rect x={x - 5} y="56" width="10" height="46" rx="3" fill={hue[i % hue.length]} />
                                <path d={`M${x - 5} 66 l10 -6 M${x - 5} 80 l10 -6 M${x - 5} 94 l10 -6`} stroke="#1f2a44" strokeOpacity="0.15" strokeWidth="2" />
                                <path d={`M${x} 56 v-6`} stroke="#1f2a44" strokeWidth="2" strokeLinecap="round" />
                                <AnimatePresence>
                                    {on ? (
                                        <motion.g
                                            key="flame"
                                            exit={{ opacity: 0, scale: 0.2, y: -6 }}
                                            transition={{ duration: 0.25 }}
                                            style={{ transformOrigin: `${x}px 52px` }}
                                        >
                                            <circle cx={x} cy="38" r="16" fill="#ffc94d" opacity="0.18" />
                                            <path
                                                className="flame"
                                                d={`M${x} 52 c-8 -4 -9 -14 -3 -22 c2 -3 3 -6 3 -10 c6 6 11 14 8 22 c-1 6 -4 9 -8 10 z`}
                                                fill="#ffc94d"
                                            />
                                            <path
                                                className="flame"
                                                d={`M${x} 51 c-3 -2 -4 -7 -1 -11 c1 3 3 5 3 8 c0 1 -1 3 -2 3 z`}
                                                fill="#fffdfb"
                                            />
                                        </motion.g>
                                    ) : (
                                        <motion.path
                                            key="smoke"
                                            d={`M${x} 48 c-6 -8 6 -12 0 -20 c-6 -8 6 -12 0 -18`}
                                            fill="none"
                                            stroke="#fffdfb"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            initial={{ opacity: 0.8, pathLength: 0 }}
                                            animate={{ opacity: 0, pathLength: 1, y: -14 }}
                                            transition={{ duration: 1.6 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </g>
                        )
                    })}
                </svg>

                {/* Area sentuh tiap lilin (lebih besar dari apinya) */}
                {lit.map((on, i) =>
                    on ? (
                        <button
                            key={i}
                            type="button"
                            onClick={() => blowOne(i)}
                            aria-label={`Tiup lilin ke-${i + 1}`}
                            className="absolute top-0 h-[40%] w-11 -translate-x-1/2 cursor-pointer rounded-full"
                            style={{ left: `${(candleX(i) / VIEW_W) * 100}%` }}
                        />
                    ) : null,
                )}
            </div>

            <div className="mt-8 flex min-h-14 flex-col items-center gap-3">
                {allOut ? (
                    <button
                        type="button"
                        onClick={relight}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-paper/80 ring-1 ring-paper/30 hover:bg-paper/10"
                    >
                        <RotateCcw className="size-4" /> Nyalakan lagi
                    </button>
                ) : listening || mic.status === 'starting' ? (
                    <>
                        <p className="text-sm text-paper/70">
                            {mic.status === 'starting' ? 'Izinkan mikrofon dulu ya…' : 'Tiup sekarang! Dekatkan HP ke mulut.'}
                        </p>
                        <div className="h-2 w-48 overflow-hidden rounded-full bg-denim-deep" aria-hidden="true">
                            <div className="h-full rounded-full bg-flame transition-[width] duration-75" style={{ width: `${mic.level * 100}%` }} />
                        </div>
                        <button
                            type="button"
                            onClick={mic.stop}
                            className="inline-flex cursor-pointer items-center gap-2 text-sm text-paper/70 underline-offset-4 hover:underline"
                        >
                            <MicOff className="size-4" /> Matikan mikrofon
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={mic.start}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-flame px-6 py-3 font-hand text-lg font-semibold text-ink shadow-[0_5px_0_0_#c9952a] active:translate-y-1 active:shadow-[0_1px_0_0_#c9952a]"
                        >
                            <Mic className="size-5" /> Tiup pakai mikrofon
                        </button>
                        {micMessage[mic.status] && (
                            <p role="status" className="max-w-[34ch] text-sm leading-relaxed text-booth">
                                {micMessage[mic.status]}
                            </p>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}
