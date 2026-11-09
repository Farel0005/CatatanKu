# CatatanKu - Beranda

Implementasi halaman **Beranda** dari wireframe Tugas 1 (aplikasi web CatatanKu: tempat berbagi dan mencari catatan serta soal latihan kuliah). Dibuat dengan HTML, CSS, dan JavaScript murni tanpa framework atau library.

## Komponen
| # | Komponen | Berkas / selektor |
|---|---|---|
| 1 | Header (bilah atas) | `index.html` `.app-bar` |
| 2 | Kolom pencarian | `.search`, `#cari` |
| 3 | Chip mata kuliah | `.chips`, `.chip` |
| 4 | Kartu materi | `#daftar-materi`, `.card` (dibuat di `script.js`) |
| 5 | Navigasi tab bawah | `.bottom-nav`, `.tab` |
| 6 | Toast pesan | `#toast` |

## Struktur proyek
```
.
├── index.html   # struktur HTML semantik
├── styles.css   # gaya, custom property untuk warna dan spacing
├── script.js    # data contoh, render kartu, pencarian, filter, tab
└── README.md
```

## Cara menjalankan
1. Unduh atau clone repo ini.
2. Buka `index.html` di browser (klik dua kali), tanpa instalasi.
3. Atau jalankan server lokal: `python3 -m http.server`, lalu buka `http://localhost:8000`.

## Fitur interaktif
- Pencarian langsung (judul, mata kuliah, dosen, tahun).
- Chip mata kuliah sebagai filter; klik lagi untuk membatalkan.
- Tab bawah mengganti tab aktif; tab Cari memfokuskan kolom pencarian.
- Tampilan "materi tidak ditemukan" jika hasil kosong.

## Catatan desain
- Ukuran mengikuti wireframe: lebar 390 px, grid margin 16 px, spacing kelipatan 8 px.
- Target ketuk minimal 44 px, kontras teks sesuai WCAG, dan fokus keyboard terlihat.
- Hanya halaman Beranda yang diimplementasikan; tab lain menampilkan pesan.
