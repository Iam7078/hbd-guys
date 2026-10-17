import { motion, useReducedMotion } from 'framer-motion'

interface DoodleProps {
    className?: string
    /** Gambar garisnya pelan-pelan saat muncul. */
    draw?: boolean
    delay?: number
    /** Regangkan mengikuti ukuran wadah (garis tetap sama tebal). */
    stretch?: boolean
}

/** Coretan hati ala spidol photobooth. */
export function DoodleHeart({ className, draw = false, delay = 0, stretch = false }: DoodleProps) {
    const reduce = useReducedMotion()
    const animate = draw && !reduce
    const path =
        'M100 172 C 58 140, 14 108, 16 66 C 18 28, 64 14, 96 52 C 108 20, 160 8, 182 44 C 204 84, 160 128, 104 170'
    const path2 =
        'M106 166 C 62 138, 24 104, 26 68 C 30 34, 70 24, 98 58 C 116 26, 160 22, 176 50 C 192 82, 154 122, 100 172'

    return (
        <svg
            viewBox="0 0 200 190"
            fill="none"
            aria-hidden="true"
            className={className}
            preserveAspectRatio={stretch ? 'none' : undefined}
        >
            {[path, path2].map((d, i) => (
                <motion.path
                    key={i}
                    d={d}
                    stroke="currentColor"
                    strokeWidth={i === 0 ? 7 : 4}
                    vectorEffect={stretch ? 'non-scaling-stroke' : undefined}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={animate ? { pathLength: 0 } : false}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: delay + i * 0.35, ease: [0.65, 0, 0.35, 1] }}
                />
            ))}
        </svg>
    )
}

/** Hati kecil untuk bullet. */
export function TinyHeart({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 22" aria-hidden="true" className={className}>
            <path
                d="M12 20 C 6 15, 2 11, 2.5 7 C 3 3, 8 1.5, 12 6 C 15 1.5, 21 2, 21.5 7 C 22 11, 18 15, 12 20 Z"
                fill="currentColor"
            />
        </svg>
    )
}

/** Bintang coretan. */
export function DoodleStar({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
            <path
                d="M20 4 L23.5 15.5 L36 16 L26 23.5 L30 35.5 L20 28 L10 35.5 L14 23.5 L4 16 L16.5 15.5 Z"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinejoin="round"
            />
        </svg>
    )
}
