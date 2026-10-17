import { motion } from 'framer-motion'
import { VolumeX } from 'lucide-react'

interface MusicToggleProps {
    playing: boolean
    onToggle: () => void
}

/** Tombol musik berbentuk piringan hitam yang berputar saat lagu jalan. */
export function MusicToggle({ playing, onToggle }: MusicToggleProps) {
    return (
        <motion.button
            type="button"
            onClick={onToggle}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileTap={{ scale: 0.9 }}
            aria-label={playing ? 'Matikan musik' : 'Putar musik'}
            aria-pressed={playing}
            className="fixed right-4 top-[max(1rem,env(safe-area-inset-top))] z-40 grid size-12 cursor-pointer place-items-center rounded-full bg-ink shadow-lg ring-2 ring-paper/20"
        >
            {playing ? (
                <span className="spin-slow relative grid size-10 place-items-center rounded-full bg-[repeating-radial-gradient(circle,#2a3555_0_2px,#1f2a44_2px_4px)]">
                    <span className="size-3.5 rounded-full bg-booth" />
                </span>
            ) : (
                <VolumeX className="size-5 text-paper/80" />
            )}
        </motion.button>
    )
}
