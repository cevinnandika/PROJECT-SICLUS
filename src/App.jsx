import React, { useState } from "react";
import { apiService } from "./services/api";
import MobileLayout from "./components/layout/MobileLayout";
import BottomNav from "./components/layout/BottomNav";
import Login from "./pages/auth/Login";
import Beranda from "./pages/Beranda";
import Laporan from "./pages/laporan/laporan"; 
import RiwayatDriver from "./pages/laporan/RiwayatDriver";
import RingkasanHarian from "./pages/RingkasanHarian";
import DetailLaporan from "./pages/laporan/DetailLaporan";
import RekapPage from "./pages/laporan/Rekap";

// components inline
const ProfilAkun = ({ user, onLogout }) => {
  return (
    <div className="space-y-6 text-left max-w-3xl mx-auto pb-6 relative">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Profil Akun</h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">Kelola informasi data diri pengemudi</p>
      </div>
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-[#00206B] to-blue-500"></div>
        <div className="relative z-10 flex flex-col items-center mt-12 px-6 pb-8">
          <div className="w-28 h-28 rounded-full bg-white p-1.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
              <svg className="w-14 h-14 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h3 className="mt-4 text-2xl font-black text-[#00206B]">{user?.name || "Darma Nugraha"}</h3>
          <span className="bg-blue-50 text-blue-600 font-bold px-4 py-1.5 rounded-full text-xs mt-2 uppercase tracking-wide border border-blue-100">
            {user?.role || "Pengemudi"}
          </span>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">ID Pengemudi</span>
              <span className="font-extrabold text-[#00206B] text-sm">{user?.id || "DRV-012"}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Trayek Tetap</span>
              <span className="font-extrabold text-[#00206B] text-sm">{user?.trayek || "TRAYEK A"}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left md:col-span-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Armada Default</span>
              <span className="font-extrabold text-[#00206B] text-sm">{user?.bus || "S 1772 SP"}</span>
            </div>
          </div>
          <div className="w-full mt-8 pt-6 border-t border-slate-100">
            <button onClick={onLogout} className="w-full bg-[#FCE8E6] hover:bg-[#FAD2CF] transition-colors text-[#C5221F] font-extrabold py-4 px-4 rounded-2xl cursor-pointer">
              🚪 KELUAR APLIKASI (LOGOUT)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageUsers = ({ onBack, onForceUnlock }) => {
  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#00206B]">Kelola Pengguna</h2>
        <button onClick={onBack} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer font-bold text-sm">Kembali</button>
      </div>
      <div className="bg-white border-2 border-red-100 rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="text-sm font-extrabold text-red-600 uppercase mb-4">Pengaturan Waktu & Kunci Laporan</h3>
        <button onClick={onForceUnlock} className="w-full bg-red-500 text-white font-black py-4 rounded-xl shadow-md cursor-pointer">
          BUKA PAKSA KUNCI LAPORAN SEMUA SUPIR
        </button>
      </div>
    </div>
  );
};

// main component
function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("beranda");
  const [tripStatus, setTripStatus] = useState("belum_mulai");
  const [driverReports, setDriverReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentShift, setCurrentShift] = useState("pagi");
  const [isLaporanLocked, setIsLaporanLocked] = useState(false);
  const [shiftRules, setShiftRules] = useState({ pagi: 5, siang: 12 });

  const handleLogin = async (userInfo) => {
    setUser(userInfo);
    setTripStatus("belum_mulai");
    if (userInfo?.role?.toLowerCase() !== "admin") {
      try {
        const resJadwal = await apiService.getJadwalDriver();
        if (resJadwal && resJadwal.data) {
          const jadwalPagi = resJadwal.data.find((j) => j.tipe_sesi === "PAGI");
          const jadwalSiang = resJadwal.data.find((j) => j.tipe_sesi === "SIANG");
          const jamPagi = jadwalPagi ? parseInt(jadwalPagi.batas_keluar_dishub.split(":")[0]) : 5;
          const jamSiang = jadwalSiang ? parseInt(jadwalSiang.batas_keluar_dishub.split(":")[0]) : 12;
          setShiftRules({ pagi: jamPagi, siang: jamSiang });
        }
      } catch (err) {
        console.error("Gagal narik jadwal dari server:", err);
      }
    }
    setCurrentPage(userInfo?.role?.toLowerCase() === "admin" ? "riwayatdriver" : "beranda");
  };

  const handleLogout = () => {
    localStorage.removeItem("siclus_token");
    setUser(null);
    setTripStatus("belum_mulai");
    setCurrentPage("beranda");
  };

  const handleMenuNavigation = (targetMenuOrPage) => {
    let finalPage = targetMenuOrPage;
    if (user?.role?.toLowerCase() === "admin") {
      if (["riwayatdriver", "rekap", "kelolauser", "akun"].includes(targetMenuOrPage)) {
        finalPage = targetMenuOrPage;
      } else {
        finalPage = "riwayatdriver";
      }
    } else {
      if (targetMenuOrPage === "laporan") finalPage = "laporan";
      else if (targetMenuOrPage === "riwayat") finalPage = "riwayatdriver";
      else if (targetMenuOrPage === "akun") finalPage = "akun";
      else if (targetMenuOrPage === "beranda") finalPage = "beranda";
    }
    setCurrentPage(finalPage);
  };

  const renderLockedScreen = () => {
    const nextShiftName = currentShift === "siang" ? "Siang" : "Pagi (Besok)";
    const nextShiftTime = currentShift === "siang" ? shiftRules.siang : shiftRules.pagi;
    return (
      <div className="flex flex-col items-center justify-center p-8 mt-16 text-center space-y-5 animate-[fadeIn_0.3s]">
        <div className="w-24 h-24 bg-[#FCE8E6] text-[#C5221F] rounded-full flex items-center justify-center border-4 border-[#FAD2CF] shadow-sm">
          🔒
        </div>
        <h2 className="text-2xl font-black text-[#00206B] uppercase m-0">Laporan Dikunci</h2>
        <div className="bg-white border-2 border-slate-200 w-full max-w-sm p-4 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Jadwal Pengisian Selanjutnya:</p>
          <p className="text-xl font-black text-[#C5221F]">Shift {nextShiftName} - {nextShiftTime}:00 WIB</p>
        </div>
        <button onClick={() => handleMenuNavigation("beranda")} className="mt-2 w-full max-w-xs bg-[#00206B] text-white py-4 rounded-xl font-extrabold text-sm shadow-md cursor-pointer">
          Kembali ke Beranda
        </button>
      </div>
    );
  };

  const getPageTitle = () => {
    if (!user) return "SICLUS";
    switch (currentPage) {
      case "beranda": return "SICLUS";
      case "laporan": return "Laporan Harian"; 
      case "riwayatdriver": return "Riwayat Pengemudi";
      case "detaillaporan": return "Detail Laporan";
      case "rekap": return "Rekap Laporan";
      case "kelolauser": return "Kelola Pengguna";
      case "akun": return "Profil Akun";
      default: return "SICLUS";
    }
  };

  const renderPage = () => {
    if (!user) return <Login onLoginSuccess={handleLogin} />;

    switch (currentPage) {
      case "beranda":
        if (user?.role?.toLowerCase() === "admin") {
          setCurrentPage("riwayatdriver");
          return null;
        }
        return (
          <Beranda
            activeUser={user}
            tripStatus={tripStatus}
            onQuickAction={handleMenuNavigation}
            onLogout={handleLogout}
            onStartInspection={() => setCurrentPage("laporan")}
            currentShift={currentShift}
            isLaporanLocked={isLaporanLocked}
            shiftRules={shiftRules}
            onStartSiang={() => {
                setIsLaporanLocked(false);
                setCurrentPage("laporan");
            }}
          />
        );

      case "laporan":
        if (isLaporanLocked) return renderLockedScreen();
        return (
          <Laporan 
             user={user} 
             onFinishShift={() => {
                if (currentShift === "pagi") {
                  setCurrentShift("siang");
                  setIsLaporanLocked(true);
                } else {
                  setCurrentShift("pagi");
                  setIsLaporanLocked(false);
                }
                setTripStatus("belum_mulai");
                setCurrentPage("beranda");
             }} 
          />
        );

      case "riwayatdriver":
        return <RiwayatDriver user={user} driverReports={driverReports} onViewDetail={(report) => { setSelectedReport(report); setCurrentPage("detaillaporan"); }} />;
      
      case "detaillaporan":
        return <DetailLaporan report={selectedReport} onBack={() => setCurrentPage("riwayatdriver")} />;
      
      case "rekap":
        return <RekapPage />;
      
      case "kelolauser":
        return <ManageUsers onBack={() => setCurrentPage("riwayatdriver")} shiftRules={shiftRules} setShiftRules={setShiftRules} onForceUnlock={() => { setIsLaporanLocked(false); alert("Status penguncian laporan telah dibuka."); }} />;
      
      case "akun":
        return <ProfilAkun user={user} onLogout={handleLogout} />;
      
      default:
        return <Beranda activeUser={user} tripStatus={tripStatus} onQuickAction={handleMenuNavigation} onLogout={handleLogout} onStartInspection={() => setCurrentPage("laporan")} />;
    }
  };

  const getActiveMenuTab = () => {
    if (currentPage === "laporan") return "laporan";
    if (currentPage === "detaillaporan") return "riwayatdriver";
    return currentPage;
  };

  return (
    <div className="min-h-screen w-full bg-[#131314] font-sans antialiased overflow-hidden">
      {!user ? (
        renderPage()
      ) : (
        <MobileLayout
          user={user}
          title={getPageTitle()}
          onBack={currentPage !== "beranda" && currentPage !== "rekap" && currentPage !== "kelolauser" && currentPage !== "riwayatdriver" ? () => handleMenuNavigation("beranda") : null}
          activeMenu={getActiveMenuTab()}
          onMenuClick={handleMenuNavigation}
        >
          {renderPage()}
          <BottomNav user={user} activeTab={currentPage} setActiveTab={handleMenuNavigation} />
        </MobileLayout>
      )}
    </div>
  );
}

export default App;