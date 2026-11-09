/* ==========================================================
   CatatanKu - Beranda
   Interaksi: render kartu, pencarian, filter chip, tab, toast
   ========================================================== */
'use strict';

// ---- Data contoh materi (state tetap, tidak diubah) ----
const MATERI = [
  { judul: 'Catatan UTS Statistika Dasar', matkul: 'Statistika Dasar', dosen: 'Pak X', tahun: 2026, rating: 4.5, jumlahRating: 12, tipe: 'PDF', terverifikasi: true },
  { judul: 'Soal UAS Pengantar Akuntansi', matkul: 'Pengantar Akuntansi', dosen: 'Bu Y', tahun: 2025, rating: 4.2, jumlahRating: 8, tipe: 'PDF', terverifikasi: true },
  { judul: 'Ringkasan Manajemen Operasi', matkul: 'Manajemen Operasi', dosen: 'Pak Z', tahun: 2026, rating: 3.9, jumlahRating: 5, tipe: 'FOTO', terverifikasi: false },
  { judul: 'Catatan Bab 1-4 Statistika', matkul: 'Statistika Dasar', dosen: 'Pak X', tahun: 2025, rating: 4.0, jumlahRating: 6, tipe: 'PDF', terverifikasi: false },
];

// ---- State: kata kunci pencarian dan chip yang dipilih ----
const state = { kataKunci: '', chip: '' };

// ---- Referensi elemen ----
const daftar = document.getElementById('daftar-materi');
const kosong = document.getElementById('kosong');
const info = document.getElementById('info-hasil');
const inputCari = document.getElementById('cari');
const formCari = document.getElementById('form-cari');
const chips = document.getElementById('chips');
const tabs = document.getElementById('tabs');
const toast = document.getElementById('toast');
const tombolProfil = document.getElementById('tombol-profil');

/** Format angka rating ke gaya Indonesia: 4.5 -> "4,5" */
function formatRating(angka) {
  return angka.toFixed(1).replace('.', ',');
}

/** Buat satu kartu materi. Isi diset lewat textContent (aman dari XSS). */
function buatKartu(m) {
  const li = document.createElement('li');
  const kartu = document.createElement('article');
  kartu.className = 'card';

  const thumb = document.createElement('div');
  thumb.className = 'card__thumb';
  thumb.textContent = m.tipe;
  thumb.setAttribute('aria-hidden', 'true');

  const body = document.createElement('div');
  body.className = 'card__body';

  const judul = document.createElement('h3');
  judul.className = 'card__title';
  judul.textContent = m.judul;

  const meta = document.createElement('p');
  meta.className = 'card__meta';
  meta.textContent = `${m.matkul} · ${m.dosen} · ${m.tahun}`;

  const rating = document.createElement('p');
  rating.className = 'card__rating';
  rating.textContent = `★ ${formatRating(m.rating)} (${m.jumlahRating})`;

  body.append(judul, meta, rating);

  if (m.terverifikasi) {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = '✓ Terverifikasi';
    body.append(badge);
  }

  kartu.append(thumb, body);
  li.append(kartu);
  return li;
}

/** Tampilkan ulang daftar sesuai state (pencarian + chip). */
function render() {
  const kunci = state.kataKunci.trim().toLowerCase();
  const hasil = MATERI.filter((m) => {
    const cocokChip = !state.chip || m.matkul.includes(state.chip);
    const teks = `${m.judul} ${m.matkul} ${m.dosen} ${m.tahun}`.toLowerCase();
    return cocokChip && teks.includes(kunci);
  });

  daftar.replaceChildren(...hasil.map(buatKartu));
  kosong.hidden = hasil.length > 0;
  info.textContent = `${hasil.length} materi ditampilkan`;
}

/** Tampilkan pesan singkat selama 2 detik. */
let timerToast;
function tampilkanToast(pesan) {
  toast.textContent = pesan;
  toast.hidden = false;
  clearTimeout(timerToast);
  timerToast = setTimeout(() => { toast.hidden = true; }, 2000);
}

// ---- Pencarian: filter langsung saat mengetik ----
inputCari.addEventListener('input', () => {
  state.kataKunci = inputCari.value;
  render();
});
formCari.addEventListener('submit', (e) => e.preventDefault());

// ---- Chip: pilih satu, klik lagi untuk membatalkan ----
chips.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  const aktif = chip.getAttribute('aria-pressed') === 'true';
  chips.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', 'false'));
  chip.setAttribute('aria-pressed', String(!aktif));
  state.chip = aktif ? '' : chip.textContent.trim();
  render();
});

// ---- Tab bawah: ganti tab aktif; hanya Beranda yang sudah dibuat ----
tabs.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  e.preventDefault();
  const nama = tab.dataset.tab;
  if (nama === 'Cari') {
    inputCari.focus(); // pintasan: fokus ke kolom pencarian
    return;
  }
  if (nama !== 'Beranda') {
    tampilkanToast(`Halaman ${nama} belum dibuat di tugas ini.`);
  }
});

tombolProfil.addEventListener('click', () => tampilkanToast('Halaman Profil belum dibuat di tugas ini.'));

render();
