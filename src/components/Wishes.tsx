import { TinyHeart } from './Doodle'

interface WishesProps {
    wishes: string[]
}

/** Daftar doa, ditulis langsung di atas latar biru. */
export function Wishes({ wishes }: WishesProps) {
    return (
        <section className="px-5 py-16">
            <div className="mx-auto max-w-[420px]">
                <h2 className="font-hand text-3xl font-semibold text-paper">Doa untukmu</h2>
                <ul className="mt-6 space-y-5">
                    {wishes.map((wish) => (
                        <li key={wish} className="flex gap-4 text-lg leading-snug text-paper/90">
                            <TinyHeart className="mt-1 size-5 shrink-0 text-booth" />
                            <span>{wish}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
