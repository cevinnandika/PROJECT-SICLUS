import React, { useState } from "react";
import MobileLayout from "./components/layout/MobileLayout";
import BottomNav from "./components/layout/BottomNav";

// Pages
import Login from "./pages/auth/Login";
import Beranda from "./pages/Beranda";
import Persiapan from "./pages/laporan/Persiapan";
import Inspeksi from "./pages/laporan/Inspeksi";
import Kendala from "./pages/laporan/Kendala";
import TitikStart from "./pages/perjalanan/TitikStart";
import Penumpang from "./pages/perjalanan/Penumpang";
import RingkasanHarian from "./pages/RingkasanHarian";

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("beranda");

  // Trip status machine: 'belum_mulai' | 'sedang_berlangsung' | 'selesai'
  const [tripStatus, setTripStatus] = useState("belum_mulai");

  // Shared state for preparation & active trip logs
  const [preparationData, setPreparationData] = useState(null);
  const [tripData, setTripData] = useState(null);

  // Completed inspections & trips logger
  const [inspections, setInspections] = useState([]);
  const [trips, setTrips] = useState([]);

  // Login handler
  const handleLogin = (userInfo) => {
    setUser(userInfo);
    setTripStatus("belum_mulai");
    setCurrentPage("beranda");
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setTripStatus("belum_mulai");
    setCurrentPage("beranda");
  };

  // Stepper 1 -> 2
  const handleStartInspection = () => {
    setCurrentPage("persiapan");
  };

  // Inspection checklist pass -> pre-departure confirmation
  const handleInspectionSuccess = (report) => {
    const timestamp = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
    setInspections((prev) => [{ ...report, timestamp }, ...prev]);
    setTripStatus("sedang_berlangsung");
    setCurrentPage("beranda");
  };

  // Inspection failed -> reported issues
  const handleInspectionIssues = (report) => {
    const timestamp = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
    setInspections((prev) => [{ ...report, timestamp }, ...prev]);
    setTripStatus("belum_mulai");
    setCurrentPage("ringkasan");
    setPreparationData(null);
  };

  // Passenger logging finish -> daily log summary view
  const handleTripSubmit = (report) => {
    setTrips((prev) => [report, ...prev]);
    setTripStatus("belum_mulai");
    setCurrentPage("ringkasan");
    setTripData(null);
  };

  // Reset logs
  const handleResetLogs = () => {
    setInspections([]);
    setTrips([]);
    setTripStatus("belum_mulai");
  };

  // ⚡ MAPPING KLIK MENU SIDEBAR & BOTTOM NAV
  const handleMenuNavigation = (menuId) => {
    if (menuId === 'laporan') {
      setCurrentPage('persiapan');
    } else if (menuId === 'riwayat') {
      setCurrentPage('ringkasan');
    } else if (menuId === 'rekap') {
      setCurrentPage('rekap'); // 🔥 Routing khusus Admin
    } else if (menuId === 'akun') {
      setCurrentPage('akun'); 
    } else {
      setCurrentPage(menuId);
    }
  };

  // Stepper screen switcher
  const renderPage = () => {
    if (!user) {
      return <Login onLoginSuccess={handleLogin} />;
    }

    switch (currentPage) {
      case "beranda":
        return (
          <Beranda
            activeUser={user}
            tripStatus={tripStatus}
            onQuickAction={setCurrentPage}
            onLogout={handleLogout}
            onStartInspection={handleStartInspection}
            stats={{
              totalInspection: inspections.length,
              activeTrips: trips.length,
            }}
          />
        );

      case "persiapan":
        return (
          <Persiapan
            onNext={(data) => {
              setPreparationData(data);
              setCurrentPage("inspeksi");
            }}
          />
        );
      case "inspeksi":
        if (!preparationData) {
          setCurrentPage("persiapan");
          return null;
        }
        return (
          <Inspeksi
            preparationData={preparationData}
            onNext={handleInspectionSuccess}
            onReportIssue={(report) => {
              setPreparationData(report);
              setCurrentPage("kendala");
            }}
          />
        );
      case "kendala":
        if (!preparationData) {
          setCurrentPage("persiapan");
          return null;
        }
        return <Kendala data={preparationData} onSubmit={handleInspectionIssues} />;

      case "titikstart":
        return (
          <TitikStart
            onNext={(data) => {
              setTripData(data);
              setCurrentPage("penumpang");
            }}
          />
        );
      case "penumpang":
        if (!tripData) {
          setCurrentPage("titikstart");
          return null;
        }
        return <Penumpang tripData={tripData} onSubmit={handleTripSubmit} />;

      case "ringkasan":
        return <RingkasanHarian inspections={inspections} trips={trips} onResetAllLogs={handleResetLogs} />;

      // 🔥 HALAMAN REKAP (KHUSUS ADMIN) 🔥
      case "rekap":
        return (
          <div className="flex flex-col items-center justify-center p-10 mt-10 animate-[fadeIn_0.5s_ease-out]">
            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-[#00206B] tracking-tight uppercase">Data Rekapitulasi</h2>
            <p className="text-slate-500 mt-3 text-center max-w-md font-medium leading-relaxed">
              Halaman ini digunakan untuk melihat rekapitulasi performa dan data pengemudi. Hanya dapat diakses oleh Admin.
            </p>
          </div>
        );

      // 🔥 HALAMAN AKUN + TOMBOL LOGOUT 🔥
      case "akun":
        return (
          <div className="flex flex-col items-center justify-center p-6 mt-6 space-y-6 animate-[fadeIn_0.5s_ease-out]">
            {/* Foto Profil Circle */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-xl border-4 border-white">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            {/* Nama & Role */}
            <div className="text-center">
              <h2 className="text-3xl font-black text-[#00206B] uppercase tracking-tight">{user?.name || 'Pengemudi'}</h2>
              <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">{user?.id || 'ID Tidak Diketahui'} • {user?.role || 'Pengemudi'}</p>
            </div>
            
            {/* Action Card: Tombol Keluar */}
            <div className="w-full max-w-sm mt-8 p-6 bg-white rounded-[2rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col gap-4">
              <button 
                onClick={handleLogout}
                className="w-full relative overflow-hidden bg-red-50 text-red-600 font-bold py-4 px-4 rounded-2xl border border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>KELUAR APLIKASI</span>
              </button>
            </div>
          </div>
        );

      default:
        return <Beranda activeUser={user} tripStatus={tripStatus} onQuickAction={setCurrentPage} onLogout={handleLogout} onStartInspection={handleStartInspection} />;
    }
  };

  const getPageTitle = () => {
    if (!user) return "SICLUS";
    switch (currentPage) {
      case "beranda":
        return "SICLUS";
      case "persiapan":
      case "inspeksi":
      case "kendala":
      case "titikstart":
      case "penumpang":
        return "Laporan";
      case "ringkasan":
        return "Riwayat";
      case "rekap":
        return "Rekap Laporan"; // 🔥 Judul Header untuk Rekap
      case "akun":
        return "Profil Akun"; 
      default:
        return "SICLUS";
    }
  };

  const handleBack = () => {
    if (currentPage === "inspeksi") {
      setCurrentPage("persiapan");
    } else if (currentPage === "kendala") {
      setCurrentPage("inspeksi");
    } else if (currentPage === "penumpang") {
      setCurrentPage("titikstart");
    } else if (currentPage === "akun" || currentPage === "rekap") {
      setCurrentPage("beranda"); 
    } else {
      setCurrentPage("beranda");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#131314] font-sans antialiased overflow-hidden">
      {!user ? (
        renderPage()
      ) : (
        <MobileLayout 
          user={user} // 🔥 KIRIM DATA USER KE LAYOUT BIAR BISA FILTER MENU
          title={getPageTitle()} 
          onBack={currentPage !== "beranda" && currentPage !== "ringkasan" ? handleBack : null}
          activeMenu={currentPage}
          onMenuClick={handleMenuNavigation}
        >
          {renderPage()}
          <BottomNav 
            user={user} // 🔥 KIRIM DATA USER KE BOTTOM NAV
            activeTab={currentPage} 
            setActiveTab={setCurrentPage} 
          />
        </MobileLayout>
      )}
    </div>
  );
}

export default App;