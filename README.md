# FRONTEND-SICLUS Code Repository

Berikut adalah salinan lengkap dari semua berkas kode yang ada di dalam folder `FRONTEND-SICLUS` tanpa modifikasi sama sekali.

---

## 1. `.gitignore`
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Environment variables (JANGAN diupload! Berisi API Key & Secret)
.env
.env.*
!.env.example

# Windows cache
Thumbs.db

# Coverage reports
coverage/

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

---

## 2. `.oxlintrc.json`
```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

---

## 3. `index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>siclus-app</title>
  </head>
  
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 4. `package.json`
```json
{
  "name": "siclus-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fontsource/poppins": "^5.3.0",
    "@tailwindcss/vite": "^4.3.3",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.4",
    "oxlint": "^1.75.0",
    "vite": "^8.2.0"
  }
}
```

---

## 5. `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

---

## 6. `src/index.css`
```css
@import "tailwindcss";

:root {
  --font-sans: 'Poppins', sans-serif;
}

body {
  font-family: var(--font-sans);
  background-color: #f1f5f9;
}

/* Hide scrollbar untuk horizontal scroll */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

---

## 7. `src/main.jsx`
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import Font Poppins biar langsung aktif di seluruh app
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

## 8. `src/App.jsx`
```javascript
import React, { useState } from "react";
import MobileLayout from "./components/layout/MobileLayout";
import BottomNav from "./components/layout/BottomNav";
import Login from "./pages/auth/Login";
import Beranda from "./pages/Beranda";
import Persiapan from "./pages/laporan/Persiapan";
import Inspeksi from "./pages/laporan/Inspeksi";
import Kendala from "./pages/laporan/Kendala";
import TitikStart from "./pages/perjalanan/TitikStart";
import Penumpang from "./pages/perjalanan/Penumpang";
import RingkasanHarian from "./pages/RingkasanHarian";

