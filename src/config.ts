import type { PhotoItem } from './types'

/**
 * Semua isi kartu ada di sini — ganti teks/foto cukup dari file ini.
 */
export const card = {
    name: 'Siti Rubiah Arramadhani',
    nickname: 'Rubiah',

    /** Nama pengirim untuk tanda tangan surat. Kosongkan kalau tidak mau ditulis. */
    sender: '',

    /**
     * Nomor WhatsApp pengirim (format internasional tanpa +, mis. 6281234567890).
     * Kalau diisi, muncul tombol "Balas lewat WhatsApp" di akhir halaman.
     */
    whatsapp: '',

    /** Jumlah lilin di atas kue. */
    candles: 5,

    letter: [
        'Selamat ulang tahun ya! 🎉',
        'Di hari yang indah ini, aku cuma mau bilang terima kasih karena kamu sudah hadir dan membawa banyak warna manis di sekitarmu.',
        'Semoga di usiamu yang baru ini kamu selalu diberi kesehatan, kelancaran dalam setiap urusan, hati yang lapang dan penuh syukur, serta impian-impian besar yang perlahan terwujud satu per satu.',
        'Tetaplah jadi sosok yang hangat, penuh kebaikan, dan selalu menebarkan kebahagiaan. Hari ini harimu, nikmati setiap momennya! ❤️',
        'Kado sudah aku berikan yaw ❤️❤️❤️',
    ],

    gift: 'Tidak ada hadiah yang lebih indah selain melihatmu selalu tersenyum bahagia setiap harinya.',

    wishes: [
        'Selalu diberi kesehatan fisik dan kedamaian hati',
        'Langkah dan urusannya selalu dipermudah oleh Allah SWT',
        'Dikelilingi orang-orang yang tulus dan menyayanginya',
        'Setiap impian dan cita-cita besarnya terwujud',
    ],
}

export const photos: PhotoItem[] = [
    { src: '/image-1.webp', title: 'Momen kebersamaan pertama', desc: 'Potret hangat yang selalu bikin senyum kalau diingat.' },
    { src: '/image-2.webp', title: 'Tawa & canda', desc: 'Saat-saat sederhana yang terasa begitu berharga.' },
    { src: '/image-3.webp', title: 'Jalan-jalan singkat', desc: 'Setiap perjalanan selalu jadi cerita manis.' },
    { src: '/image-4.webp', title: 'Senyuman favorit', desc: 'Bahagiamu selalu menular ke sekitar.' },
    { src: '/image-5.webp', title: 'Potret hangat', desc: 'Waktu bersama selalu terasa cepat, tapi berkesan.' },
    { src: '/image-6.webp', title: 'Hari yang menyenangkan', desc: 'Satu lagi kenangan yang tersimpan rapi.' },
    { src: '/image-7.webp', title: 'Harapan & kenangan', desc: 'Semoga masih banyak momen bahagia di depan.' },
]
