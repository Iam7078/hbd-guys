import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { DoodleHeart, DoodleStar } from './Doodle'

interface HeroProps {
    name: string
    nickname: string
    photo: string
}

/** Pembuka: nama besar + cetakan photobooth yang ditempel selotip. */
export function Hero({ name, nickname, photo }: HeroProps) {
    const reduce = useReducedMotion()
    const rise = (delay: number) =>
        reduce
            ? {}
            : {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
              }

    return (
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-20 pt-20 text-center">
            <div className="relative aspect-[200/190] w-[min(90vw,360px)]">
                <DoodleHeart
                    draw
                    delay={0.5}
                    className="pointer-events-none absolute inset-0 size-full text-hot/85"
                />
                <div className="absolute inset-x-0 top-[28%]">
                <motion.p {...rise(0.1)} className="font-hand text-xl text-booth">
                    Selamat ulang tahun,
                </motion.p>
                <motion.h1
                    {...rise(0.2)}
                    className="relative font-hand text-[clamp(3.25rem,16vw,4rem)] font-bold leading-none tracking-tight text-paper"
                >
                    {nickname}
                </motion.h1>
                </div>
            </div>

            <motion.figure
                initial={reduce ? false : { opacity: 0, y: 40, rotate: 6 }}
                animate={{ opacity: 1, y: 0, rotate: -3 }}
                transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.9 }}
                className="relative -mt-8 w-full max-w-[330px] bg-paper p-3 pb-10 shadow-[0_24px_40px_-14px_rgb(0_0_0/0.5)]"
            >
                <span className="tape absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-2" />
                <img
                    src={photo}
                    alt={`Foto photobooth bersama ${nickname}`}
                    width={643}
                    height={445}
                    className="aspect-[643/445] w-full object-cover"
                />
                <figcaption className="absolute bottom-2.5 left-0 right-0 font-hand text-sm text-ink/70">
                    {name}
                </figcaption>
                <DoodleStar className="absolute -right-5 -top-6 w-10 rotate-12 text-flame" />
            </motion.figure>

            <motion.a
                href="#kue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-6 flex flex-col items-center gap-1 text-sm text-paper/60"
            >
                Gulir ke bawah
                <ChevronDown className="size-4 motion-safe:animate-bounce" />
            </motion.a>
        </section>
    )
}