//  RIWAYAT DRIVER COMPONENT (Notifikasi-style)
const RiwayatDriver = ({ driverReports = [], onViewDetail }) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Riwayat Driver</h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">Laporan yang telah diisi oleh pengemudi</p>
      </div>
      {driverReports.length > 0 ? (
        <div className="space-y-3">
          {driverReports.map((report, index) => (
            <div key={index} onClick={() => onViewDetail(report)} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                  {report.driverName?.charAt(0) || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-extrabold text-[#00206B] truncate">{report.driverName || 'Unknown'}</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">{report.date || 'Tanggal tidak tercatat'} • {report.trayek || '-'} • {report.bus || '-'}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Selesai: {report.submittedAt || '-'}</p>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>
          <h3 className="text-lg font-extrabold text-slate-600 m-0">Belum Ada Laporan</h3>
          <p className="text-sm text-slate-500 font-medium mt-1">Laporan dari pengemudi akan muncul di sini</p>
        </div>
      )}
    </div>
  );
};

// 🔥 DETAIL LAPORAN COMPONENT (dengan Progress Bar)
const DetailLaporan = ({ report, onBack }) => {
  const calculateCompleteness = () => {
    let total = 0;
    let filled = 0;
    if (report.morning) { total += 5; if (report.morning.start) filled++; if (report.morning.odometerStart) filled++; if (report.morning.departure) filled++; if (report.morning.arrival) filled++; if (report.morning.passengers) filled++; }
    if (report.afternoon) { total += 5; if (report.afternoon.start) filled++; if (report.afternoon.odometerStart) filled++; if (report.afternoon.departure) filled++; if (report.afternoon.arrival) filled++; if (report.afternoon.passengers) filled++; }
    return total > 0 ? Math.round((filled / total) * 100) : 0;
  };
  const completeness = calculateCompleteness();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-[#00206B] hover:underline">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        Kembali ke Riwayat
      </button>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-[#00206B] uppercase">Kelengkapan Data</h3>
          <span className="text-2xl font-black text-[#00206B]">{completeness}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div className={`h-3 rounded-full transition-all duration-500 ${completeness >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-500' : completeness >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-red-500 to-pink-500'}`} style={{ width: `${completeness}%` }}></div>
        </div>
        <p className="text-xs text-slate-500 mt-2">{completeness >= 80 ? '✅ Data hampir lengkap' : completeness >= 50 ? '⚠️ Data belum lengkap' : '❌ Data sangat kurang'}</p>
      </div>
      <div className="bg-white border-2 border-slate-300 rounded-xl p-8 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-xl font-black text-slate-800 uppercase">LAPORAN HARIAN ANGKUTAN SEKOLAH GRATIS KOTA MOJOKERTO</h2>
          <p className="text-sm font-bold text-slate-600">TAHUN 2026</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div><span className="font-bold">HARI / TANGGAL</span><p className="text-slate-700 mt-1">{report.date || '-'}</p></div>
          <div><span className="font-bold">TRAYEK / NOPOL</span><p className="text-slate-700 mt-1">{report.trayek || '-'} / {report.bus || '-'}</p></div>
        </div>
        <table className="w-full border-collapse border-2 border-slate-400 text-sm">
          <thead>
            <tr className="bg-slate-100"><th className="border-2 border-slate-400 p-2" rowSpan="2">No.</th><th className="border-2 border-slate-400 p-2" rowSpan="2">URAIAN</th><th className="border-2 border-slate-400 p-2" colSpan="2">PELAYANAN</th></tr>
            <tr className="bg-slate-100"><th className="border-2 border-slate-400 p-2">PAGI / BERANGKAT SEKOLAH</th><th className="border-2 border-slate-400 p-2">SIANG / PULANG SEKOLAH</th></tr>
          </thead>
          <tbody>
            <tr><td className="border-2 border-slate-400 p-2 text-center">1</td><td className="border-2 border-slate-400 p-2">Nama Pengemudi</td><td className="border-2 border-slate-400 p-2" colSpan="2">{report.driverName || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">2</td><td className="border-2 border-slate-400 p-2">Km speedometer pada saat berangkat dari kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerStart || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerStart || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">3</td><td className="border-2 border-slate-400 p-2">Jam berangkat dari kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.start || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.start || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center" rowSpan="9">4</td><td className="border-2 border-slate-400 p-2 font-bold" colSpan="3">Kondisi kendaraan sebelum berangkat</td></tr>
            {['Rem', 'AC', 'Lampu', 'Klakson', 'Wiper kaca', 'Lampu rem/seint', 'Bell Penumpang depan dan belakang', 'Pintu bus depan dan belakang', 'Kebersihan'].map((item, idx) => (
              <tr key={idx}><td className="border-2 border-slate-400 p-2">{String.fromCharCode(97 + idx)}. {item}</td><td className="border-2 border-slate-400 p-2 text-center"><span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded font-bold text-xs">OK</span><span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded font-bold text-xs ml-2">KURANG</span></td><td className="border-2 border-slate-400 p-2 text-center" rowSpan="8"></td></tr>
            ))}
            <tr><td className="border-2 border-slate-400 p-2 font-bold" colSpan="3">Kondisi kendaraan sesudah berangkat</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">5</td><td className="border-2 border-slate-400 p-2">Jam berangkat dari titik awal trayek/start</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.departure || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.departure || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">6</td><td className="border-2 border-slate-400 p-2">Km speedometer pada saat berangkat dari titik awal trayek/start</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerDeparture || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerDeparture || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">7</td><td className="border-2 border-slate-400 p-2">Jam datang di titik akhir trayek/finish</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.arrival || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.arrival || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">8</td><td className="border-2 border-slate-400 p-2">Km speedometer bus pada saat datang di titik akhir trayek/finish</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerArrival || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerArrival || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">9</td><td className="border-2 border-slate-400 p-2">Jumlah penumpang/pelajar yang diangkut</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.passengers || '-'} Orang</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.passengers || '-'} Orang</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">10</td><td className="border-2 border-slate-400 p-2">Jam datang di kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.returnTime || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.returnTime || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">11</td><td className="border-2 border-slate-400 p-2">Km speedometer pada saat datang di kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerReturn || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerReturn || '-'}</td></tr>
          </tbody>
        </table>
        <div className="mt-8 text-center">
          <div className="inline-block text-center">
            <p className="font-bold mb-16">PENGEMUDI</p>
            <div className="border-t-2 border-slate-800 pt-2 w-48"><p className="font-bold text-sm">{report.driverName || '________________'}</p></div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs">
          <p className="font-bold">Catatan:</p>
          <p>Jika uraian kondisi kendaraan sebelum berangkat ada yang kurang, maka harus/wajib menghubungi/melaporkan kepada Seksi Angkutan, Bidang Angkutan Jalan.</p>
        </div>
      </div>
    </div>
  );
};

// 🔥 REKAP COMPONENT (dengan Search)
const RekapPage = ({ trips = [], inspections = [] }) => {
  const [searchName, setSearchName] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = trips.filter(trip => {
    const matchName = !searchName || trip.driverName?.toLowerCase().includes(searchName.toLowerCase());
    return matchName;
  });

  if (selectedReport) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <button onClick={() => setSelectedReport(null)} className="flex items-center gap-2 text-sm font-bold text-[#00206B] hover:underline">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          Kembali ke Daftar
        </button>
        <div className="bg-white border-2 border-slate-300 rounded-xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-xl font-black text-slate-800 uppercase">LAPORAN HARIAN ANGKUTAN SEKOLAH GRATIS KOTA MOJOKERTO</h2>
            <p className="text-sm font-bold text-slate-600">TAHUN 2026</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div><span className="font-bold">HARI / TANGGAL</span><p className="text-slate-700 mt-1">{selectedReport.date || '-'}</p></div>
            <div><span className="font-bold">TRAYEK / NOPOL</span><p className="text-slate-700 mt-1">{selectedReport.trayek || '-'} / {selectedReport.bus || '-'}</p></div>
          </div>
          <table className="w-full border-collapse border-2 border-slate-400 text-sm">
            <thead>
              <tr className="bg-slate-100"><th className="border-2 border-slate-400 p-2" rowSpan="2">No.</th><th className="border-2 border-slate-400 p-2" rowSpan="2">URAIAN</th><th className="border-2 border-slate-400 p-2" colSpan="2">PELAYANAN</th></tr>
              <tr className="bg-slate-100"><th className="border-2 border-slate-400 p-2">PAGI / BERANGKAT SEKOLAH</th><th className="border-2 border-slate-400 p-2">SIANG / PULANG SEKOLAH</th></tr>
            </thead>
            <tbody>
              <tr><td className="border-2 border-slate-400 p-2 text-center">1</td><td className="border-2 border-slate-400 p-2">Nama Pengemudi</td><td className="border-2 border-slate-400 p-2" colSpan="2">{selectedReport.driverName || '-'}</td></tr>
              <tr><td className="border-2 border-slate-400 p-2 text-center">2</td><td className="border-2 border-slate-400 p-2">Km speedometer pada saat berangkat dari kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.morning?.odometerStart || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.afternoon?.odometerStart || '-'}</td></tr>
              <tr><td className="border-2 border-slate-400 p-2 text-center">3</td><td className="border-2 border-slate-400 p-2">Jam berangkat dari kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.morning?.start || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.afternoon?.start || '-'} WIB</td></tr>
              <tr><td className="border-2 border-slate-400 p-2 text-center" rowSpan="9">4</td><td className="border-2 border-slate-400 p-2 font-bold" colSpan="3">Kondisi kendaraan sebelum berangkat</td></tr>
              {['Rem', 'AC', 'Lampu', 'Klakson', 'Wiper kaca', 'Lampu rem/seint', 'Bell Penumpang depan dan belakang', 'Pintu bus depan dan belakang', 'Kebersihan'].map((item, idx) => (
                <tr key={idx}><td className="border-2 border-slate-400 p-2">{String.fromCharCode(97 + idx)}. {item}</td><td className="border-2 border-slate-400 p-2 text-center"><span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded font-bold text-xs">OK</span><span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded font-bold text-xs ml-2">KURANG</span></td><td className="border-2 border-slate-400 p-2 text-center" rowSpan="8"></td></tr>
              ))}
              <tr><td className="border-2 border-slate-400 p-2 font-bold" colSpan="3">Kondisi kendaraan sesudah berangkat</td></tr>
              <tr><td className="border-2 border-slate-400 p-2 text-center">5</td><td className="border-2 border-slate-400 p-2">Jam berangkat dari titik awal trayek/start</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.morning?.departure || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.afternoon?.departure || '-'} WIB</td></tr>
              <tr><td className="border-2 border-slate-400 p-2 text-center">6</td><td className="border-2 border-slate-400 p-2">Km speedometer pada saat berangkat dari titik awal trayek/start</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.morning?.odometerDeparture || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.afternoon?.odometerDeparture || '-'}</td></tr>
              <tr><td className="border-2 border-slate-400 p-2 text-center">7</td><td className="border-2 border-slate-400 p-2">Jam datang di titik akhir trayek/finish</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.morning?.arrival || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.afternoon?.arrival || '-'} WIB</td></tr>
              <tr><td className="border-2 border-slate-400 p-2 text-center">8</td><td className="border-2 border-slate-400 p-2">Km speedometer bus pada saat datang di titik akhir trayek/finish</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.morning?.odometerArrival || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.afternoon?.odometerArrival || '-'}</td></tr>
              <tr><td className="border-2 border-slate-400 p-2 text-center">9</td><td className="border-2 border-slate-400 p-2">Jumlah penumpang/pelajar yang diangkut</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.morning?.passengers || '-'} Orang</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.afternoon?.passengers || '-'} Orang</td></tr>
              <tr><td className="border-2 border-slate-400 p-2 text-center">10</td><td className="border-2 border-slate-400 p-2">Jam datang di kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.morning?.returnTime || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.afternoon?.returnTime || '-'} WIB</td></tr>
              <tr><td className="border-2 border-slate-400 p-2 text-center">11</td><td className="border-2 border-slate-400 p-2">Km speedometer pada saat datang di kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.morning?.odometerReturn || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{selectedReport.afternoon?.odometerReturn || '-'}</td></tr>
            </tbody>
          </table>
          <div className="mt-8 text-center">
            <div className="inline-block text-center">
              <p className="font-bold mb-16">PENGEMUDI</p>
              <div className="border-t-2 border-slate-800 pt-2 w-48"><p className="font-bold text-sm">{selectedReport.driverName || '________________'}</p></div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs">
            <p className="font-bold">Catatan:</p>
            <p>Jika uraian kondisi kendaraan sebelum berangkat ada yang kurang, maka harus/wajib menghubungi/melaporkan kepada Seksi Angkutan, Bidang Angkutan Jalan.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Data Rekapitulasi</h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">Pantau semua laporan pengemudi</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-[#00206B] uppercase">Cari Laporan</h3>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Nama Pengemudi</label>
          <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Cari nama supir..." className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" />
        </div>
        <button onClick={() => setSearchName('')} className="text-xs font-bold text-slate-500 hover:text-[#00206B] underline">Reset Pencarian</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div><span className="text-xs font-bold text-slate-400 block">Total Laporan</span><span className="text-2xl font-black text-[#00206B] block mt-1">{filteredReports.length}</span></div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#00206B]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
          </div>
        </div>
      </div>
      {filteredReports.length > 0 ? (
        <div className="space-y-3">
          {filteredReports.map((report, index) => (
            <div key={index} onClick={() => setSelectedReport(report)} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg">{report.driverName?.charAt(0) || '?'}</div>
                  <div><h3 className="text-base font-extrabold text-[#00206B]">{report.driverName || 'Unknown'}</h3><p className="text-xs text-slate-400 font-semibold mt-0.5">{report.date || 'Tanggal tidak tercatat'} • {report.trayek || '-'} • {report.bus || '-'}</p></div>
                </div>
                <div className="flex items-center gap-2 text-slate-400"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
          <h3 className="text-lg font-extrabold text-slate-600 m-0">Tidak Ada Laporan</h3>
          <p className="text-sm text-slate-500 font-medium mt-1">Belum ada laporan yang tercatat</p>
        </div>
      )}
    </div>
  );
};

// 🔥 KELOLA USER COMPONENT
const ManageUsers = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'pengemudi', phone: '', trayek: '', bus: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const localUsers = JSON.parse(localStorage.getItem('siclus_users') || '[]');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('siclus_users') || '[]');
    if (users.find(u => u.email === formData.email)) { alert('Email sudah terdaftar!'); return; }
    const newUser = { id: `SUP${String(users.length + 1).padStart(3, '0')}`, ...formData };
    users.push(newUser);
    localStorage.setItem('siclus_users', JSON.stringify(users));
    setSuccessMsg(`User ${formData.name} berhasil ditambahkan!`);
    setShowForm(false);
    setFormData({ name: '', email: '', password: '', role: 'pengemudi', phone: '', trayek: '', bus: '' });
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Kelola Pengguna</h2>
          <p className="text-sm text-slate-400 font-semibold mt-0.5">Tambah, edit, atau hapus akun pengemudi</p>
        </div>
        <button onClick={onBack} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
      </div>
      {successMsg && (
        <div className="bg-[#E6F7ED] border border-[#BCECD2] text-[#137333] font-bold py-3 px-4 rounded-xl flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          {successMsg}
        </div>
      )}
      <button onClick={() => setShowForm(true)} className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
        TAMBAH PENGGUNA BARU
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {localUsers.filter(u => u.role !== 'admin').map((user) => (
          <div key={user.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg">{user.name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-extrabold text-[#00206B] truncate">{user.name}</h3>
                <p className="text-xs text-slate-400 font-semibold">{user.id}</p>
                <p className="text-xs text-slate-500 mt-1 truncate">{user.email}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-400 font-semibold">Trayek</span><span className="font-bold text-[#00206B]">{user.trayek || '-'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 font-semibold">Bus</span><span className="font-bold text-[#00206B]">{user.bus || '-'}</span></div>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-[#00206B]">Tambah Pengguna Baru</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Nama Lengkap</label><input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" placeholder="Nama pengemudi" /></div>
              <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" placeholder="pengemudi@siclus.id" /></div>
              <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Password</label><input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" placeholder="Minimal 6 karakter" /></div>
              <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">No. Telepon</label><input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" placeholder="081234567890" /></div>
              <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Trayek</label><input type="text" name="trayek" value={formData.trayek} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" placeholder="Trayek A" /></div>
              <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Bus</label><input type="text" name="bus" value={formData.bus} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" placeholder="Bus 07 (S 1772 SP)" /></div>
              <button type="submit" className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer mt-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                TAMBAH PENGGUNA
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// 🔥 MAIN APP COMPONENT
function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("beranda");
  const [tripStatus, setTripStatus] = useState("belum_mulai");
  const [preparationData, setPreparationData] = useState(null);
  const [tripData, setTripData] = useState(null);
  const [inspections, setInspections] = useState([]);
  const [trips, setTrips] = useState([]);
  const [driverReports, setDriverReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    setTripStatus("belum_mulai");
    setCurrentPage(userInfo?.role?.toLowerCase() === 'admin' ? 'riwayatdriver' : 'beranda');
  };

  const handleLogout = () => { setUser(null); setTripStatus("belum_mulai"); setCurrentPage("beranda"); };
  const handleStartInspection = () => setCurrentPage("persiapan");

  const handleInspectionSuccess = (report) => {
    const timestamp = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
    setInspections((prev) => [{ ...report, timestamp }, ...prev]);
    setTripStatus("sedang_berlangsung");
    setCurrentPage("beranda");
  };

  const handleInspectionIssues = (report) => {
    const timestamp = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
    setInspections((prev) => [{ ...report, timestamp }, ...prev]);
    setTripStatus("belum_mulai");
    setCurrentPage("ringkasan");
    setPreparationData(null);
  };

  const handleTripSubmit = (report) => {
    const reportWithTimestamp = {
      ...report,
      driverName: user?.name || 'Pak Budi',
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      submittedAt: new Date().toLocaleString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      trayek: 'Trayek A',
      bus: 'Bus 07 (S 1772 SP)',
      morning: {
        odometerStart: '67008', start: '05:30', departure: '06:10', odometerDeparture: '67013',
        arrival: '06:40', odometerArrival: '67018', passengers: 6, returnTime: '07:00', odometerReturn: '67023'
      },
      afternoon: {
        odometerStart: '67023', start: '14:00', departure: '14:55', odometerDeparture: '67027',
        arrival: '15:30', odometerArrival: '67032', passengers: 5, returnTime: '15:45', odometerReturn: '67037'
      }
    };
    setTrips((prev) => [reportWithTimestamp, ...prev]);
    setDriverReports((prev) => [reportWithTimestamp, ...prev]);
    setTripStatus("belum_mulai");
    setCurrentPage("ringkasan");
    setTripData(null);
  };

  const handleResetLogs = () => { setInspections([]); setTrips([]); setDriverReports([]); setTripStatus("belum_mulai"); };

  const handleMenuNavigation = (menuId) => {
    if (user?.role?.toLowerCase() === 'admin') {
      if (menuId === 'riwayatdriver') setCurrentPage('riwayatdriver');
      else if (menuId === 'rekap') setCurrentPage('rekap');
      else if (menuId === 'kelolauser') setCurrentPage('kelolauser');
      else if (menuId === 'akun') setCurrentPage('akun');
      else setCurrentPage('riwayatdriver');
    } else {
      if (menuId === 'laporan') setCurrentPage('persiapan');
      else if (menuId === 'riwayat') setCurrentPage('ringkasan');
      else if (menuId === 'akun') setCurrentPage('akun');
      else setCurrentPage(menuId);
    }
  };

  const renderPage = () => {
    if (!user) return <Login onLoginSuccess={handleLogin} />;
    switch (currentPage) {
      case "beranda":
        if (user?.role?.toLowerCase() === 'admin') { setCurrentPage('riwayatdriver'); return null; }
        return <Beranda activeUser={user} tripStatus={tripStatus} onQuickAction={setCurrentPage} onLogout={handleLogout} onStartInspection={handleStartInspection} stats={{ totalInspection: inspections.length, activeTrips: trips.length }} />;
      case "persiapan":
        return <Persiapan onNext={(data) => { setPreparationData(data); setCurrentPage("inspeksi"); }} />;
      case "inspeksi":
        if (!preparationData) { setCurrentPage("persiapan"); return null; }
        return <Inspeksi preparationData={preparationData} onNext={handleInspectionSuccess} onReportIssue={(report) => { setPreparationData(report); setCurrentPage("kendala"); }} />;
      case "kendala":
        if (!preparationData) { setCurrentPage("persiapan"); return null; }
        return <Kendala data={preparationData} onSubmit={handleInspectionIssues} />;
      case "titikstart":
        return <TitikStart onNext={(data) => { setTripData(data); setCurrentPage("penumpang"); }} />;
      case "penumpang":
        if (!tripData) { setCurrentPage("titikstart"); return null; }
        return <Penumpang tripData={tripData} onSubmit={handleTripSubmit} />;
      case "ringkasan":
        return <RingkasanHarian inspections={inspections} trips={trips} onResetAllLogs={handleResetLogs} />;
      case "riwayatdriver":
        return <RiwayatDriver driverReports={driverReports} onViewDetail={(report) => { setSelectedReport(report); setCurrentPage('detaillaporan'); }} />;
      case "detaillaporan":
        return <DetailLaporan report={selectedReport} onBack={() => setCurrentPage('riwayatdriver')} />;
      case "rekap":
        return <RekapPage trips={trips} inspections={inspections} />;
      case "kelolauser":
        return <ManageUsers onBack={() => setCurrentPage('riwayatdriver')} />;
      case "akun":
        return (
          <div className="flex flex-col items-center justify-center p-6 mt-6 space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-xl border-4 border-white">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-black text-[#00206B] uppercase tracking-tight">{user?.name || 'Pengemudi'}</h2>
              <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">{user?.id || 'ID Tidak Diketahui'} • {user?.role || 'Pengemudi'}</p>
            </div>
            <div className="w-full max-w-sm mt-8 p-6 bg-white rounded-[2rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col gap-4">
              <button onClick={handleLogout} className="w-full relative overflow-hidden bg-red-50 text-red-600 font-bold py-4 px-4 rounded-2xl border border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                <span>KELUAR APLIKASI</span>
              </button>
            </div>
          </div>
        );
      default:
        return user?.role?.toLowerCase() === 'admin' ? <div className="flex flex-col items-center justify-center p-10 mt-10"><h2 className="text-3xl font-black text-[#00206B]">Riwayat Driver</h2></div> : <Beranda activeUser={user} tripStatus={tripStatus} onQuickAction={setCurrentPage} onLogout={handleLogout} onStartInspection={handleStartInspection} />;
    }
  };

  const getPageTitle = () => {
    if (!user) return "SICLUS";
    switch (currentPage) {
      case "beranda": return "SICLUS";
      case "persiapan": case "inspeksi": case "kendala": case "titikstart": case "penumpang": return "Laporan";
      case "ringkasan": return "Riwayat";
      case "riwayatdriver": return "Riwayat Driver";
      case "detaillaporan": return "Detail Laporan";
      case "rekap": return "Rekap Laporan";
      case "kelolauser": return "Kelola Pengguna";
      case "akun": return "Profil Akun";
      default: return "SICLUS";
    }
  };

  const handleBack = () => {
    if (currentPage === "inspeksi") setCurrentPage("persiapan");
    else if (currentPage === "kendala") setCurrentPage("inspeksi");
    else if (currentPage === "penumpang") setCurrentPage("titikstart");
    else if (currentPage === "detaillaporan") setCurrentPage("riwayatdriver");
    else if (currentPage === "akun" || currentPage === "rekap" || currentPage === "kelolauser" || currentPage === "riwayatdriver") {
      setCurrentPage(user?.role?.toLowerCase() === 'admin' ? 'riwayatdriver' : 'beranda');
    } else {
      setCurrentPage(user?.role?.toLowerCase() === 'admin' ? 'riwayatdriver' : 'beranda');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#131314] font-sans antialiased overflow-hidden">
      {!user ? (
        renderPage()
      ) : (
        <MobileLayout user={user} title={getPageTitle()} onBack={currentPage !== "beranda" && currentPage !== "ringkasan" && currentPage !== "rekap" && currentPage !== "kelolauser" && currentPage !== "riwayatdriver" ? handleBack : null} activeMenu={currentPage} onMenuClick={handleMenuNavigation}>
          {renderPage()}
          <BottomNav user={user} activeTab={currentPage} setActiveTab={setCurrentPage} />
        </MobileLayout>
      )}
    </div>
  );
}

export default App;
```

---

## 9. `src/components/layout/BottomNav.jsx`
```javascript
import React from 'react';

const BottomNav = ({ activeTab, setActiveTab, user = null }) => {
  const adminNavItems = [
    { id: 'riwayatdriver', label: 'Riwayat', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
    { id: 'rekap', label: 'Rekap', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg> },
    { id: 'kelolauser', label: 'Kelola', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
    { id: 'akun', label: 'Akun', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
  ];

  const driverNavItems = [
    { id: 'beranda', label: 'Beranda', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: 'laporan', label: 'Laporan', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
    { id: 'riwayat', label: 'Riwayat', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'akun', label: 'Akun', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
  ];

  const navItems = user?.role?.toLowerCase() === 'admin' ? adminNavItems : driverNavItems;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 shadow-lg">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const isReportTabActive = item.id === 'laporan' && (activeTab === 'persiapan' || activeTab === 'inspeksi' || activeTab === 'kendala' || activeTab === 'laporan');
          const isRiwayatTabActive = (item.id === 'riwayat' || item.id === 'riwayatdriver') && (activeTab === 'ringkasan' || activeTab === 'riwayat' || activeTab === 'detaillaporan');
          const isActive = activeTab === item.id || isReportTabActive || isRiwayatTabActive;
          return (
            <button key={item.id} onClick={() => { if (item.id === 'laporan') setActiveTab('persiapan'); else if (item.id === 'riwayat') setActiveTab('ringkasan'); else setActiveTab(item.id); }} className={`flex flex-col items-center justify-center flex-1 py-2.5 rounded-2xl transition-all duration-200 ${isActive ? 'bg-[#66FFAA]/40 text-[#006633] shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
              <div className="mb-1">{item.icon}</div>
              <span className={`text-[11px] font-bold whitespace-nowrap ${isActive ? 'font-extrabold' : 'font-medium'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
```

---

## 26. `src/services/api.js`
```javascript
import { dummyDrivers, dummyVehicles, dummyInspections, dummyTrips } from '../utils/dummyData';

const BASE_URL = 'http://localhost:8000/api'; // Ganti dengan URL FastAPI nanti

// Simulasi delay panggillan API
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  // Authentication
  login: async (username, password) => {
    await delay(800);
    if (username === 'dishub' && password === 'dishub123') {
      return { 
        success: true, 
        token: 'mock-jwt-token-12345', 
        user: { name: 'Petugas Dishub', role: 'Inspector' } 
      };
    }
    throw new Error('Username atau password salah');
  },

  // Drivers & Vehicles
  getDrivers: async () => {
    await delay(500);
    return dummyDrivers;
  },

  getVehicles: async () => {
    await delay(500);
    return dummyVehicles;
  },

  // Inspections / Laporan
  submitInspection: async (data) => {
    await delay(1000);
    console.log('Mengirim data inspeksi ke FastAPI:', data);
    return { success: true, data };
  },

  // Trip Start
  startTrip: async (data) => {
    await delay(1000);
    console.log('Mengirim data mulai perjalanan ke FastAPI:', data);
    return { success: true, data };
  }
};
```

---

## 27. `src/utils/UserData.js`
```javascript
// src/utils/usersData.js
export const dummyUsers = [
  {
    id: 'ADM001',
    name: 'Admin SICLUS',
    email: 'admin@siclus.id',
    password: 'admin123',
    role: 'admin',
    phone: '081234567890'
  },
  {
    id: 'SUP001',
    name: 'Pak Budi',
    email: 'budi@siclus.id',
    password: 'budi123',
    role: 'pengemudi',
    phone: '081234567891',
    trayek: 'Trayek A',
    bus: 'Bus 07 (S 1772 SP)'
  },
  {
    id: 'SUP002',
    name: 'Pak Joko',
    email: 'joko@siclus.id',
    password: 'joko123',
    role: 'pengemudi',
    phone: '081234567892',
    trayek: 'Trayek B',
    bus: 'Bus 03 (S 1773 SP)'
  }
];
```

---

## 28. `src/utils/dummyData.js`
```javascript
export const dummyDrivers = [
  { id: 'D001', name: 'Pak Budi', phone: '0812-3456-7890', status: 'Aktif', vehicleId: 'B-1234-TJS' },
  { id: 'D002', name: 'Pak Joko', phone: '0813-9876-5432', status: 'Sedang Tugas', vehicleId: 'B-5678-WQA' },
  { id: 'D003', name: 'Bu Ani', phone: '0815-1122-3344', status: 'Libur', vehicleId: 'B-9012-KLP' },
];

export const dummyVehicles = [
  { id: 'V001', plateNumber: 'B-1234-TJS', type: 'Bus TransJakarta', capacity: 50, condition: 'Baik' },
  { id: 'V002', plateNumber: 'B-5678-WQA', type: 'Microtrans (Angkot)', capacity: 15, condition: 'Baik' },
  { id: 'V003', plateNumber: 'B-9012-KLP', type: 'Medium Bus', capacity: 30, condition: 'Butuh Perbaikan' },
];

export const dummyInspections = [
  { id: 'I001', driverId: 'D001', vehicleId: 'V001', date: '2026-08-18', time: '08:00', status: 'Selesai', notes: 'Semua aman' },
  { id: 'I002', driverId: 'D002', vehicleId: 'V002', date: '2026-08-18', time: '09:30', status: 'Tertunda', notes: 'Pengecekan rem' },
];

export const dummyTrips = [
  { id: 'T001', driverName: 'Pak Budi', route: 'Rute 1A (Balai Kota - PIK)', passengers: 42, startTime: '07:15', status: 'Dalam Perjalanan' },
  { id: 'T002', driverName: 'Pak Joko', route: 'Rute 2B (Kuningan - Senayan)', passengers: 12, startTime: '08:45', status: 'Terjadwal' },
];
```

---

## 29. `src/utils/formatTime.js`
```javascript
export const formatTime = (timeString) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes} WIB`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};
```
