import { motion } from 'framer-motion'
import { DoodleHeart, DoodleStar } from './Doodle'

interface CoverScreenProps {
    nickname: string
    onOpen: () => void
}

/** Layar pembuka: amplop yang dibuka dengan sekali sentuh. */
export function CoverScreen({ nickname, onOpen }: CoverScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40, transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 overflow-hidden bg-denim px-6 text-center"
        >
            <DoodleStar className="absolute left-[12%] top-[14%] w-8 rotate-12 text-booth/70" />
            <DoodleStar className="absolute bottom-[18%] right-[10%] w-6 -rotate-6 text-flame/70" />

            <motion.button
                type="button"
                onClick={onOpen}
                initial={{ y: 30, rotate: -4, opacity: 0 }}
                animate={{ y: 0, rotate: -3, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.15 }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                aria-label={`Buka kartu ucapan untuk ${nickname}`}
                className="relative aspect-[3/2] w-full max-w-[320px] cursor-pointer rounded-md bg-paper shadow-[0_24px_40px_-12px_rgb(0_0_0/0.45)]"
            >
                {/* Lipatan amplop */}
                <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
                    <path d="M0 0 L150 112 L300 0" fill="none" stroke="#e8dcd6" strokeWidth="2" />
                    <path d="M0 200 L118 92 M300 200 L182 92" fill="none" stroke="#efe5e0" strokeWidth="2" />
                </svg>
                {/* Segel hati */}
                <span className="absolute left-1/2 top-[56%] grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-hot text-paper shadow-md">
                    <DoodleHeart className="w-9" />
                </span>
                <span className="absolute bottom-3 left-4 font-hand text-sm text-ink/70">untuk: {nickname}</span>
            </motion.button>

            <div className="space-y-3">
                <h1 className="font-hand text-3xl font-semibold leading-tight text-paper">
                    Ada surat untuk {nickname}
                </h1>
                <p className="mx-auto max-w-[26ch] text-base text-paper/75">
                    Sentuh amplopnya untuk membuka. Nyalakan suara, ada lagunya.
                </p>
            </div>

            <motion.button
                type="button"
                onClick={onOpen}
                whileTap={{ scale: 0.96 }}
                className="cursor-pointer rounded-full bg-booth px-8 py-3.5 font-hand text-lg font-semibold text-ink shadow-[0_6px_0_0_var(--color-hot)] transition-transform active:translate-y-1 active:shadow-[0_2px_0_0_var(--color-hot)]"
            >
                Buka suratnya
            </motion.button>
        </motion.div>
    )
}
