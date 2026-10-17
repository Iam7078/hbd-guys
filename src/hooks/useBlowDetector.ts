import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * - insecure: halaman dibuka lewat http:// (bukan https/localhost) → browser memblokir mikrofon
 * - denied: izin mikrofon ditolak
 * - unsupported: browser tidak punya API mikrofon
 */
export type BlowStatus = 'idle' | 'starting' | 'listening' | 'denied' | 'insecure' | 'unsupported'

type AudioCtxCtor = typeof AudioContext

/**
 * Mendeteksi tiupan ke mikrofon. Tiupan = suara keras berfrekuensi rendah
 * yang bertahan beberapa frame. `onBlow` dipanggil berulang selama tiupan
 * berlangsung (kira-kira tiap 220 ms).
 */
export function useBlowDetector(onBlow: () => void) {
    const [status, setStatus] = useState<BlowStatus>('idle')
    const [level, setLevel] = useState(0)
    const streamRef = useRef<MediaStream | null>(null)
    const ctxRef = useRef<AudioContext | null>(null)
    const rafRef = useRef<number>(0)
    const onBlowRef = useRef(onBlow)

    useEffect(() => {
        onBlowRef.current = onBlow
    }, [onBlow])

    const stop = useCallback(() => {
        cancelAnimationFrame(rafRef.current)
        streamRef.current?.getTracks().forEach((t) => t.stop())
        ctxRef.current?.close().catch(() => {})
        streamRef.current = null
        ctxRef.current = null
        setLevel(0)
        setStatus((s) => (s === 'listening' || s === 'starting' ? 'idle' : s))
    }, [])

    const start = useCallback(async () => {
        // Mikrofon hanya diizinkan di https:// atau localhost.
        if (!window.isSecureContext) {
            setStatus('insecure')
            return
        }
        const Ctor: AudioCtxCtor | undefined =
            window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioCtxCtor }).webkitAudioContext
        if (!navigator.mediaDevices?.getUserMedia || !Ctor) {
            setStatus('unsupported')
            return
        }

        // AudioContext WAJIB dibuat & di-resume langsung di dalam sentuhan pengguna,
        // sebelum menunggu izin. Kalau dibuat setelah dialog izin, Safari/Chrome HP
        // bisa membiarkannya "suspended" sehingga semua angka mikrofon = 0.
        const ctx = new Ctor()
        ctx.resume().catch(() => {})
        ctxRef.current = ctx
        setStatus('starting')

        let stream: MediaStream
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: { echoCancellation: true, noiseSuppression: false, autoGainControl: false },
            })
        } catch {
            ctx.close().catch(() => {})
            ctxRef.current = null
            setStatus('denied')
            return
        }
        if (ctx.state !== 'running') await ctx.resume().catch(() => {})

        const source = ctx.createMediaStreamSource(stream)
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 512
        analyser.smoothingTimeConstant = 0.3
        source.connect(analyser)
        streamRef.current = stream
        setStatus('listening')

        const bins = new Uint8Array(analyser.frequencyBinCount)
        // Hanya pita rendah (~0–1 kHz), tempat suara tiupan paling kuat.
        const lowBins = Math.max(4, Math.round((1000 / (ctx.sampleRate / 2)) * bins.length))
        const startedAt = performance.now()
        let baseline = 0
        let samples = 0
        let loudSince = 0
        let lastBlow = 0

        const tick = (now: number) => {
            analyser.getByteFrequencyData(bins)
            let sum = 0
            for (let i = 0; i < lowBins; i++) sum += bins[i]
            const avg = sum / lowBins

            // Kalibrasi kebisingan ruangan selama 500 ms pertama.
            if (now - startedAt < 500) {
                baseline = (baseline * samples + avg) / (samples + 1)
                samples++
            } else {
                // Ambang relatif terhadap kebisingan ruangan, supaya mikrofon HP yang pelan tetap terdeteksi.
                const threshold = Math.min(200, Math.max(70, baseline + 40))
                setLevel(Math.min(1, avg / threshold))
                if (avg > threshold) {
                    if (!loudSince) loudSince = now
                    if (now - loudSince > 100 && now - lastBlow > 220) {
                        lastBlow = now
                        onBlowRef.current()
                    }
                } else {
                    loudSince = 0
                }
            }
            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
    }, [])

    useEffect(() => stop, [stop])

    return { status, level, start, stop }
}
