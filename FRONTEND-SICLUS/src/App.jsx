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

// 🔥 COMPONENT MANAGE USERS (KHUSUS ADMIN)
const ManageUsers = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'pengemudi',
    phone: '',
    trayek: '',
    bus: ''
  });
  const [successMsg, setSuccessMsg] = useState('');

  const localUsers = JSON.parse(localStorage.getItem('siclus_users') || '[]');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('siclus_users') || '[]');
    
    if (users.find(u => u.email === formData.email)) {
      alert('Email sudah terdaftar!');
      return;
    }

    const newUser = {
      id: `SUP${String(users.length + 1).padStart(3, '0')}`,
      ...formData
    };

    users.push(newUser);
    localStorage.setItem('siclus_users', JSON.stringify(users));
    
    setSuccessMsg(`User ${formData.name} berhasil ditambahkan!`);
    setShowForm(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'pengemudi',
      phone: '',
      trayek: '',
      bus: ''
    });

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
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {successMsg && (
        <div className="bg-[#E6F7ED] border border-[#BCECD2] text-[#137333] font-bold py-3 px-4 rounded-xl flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          {successMsg}
        </div>
      )}

      <button onClick={() => setShowForm(true)} className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        TAMBAH PENGGUNA BARU
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {localUsers.filter(u => u.role !== 'admin').map((user) => (
          <div key={user.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-extrabold text-[#00206B] truncate">{user.name}</h3>
                <p className="text-xs text-slate-400 font-semibold">{user.id}</p>
                <p className="text-xs text-slate-500 mt-1 truncate">{user.email}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Trayek</span>
                <span className="font-bold text-[#00206B]">{user.trayek || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Bus</span>
                <span className="font-bold text-[#00206B]">{user.bus || '-'}</span>
              </div>
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
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Nama Lengkap</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" placeholder="Nama pengemudi" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" placeholder="pengemudi@siclus.id" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Password</label>
                <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" placeholder="Minimal 6 karakter" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">No. Telepon</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" placeholder="081234567890" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Trayek</label>
                <input type="text" name="trayek" value={formData.trayek} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" placeholder="Trayek A" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Bus</label>
                <input type="text" name="bus" value={formData.bus} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all" placeholder="Bus 07 (S 1772 SP)" />
              </div>
              <button type="submit" className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer mt-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                TAMBAH PENGGUNA
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("beranda");
  const [tripStatus, setTripStatus] = useState("belum_mulai");
  const [preparationData, setPreparationData] = useState(null);
  const [tripData, setTripData] = useState(null);
  const [inspections, setInspections] = useState([]);
  const [trips, setTrips] = useState([]);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    setTripStatus("belum_mulai");
    setCurrentPage("beranda");
  };

  const handleLogout = () => {
    setUser(null);
    setTripStatus("belum_mulai");
    setCurrentPage("beranda");
  };

  const handleStartInspection = () => {
    setCurrentPage("persiapan");
  };

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
    setTrips((prev) => [report, ...prev]);
    setTripStatus("belum_mulai");
    setCurrentPage("ringkasan");
    setTripData(null);
  };

  const handleResetLogs = () => {
    setInspections([]);
    setTrips([]);
    setTripStatus("belum_mulai");
  };

  const handleMenuNavigation = (menuId) => {
    if (menuId === 'laporan') {
      setCurrentPage('persiapan');
    } else if (menuId === 'riwayat') {
      setCurrentPage('ringkasan');
    } else if (menuId === 'rekap') {
      setCurrentPage('rekap');
    } else if (menuId === 'kelolauser') {
      setCurrentPage('kelolauser');
    } else if (menuId === 'akun') {
      setCurrentPage('akun');
    } else {
      setCurrentPage(menuId);
    }
  };

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
      case "kelolauser":
        return <ManageUsers onBack={() => setCurrentPage('beranda')} />;
      case "akun":
        return (
          <div className="flex flex-col items-center justify-center p-6 mt-6 space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-xl border-4 border-white">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-black text-[#00206B] uppercase tracking-tight">{user?.name || 'Pengemudi'}</h2>
              <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">{user?.id || 'ID Tidak Diketahui'} • {user?.role || 'Pengemudi'}</p>
            </div>
            <div className="w-full max-w-sm mt-8 p-6 bg-white rounded-[2rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col gap-4">
              <button
                onClick={handleLogout}
                className="w-full relative overflow-hidden bg-red-50 text-red-600 font-bold py-4 px-4 rounded-2xl border border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>KELUAR AKUN</span>
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
        return "Rekap Laporan";
      case "kelolauser":
        return "Kelola Pengguna";
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
    } else if (currentPage === "akun" || currentPage === "rekap" || currentPage === "kelolauser") {
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
          user={user}
          title={getPageTitle()}
          onBack={currentPage !== "beranda" && currentPage !== "ringkasan" ? handleBack : null}
          activeMenu={currentPage}
          onMenuClick={handleMenuNavigation}
        >
          {renderPage()}
          <BottomNav
            user={user}
            activeTab={currentPage}
            setActiveTab={setCurrentPage}
          />
        </MobileLayout>
      )}
    </div>
  );
}

export default App;