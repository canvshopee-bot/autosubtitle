# Subtitle Otomatis (gratis) — versi Node.js

App bikin subtitle otomatis dari video/audio: transkripsi, edit, pilih gaya, lalu
unduh sebagai `.srt`/`.vtt` atau render langsung ke video dengan subtitle nempel (`.webm`).

Server-nya cuma **Express** yang nge-serve satu halaman statis — semua proses berat
(transkripsi pakai Whisper via transformers.js, render burn-in pakai canvas +
MediaRecorder) tetap jalan di browser pengunjung, bukan di server. Jadi server-nya
ringan banget, cocok buat hosting gratis.

## Struktur
```
subtitle-app-node/
├── server.js        ← Express server, serve folder public/
├── public/
│   └── index.html   ← seluruh UI + logic app
├── package.json
├── vercel.json       ← config biar Express-nya jalan sebagai serverless function di Vercel
└── README.md
```

## Jalanin di lokal
```bash
npm install
npm start
# buka http://localhost:3000
```

## Deploy ke Vercel (gratis)

### Cara 1 — lewat CLI
```bash
npm i -g vercel
cd subtitle-app-node
vercel          # ikuti prompt
vercel --prod
```
`vercel.json` di project ini udah ngatur biar `server.js` di-deploy sebagai Node
serverless function dan folder `public/` di-serve sebagai static asset — jadi
tinggal deploy, tanpa setting tambahan.

### Cara 2 — lewat GitHub
1. Push folder ini ke repo GitHub baru
2. Buka https://vercel.com/new → Import Git Repository → pilih repo ini
3. Framework Preset biarkan **Other**; Vercel bakal otomatis pakai `vercel.json`
4. Deploy

## Kenapa masih ringan meski udah pakai Node.js
Node/Express di sini cuma berperan sebagai web server biasa (serve HTML/CSS/JS).
Kerjaan berat kayak transkripsi audio dan render video tetap dieksekusi di
perangkat pengunjung lewat WebAssembly/WebGPU (transformers.js) dan
`MediaRecorder` bawaan browser. Ini penting karena:
- Vercel Hobby (gratis) punya batas waktu eksekusi function yang pendek (10 detik) —
  nggak cukup buat transkripsi video beneran kalau dikerjakan di server.
- Nggak perlu GPU server / biaya inferensi model — jadi tetap 100% gratis dijalankan
  berapapun banyak pengunjungnya.

## Catatan browser
Fitur render burn-in (`MediaRecorder` + `captureStream()`) paling stabil di
Chrome/Edge desktop. Safari & sebagian browser mobile belum full support.
