import { ArrowUp, MessageCircle } from 'lucide-react'
import { celebrate } from '../lib/confetti'
import { DoodleHeart } from './Doodle'

interface EndingProps {
    name: string
    nickname: string
    sender: string
    whatsapp: string
}

/** Penutup: ucapan terakhir, balas lewat WhatsApp, dan kembali ke atas. */
export function Ending({ name, nickname, sender, whatsapp }: EndingProps) {
    const reply = `Makasih ya${sender ? ` ${sender}` : ''}, kartu ulang tahunnya sudah aku buka 🥹❤️`
    const waLink = whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(reply)}` : ''

    return (
        <section className="px-5 pb-12 pt-20 text-center">
            <button
                type="button"
                onClick={celebrate}
                aria-label="Rayakan sekali lagi"
                className="mx-auto block w-28 cursor-pointer text-hot transition-transform hover:scale-105 active:scale-95"
            >
                <DoodleHeart />
            </button>
            <p className="mt-6 font-hand text-3xl font-semibold leading-tight text-paper">
                Sekali lagi, selamat ulang tahun, {nickname}.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
                {waLink && (
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-booth px-6 py-3 font-hand text-lg font-semibold text-ink shadow-[0_5px_0_0_var(--color-hot)] active:translate-y-1 active:shadow-[0_1px_0_0_var(--color-hot)]"
                    >
                        <MessageCircle className="size-5" /> Balas lewat WhatsApp
                    </a>
                )}
                <a
                    href="#top"
                    className="inline-flex items-center gap-2 text-sm text-paper/70 underline-offset-4 hover:underline"
                >
                    <ArrowUp className="size-4" /> Kembali ke atas
                </a>
            </div>

            <footer className="mt-16 text-sm text-paper/50">
                Untuk {name}
                {sender ? `, dari ${sender}` : ''}.
            </footer>
        </section>
    )
}
