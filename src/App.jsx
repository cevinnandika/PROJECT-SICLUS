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

// 🔥 PROFIL AKUN COMPONENT (FITUR GANTI FOTO ALA STEAM UDAH NYALA!)
const ProfilAkun = ({ user, onLogout }) => {
  // 1. State buat nyimpen foto sementara & Pop-up
  const [profilePic, setProfilePic] = React.useState(null); 
  const [toastMsg, setToastMsg] = React.useState('');
  
  // 2. Ref buat nyambungin tombol kamera ke hidden input
  const fileInputRef = React.useRef(null);

  const dummyTrayek = user?.trayek || 'Trayek A';
  const dummyBus = user?.bus || 'Bus 07 (S 1772 SP)';

  // 3. Fungsi pas foto dipilih dari galeri
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Bikin URL sementara buat nampilin foto di frontend (langsung ganti!)
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      
      // Kasih notif sukses!
      setToastMsg('Foto profil berhasil diubah! 📸 (Preview Lokal)');
      setTimeout(() => setToastMsg(''), 3000);
    }
  };

  // 4. Fungsi pas tombol kamera diklik (manggil input rahasia)
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-6 text-left max-w-3xl mx-auto pb-6 relative">
      
      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[100] animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-[#00206B] text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,32,107,0.5)] flex items-center gap-3 border border-blue-400/30">
            <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-extrabold text-sm tracking-wide">{toastMsg}</span>
          </div>
        </div>
      )}

      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Profil Akun</h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">Kelola informasi data diri pengemudi</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm relative overflow-hidden">
         <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-[#00206B] to-blue-500"></div>

         <div className="relative z-10 flex flex-col items-center mt-12 px-6 pb-8">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-white p-1.5 shadow-lg">
                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                   {/* 🔥 5. LOGIC NAMPILIN FOTO: Kalo ada foto tampilin, kalo gaada tampilin icon default */}
                   {profilePic ? (
                     <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                   ) : (
                     <svg className="w-14 h-14 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                   )}
                </div>
              </div>
              
              {/* 🔥 6. INPUT RAHASIA! (Disembunyiin pake class 'hidden') */}
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handlePhotoChange} 
              />

              {/* Tombol Kamera yang kelihatan */}
              <button 
                onClick={handleCameraClick}
                className="absolute bottom-1 right-1 bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-transform text-[#00206B] border border-slate-100 cursor-pointer active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            <h3 className="mt-4 text-2xl font-black text-[#00206B]">{user?.name || 'Pak Budi'}</h3>
            <span className="bg-blue-50 text-blue-600 font-bold px-4 py-1.5 rounded-full text-xs mt-2 uppercase tracking-wide border border-blue-100">
               {user?.role || 'Pengemudi'}
            </span>

            {/* Grid Informasi Data Diri Lengkap */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
               <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#00206B] shadow-sm">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                  </div>
                  <div>
                     <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">ID Pengemudi</span>
                     <span className="font-extrabold text-[#00206B] text-sm">{user?.id || 'SUP001'}</span>
                  </div>
               </div>

               <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#00206B] shadow-sm">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  </div>
                  <div>
                     <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Trayek Tugas</span>
                     <span className="font-extrabold text-[#00206B] text-sm">{dummyTrayek}</span>
                  </div>
               </div>

               <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left flex gap-4 items-center md:col-span-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#00206B] shadow-sm">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  </div>
                  <div>
                     <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Armada Bus</span>
                     <span className="font-extrabold text-[#00206B] text-sm">{dummyBus}</span>
                  </div>
               </div>
            </div>

            <div className="w-full mt-8 pt-6 border-t border-slate-100">
              <button 
                onClick={onLogout} 
                className="w-full flex items-center justify-center gap-2 bg-[#FCE8E6] hover:bg-[#FAD2CF] text-[#C5221F] font-extrabold py-4 px-4 rounded-2xl transition-colors shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                KELUAR DARI APLIKASI
              </button>
            </div>
         </div>
      </div>
    </div>
  );
};
// 🔥 RIWAYAT DRIVER COMPONENT
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

// 🔥 DETAIL LAPORAN COMPONENT
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
            <tr><td className="border-2 border-slate-400 p-2 text-center">2</td><td className="border-2 border-slate-400 p-2">Km speedometer pada saat berangkat dari kantor Dishub</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerStart || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerStart || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">3</td><td className="border-2 border-slate-400 p-2">Jam berangkat dari kantor Dishub</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.start || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.start || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center" rowSpan="9">4</td><td className="border-2 border-slate-400 p-2 font-bold" colSpan="3">Kondisi kendaraan sebelum berangkat</td></tr>
            {['Rem', 'AC', 'Lampu', 'Klakson', 'Wiper kaca', 'Lampu rem/seint', 'Bell Penumpang', 'Pintu bus', 'Kebersihan'].map((item, idx) => (
              <tr key={idx}><td className="border-2 border-slate-400 p-2">{String.fromCharCode(97 + idx)}. {item}</td><td className="border-2 border-slate-400 p-2 text-center"><span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded font-bold text-xs">OK</span></td><td className="border-2 border-slate-400 p-2 text-center" rowSpan="8"></td></tr>
            ))}
            <tr><td className="border-2 border-slate-400 p-2 font-bold" colSpan="3">Kondisi kendaraan sesudah berangkat</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">5</td><td className="border-2 border-slate-400 p-2">Jam berangkat dari titik awal trayek/start</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.departure || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.departure || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">6</td><td className="border-2 border-slate-400 p-2">Km speedometer berangkat trayek/start</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerDeparture || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerDeparture || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">7</td><td className="border-2 border-slate-400 p-2">Jam datang di titik akhir trayek/finish</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.arrival || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.arrival || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">8</td><td className="border-2 border-slate-400 p-2">Km speedometer datang trayek/finish</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerArrival || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerArrival || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">9</td><td className="border-2 border-slate-400 p-2">Jumlah penumpang diangkut</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.passengers || '-'} Orang</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.passengers || '-'} Orang</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">10</td><td className="border-2 border-slate-400 p-2">Jam datang di kantor Dishub</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.returnTime || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.returnTime || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">11</td><td className="border-2 border-slate-400 p-2">Km speedometer datang di Dishub</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerReturn || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerReturn || '-'}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 🔥 REKAP COMPONENT (Dengan Fitur Export Excel)
const RekapPage = ({ trips = [], inspections = [] }) => {
  const [searchName, setSearchName] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = trips.filter(trip => {
    const matchName = !searchName || trip.driverName?.toLowerCase().includes(searchName.toLowerCase());
    return matchName;
  });

  const handleExportExcel = () => {
    if (filteredReports.length === 0) {
      alert("Belum ada data laporan yang bisa diexport bro!");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Tanggal Laporan,Nama Pengemudi,Trayek,Armada Bus,Odometer Pagi,Penumpang Pagi,Odometer Siang,Penumpang Siang\n";

    filteredReports.forEach(report => {
      const tanggal = report.date || '-';
      const nama = report.driverName || '-';
      const trayek = report.trayek || '-';
      const bus = report.bus || '-';
      const odoPagi = report.morning?.odometerStart || '-';
      const pnpPagi = report.morning?.passengers || '0';
      const odoSiang = report.afternoon?.odometerStart || '-';
      const pnpSiang = report.afternoon?.passengers || '0';

      const row = `${tanggal},${nama},${trayek},${bus},${odoPagi},${pnpPagi},${odoSiang},${pnpSiang}`;
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_SICLUS_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (selectedReport) {
    return <DetailLaporan report={selectedReport} onBack={() => setSelectedReport(null)} />;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Data Rekapitulasi</h2>
          <p className="text-sm text-slate-400 font-semibold mt-0.5">Pantau dan unduh semua laporan pengemudi</p>
        </div>
        
        <button 
          onClick={handleExportExcel}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-3 px-5 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          UNDUH DATA EXCEL
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-[#00206B] uppercase">Cari Laporan</h3>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Nama Pengemudi</label>
          <input 
            type="text" 
            value={searchName} 
            onChange={(e) => setSearchName(e.target.value)} 
            placeholder="Cari nama supir..." 
            className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" 
          />
        </div>
      </div>

      {filteredReports.length > 0 ? (
        <div className="space-y-3">
          {filteredReports.map((report, index) => (
            <div key={index} onClick={() => setSelectedReport(report)} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center">
              <div>
                <h3 className="text-base font-extrabold text-[#00206B]">{report.driverName || 'Unknown'}</h3>
                <p className="text-xs text-slate-400 font-semibold">{report.date || '-'}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">
                Detail ➔
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-12 text-center text-slate-500 font-medium">Tidak Ada Laporan</div>
      )}
    </div>
  );
};

// 🔥 KELOLA USER & ADMIN PANEL COMPONENT
const ManageUsers = ({ onBack, shiftRules, setShiftRules, onForceUnlock }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'pengemudi', trayek: '', bus: '' });
  const localUsers = JSON.parse(localStorage.getItem('siclus_users') || '[]');
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('siclus_users') || '[]');
    const newUser = { id: `SUP${String(users.length + 1).padStart(3, '0')}`, ...formData };
    users.push(newUser);
    localStorage.setItem('siclus_users', JSON.stringify(users));
    setShowForm(false);
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#00206B]">Kelola Pengguna</h2>
        <button onClick={onBack} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer font-bold text-sm">Kembali</button>
      </div>

      <div className="bg-white border-2 border-red-100 rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="text-sm font-extrabold text-red-600 uppercase mb-4">Pengaturan Waktu & Kunci Laporan</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Jam Buka Pagi</label>
            <input type="number" value={shiftRules.pagi} onChange={e => setShiftRules({...shiftRules, pagi: parseInt(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Jam Buka Siang</label>
            <input type="number" value={shiftRules.siang} onChange={e => setShiftRules({...shiftRules, siang: parseInt(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm" />
          </div>
        </div>
        <button onClick={onForceUnlock} className="w-full bg-red-500 text-white font-black py-4 rounded-xl shadow-md cursor-pointer">
          BUKA PAKSA KUNCI LAPORAN SEMUA SUPIR
        </button>
      </div>

      <button onClick={() => setShowForm(true)} className="w-full bg-[#00206B] text-white font-extrabold py-4 rounded-xl shadow-sm cursor-pointer">TAMBAH PENGGUNA BARU</button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {localUsers.filter(u => u.role !== 'admin').map((user) => (
          <div key={user.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-extrabold text-[#00206B]">{user.name}</h3>
            <p className="text-xs text-slate-500 font-medium">{user.email}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-black text-[#00206B] mb-4">Tambah Pengguna Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="name" required onChange={handleChange} placeholder="Nama Lengkap" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00206B] outline-none" />
              <input type="email" name="email" required onChange={handleChange} placeholder="Email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00206B] outline-none" />
              <input type="password" name="password" required onChange={handleChange} placeholder="Password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00206B] outline-none" />
              <input type="text" name="trayek" onChange={handleChange} placeholder="Trayek (Misal: Trayek A)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00206B] outline-none" />
              <input type="text" name="bus" onChange={handleChange} placeholder="Bus (Misal: Bus 07)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00206B] outline-none" />
              <button type="submit" className="w-full bg-[#00206B] text-white py-3.5 rounded-xl mt-4 font-bold shadow-md cursor-pointer">Simpan Pengguna</button>
              <button type="button" onClick={() => setShowForm(false)} className="w-full bg-slate-200 text-slate-700 py-3.5 rounded-xl mt-2 font-bold cursor-pointer hover:bg-slate-300">Batal</button>
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

  const [currentShift, setCurrentShift] = useState('pagi');
  const [tempMorningData, setTempMorningData] = useState(null);
  const [isLaporanLocked, setIsLaporanLocked] = useState(false);
  const [shiftRules, setShiftRules] = useState({ pagi: 5, siang: 12 });

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
    if (currentShift === 'pagi') {
      setTempMorningData(report.morning || report);
      setCurrentShift('siang');
      setIsLaporanLocked(true);
      setCurrentPage('beranda');
      setTripData(null);
    } else {
      const reportWithTimestamp = {
        ...report,
        driverName: user?.name || 'Pak Budi',
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
        submittedAt: new Date().toLocaleString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        trayek: 'Trayek A',
        bus: 'Bus 07 (S 1772 SP)',
        morning: tempMorningData,
        afternoon: report.afternoon || report
      };

      setTrips((prev) => [reportWithTimestamp, ...prev]);
      setDriverReports((prev) => [reportWithTimestamp, ...prev]);
      
      setTripStatus("belum_mulai");
      setCurrentShift('pagi');
      setTempMorningData(null);
      setIsLaporanLocked(false);
      setCurrentPage("ringkasan");
      setTripData(null);
    }
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

  const renderLockedScreen = () => {
    const nextShiftName = currentShift === 'siang' ? 'Siang' : 'Pagi (Besok)';
    const nextShiftTime = currentShift === 'siang' ? shiftRules.siang : shiftRules.pagi;

    return (
      <div className="flex flex-col items-center justify-center p-8 mt-16 text-center space-y-5 animate-[fadeIn_0.3s]">
        <div className="w-24 h-24 bg-[#FCE8E6] text-[#C5221F] rounded-full flex items-center justify-center border-4 border-[#FAD2CF] shadow-sm">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-[#00206B] uppercase m-0">Laporan Dikunci</h2>
        <div className="bg-white border-2 border-slate-200 w-full max-w-sm p-4 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Jadwal Pengisian Selanjutnya:</p>
          <p className="text-xl font-black text-[#C5221F]">Shift {nextShiftName} - {nextShiftTime}:00 WIB</p>
        </div>
        <p className="text-xs font-bold text-slate-500 max-w-xs leading-relaxed">Anda sudah menyelesaikan form shift sebelumnya. Cek Beranda untuk melihat progress atau hubungi Admin jika butuh akses mendesak.</p>
        <button onClick={() => setCurrentPage('beranda')} className="mt-2 w-full max-w-xs bg-[#00206B] hover:bg-[#00174E] text-white py-4 rounded-xl font-extrabold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Kembali ke Beranda
        </button>
      </div>
    );
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

  const renderPage = () => {
    if (!user) return <Login onLoginSuccess={handleLogin} />;
    switch (currentPage) {
      case "beranda":
        if (user?.role?.toLowerCase() === 'admin') { setCurrentPage('riwayatdriver'); return null; }
        return <Beranda 
          activeUser={user} tripStatus={tripStatus} onQuickAction={setCurrentPage} onLogout={handleLogout} onStartInspection={handleStartInspection} stats={{ totalInspection: inspections.length, activeTrips: trips.length }}
          currentShift={currentShift} isLaporanLocked={isLaporanLocked} shiftRules={shiftRules} 
          onStartSiang={() => { setIsLaporanLocked(false); setCurrentPage("titikstart"); }}
        />;
      case "persiapan":
        if (isLaporanLocked) return renderLockedScreen();
        return <Persiapan onNext={(data) => { setPreparationData(data); setCurrentPage("inspeksi"); }} />;
      case "inspeksi":
        if (isLaporanLocked) return renderLockedScreen();
        if (!preparationData) { setCurrentPage("persiapan"); return null; }
        return <Inspeksi preparationData={preparationData} onNext={handleInspectionSuccess} onReportIssue={(report) => { setPreparationData(report); setCurrentPage("kendala"); }} />;
      case "kendala":
        if (isLaporanLocked) return renderLockedScreen();
        if (!preparationData) { setCurrentPage("persiapan"); return null; }
        return <Kendala data={preparationData} onSubmit={handleInspectionIssues} />;
      case "titikstart":
        if (isLaporanLocked) return renderLockedScreen();
        return <TitikStart onNext={(data) => { setTripData(data); setCurrentPage("penumpang"); }} />;
      case "penumpang":
        if (isLaporanLocked) return renderLockedScreen();
        if (!tripData) { setCurrentPage("titikstart"); return null; }
        return <Penumpang tripData={tripData} onSubmit={handleTripSubmit} />;
      case "ringkasan":
        return <RingkasanHarian inspections={inspections} trips={trips} currentShift={currentShift} onResetAllLogs={handleResetLogs} />;
      case "riwayatdriver":
        return <RiwayatDriver driverReports={driverReports} onViewDetail={(report) => { setSelectedReport(report); setCurrentPage('detaillaporan'); }} />;
      case "detaillaporan":
        return <DetailLaporan report={selectedReport} onBack={() => setCurrentPage('riwayatdriver')} />;
      case "rekap":
        return <RekapPage trips={trips} inspections={inspections} />;
      case "kelolauser":
        return <ManageUsers 
          onBack={() => setCurrentPage('riwayatdriver')} 
          shiftRules={shiftRules} setShiftRules={setShiftRules} 
          onForceUnlock={() => { setIsLaporanLocked(false); alert("BERHASIL! Gembok supir telah dibuka paksa."); }}
        />;
      case "akun":
        return <ProfilAkun user={user} onLogout={handleLogout} />;
      default:
        return user?.role?.toLowerCase() === 'admin' ? <div className="p-10 text-center"><h2 className="text-3xl font-black">Riwayat Driver</h2></div> : <Beranda activeUser={user} tripStatus={tripStatus} onQuickAction={setCurrentPage} onLogout={handleLogout} onStartInspection={handleStartInspection} />;
    }
  };

  const getActiveMenuTab = () => {
    if (["persiapan", "inspeksi", "kendala", "titikstart", "penumpang"].includes(currentPage)) { return "laporan"; }
    if (["ringkasan"].includes(currentPage)) { return "riwayat"; }
    if (["detaillaporan"].includes(currentPage)) { return "riwayatdriver"; }
    return currentPage;
  };

  return (
    <div className="min-h-screen w-full bg-[#131314] font-sans antialiased overflow-hidden">
      {!user ? (
        renderPage()
      ) : (
        <MobileLayout 
          user={user} title={getPageTitle()} 
          onBack={currentPage !== "beranda" && currentPage !== "ringkasan" && currentPage !== "rekap" && currentPage !== "kelolauser" && currentPage !== "riwayatdriver" ? handleBack : null} 
          activeMenu={getActiveMenuTab()} 
          onMenuClick={handleMenuNavigation}
        >
          {renderPage()}
          <BottomNav user={user} activeTab={currentPage} setActiveTab={setCurrentPage} />
        </MobileLayout>
      )}
    </div>
  );
}

export default App;