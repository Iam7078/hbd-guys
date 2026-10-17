import confetti from 'canvas-confetti'

const colors = ['#f7b6cb', '#e5487b', '#ffc94d', '#fffdfb', '#8fb3e6']

/** Ledakan konfeti dari dua sisi bawah layar. */
export function celebrate() {
    const base = { colors, disableForReducedMotion: true, zIndex: 60, ticks: 260 }
    confetti({ ...base, particleCount: 90, angle: 60, spread: 70, origin: { x: 0, y: 0.85 } })
    confetti({ ...base, particleCount: 90, angle: 120, spread: 70, origin: { x: 1, y: 0.85 } })
}

/** Semburan kecil dari titik tertentu (0–1 dari lebar/tinggi layar). */
export function burst(x: number, y: number) {
    confetti({
        colors,
        disableForReducedMotion: true,
        zIndex: 60,
        particleCount: 50,
        spread: 80,
        startVelocity: 30,
        origin: { x, y },
    })
}
