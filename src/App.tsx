import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { CakeSection } from './components/CakeSection'
import { CoverScreen } from './components/CoverScreen'
import { Ending } from './components/Ending'
import { Hero } from './components/Hero'
import { Letter } from './components/Letter'
import { MusicToggle } from './components/MusicToggle'
import { PhotoStack } from './components/PhotoStack'
import { ScratchGift } from './components/ScratchGift'
import { Wishes } from './components/Wishes'
import { card, photos } from './config'

export default function App() {
    const [isOpened, setIsOpened] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const play = () => {
        audioRef.current
            ?.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false))
    }

    const handleOpen = () => {
        setIsOpened(true)
        window.scrollTo(0, 0)
        play()
    }

    const toggleMusic = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        } else {
            play()
        }
    }

    // Kecilkan musik selama mikrofon dipakai, supaya lagu tidak dianggap tiupan.
    const duckMusic = useCallback((listening: boolean) => {
        if (audioRef.current) audioRef.current.volume = listening ? 0.12 : 1
    }, [])

    return (
        <div id="top" className="min-h-[100svh] overflow-x-clip bg-denim">
            <audio ref={audioRef} loop playsInline preload="auto" src="/music.mp3" onPause={() => setIsPlaying(false)} />

            <AnimatePresence mode="wait">
                {!isOpened ? (
                    <CoverScreen key="cover" nickname={card.nickname} onOpen={handleOpen} />
                ) : (
                    <motion.main key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <MusicToggle playing={isPlaying} onToggle={toggleMusic} />
                        <Hero name={card.name} nickname={card.nickname} photo={photos[0].src} />
                        <CakeSection candles={card.candles} onListeningChange={duckMusic} />
                        <Letter nickname={card.nickname} paragraphs={card.letter} sender={card.sender} />
                        <PhotoStack photos={photos} />
                        <ScratchGift message={card.gift} />
                        <Wishes wishes={card.wishes} />
                        <Ending name={card.name} nickname={card.nickname} sender={card.sender} whatsapp={card.whatsapp} />
                    </motion.main>
                )}
            </AnimatePresence>
        </div>
    )
}
