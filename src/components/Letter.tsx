interface LetterProps {
    nickname: string
    paragraphs: string[]
    sender: string
}

/** Surat di atas kertas bergaris yang ditempel selotip. */
export function Letter({ nickname, paragraphs, sender }: LetterProps) {
    return (
        <section className="px-5 py-16">
            <article className="relative mx-auto max-w-[420px] rotate-[0.6deg] rounded-sm bg-paper px-6 pb-8 pt-10 text-ink shadow-[0_24px_40px_-16px_rgb(0_0_0/0.5)]">
                <span className="tape absolute -top-3 left-6 h-7 w-20 -rotate-6" />
                <span className="tape absolute -top-3 right-6 h-7 w-20 rotate-3" />

                <div className="ruled space-y-4 text-[17px] leading-8">
                    <h2 className="font-hand text-2xl font-semibold text-hot">Halo {nickname},</h2>
                    {paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>

                <p className="mt-8 text-right font-hand text-xl text-ink/80">
                    Dengan sayang,
                    {sender && (
                        <>
                            <br />
                            <span className="text-2xl font-semibold text-hot">{sender}</span>
                        </>
                    )}
                </p>
            </article>
        </section>
    )
}
