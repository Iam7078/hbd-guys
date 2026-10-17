import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { PhotoItem } from '../types'

interface PhotoStackProps {
    photos: PhotoItem[]
}

const tilt = [-3, 2.5, -1.5, 3, -2.5, 1.5, -2]

/** Tumpukan foto polaroid: geser (swipe) atau sentuh tombol untuk foto berikutnya. */
export function PhotoStack({ photos }: PhotoStackProps) {
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const total = photos.length

    const go = (step: number) => {
        setDirection(step)
        setIndex((i) => (i + step + total) % total)
    }

    const onDragEnd = (_: unknown, info: PanInfo) => {
        if (info.offset.x < -70 || info.velocity.x < -400) go(1)
        else if (info.offset.x > 70 || info.velocity.x > 400) go(-1)
    }

    // Dua foto berikutnya ditampilkan di belakang sebagai tumpukan.
    const behind = [2, 1].map((n) => photos[(index + n) % total])

    return (
        <section className="px-5 py-16 text-center">
            <h2 className="font-hand text-3xl font-semibold text-paper">Kumpulan momen kita</h2>
            <p className="mt-2 text-base text-paper/75">Geser fotonya ke samping.</p>

            <div className="relative mx-auto mt-10 aspect-[4/5] w-full max-w-[320px]">
                {behind.map((p, i) => (
                    <div
                        key={p.src + i}
                        aria-hidden="true"
                        className="absolute inset-0 bg-paper shadow-lg"
                        style={{ transform: `rotate(${i === 0 ? 5 : -4}deg) translateY(${i === 0 ? 10 : 5}px)`, opacity: 0.9 }}
                    />
                ))}

                <AnimatePresence initial={false} custom={direction}>
                    <motion.figure
                        key={index}
                        custom={direction}
                        drag="x"
                        dragSnapToOrigin
                        onDragEnd={onDragEnd}
                        initial={{ opacity: 0, x: direction * 80, rotate: direction * 8 }}
                        animate={{ opacity: 1, x: 0, rotate: tilt[index % tilt.length] }}
                        exit={{ opacity: 0, x: direction * -220, rotate: direction * -14, transition: { duration: 0.3 } }}
                        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                        className="absolute inset-0 flex cursor-grab touch-pan-y flex-col bg-paper p-3 pb-0 text-left shadow-[0_24px_40px_-14px_rgb(0_0_0/0.5)] active:cursor-grabbing"
                    >
                        <img
                            src={photos[index].src}
                            alt={photos[index].title}
                            draggable={false}
                            className="min-h-0 w-full flex-1 bg-denim-deep object-cover"
                        />
                        <figcaption className="px-1 py-3 text-ink">
                            <span className="block font-hand text-lg font-semibold leading-tight">{photos[index].title}</span>
                            <span className="mt-0.5 block text-sm text-ink/65">{photos[index].desc}</span>
                        </figcaption>
                    </motion.figure>
                </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6">
                <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Foto sebelumnya"
                    className="grid size-11 cursor-pointer place-items-center rounded-full text-paper ring-1 ring-paper/30 hover:bg-paper/10"
                >
                    <ChevronLeft className="size-5" />
                </button>
                <span className="min-w-12 font-hand text-lg text-paper/80" aria-live="polite">
                    {index + 1} / {total}
                </span>
                <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Foto berikutnya"
                    className="grid size-11 cursor-pointer place-items-center rounded-full text-paper ring-1 ring-paper/30 hover:bg-paper/10"
                >
                    <ChevronRight className="size-5" />
                </button>
            </div>

            {/* Preload foto berikutnya agar geser terasa instan */}
            <link rel="preload" as="image" href={photos[(index + 1) % total].src} />
        </section>
    )
}
