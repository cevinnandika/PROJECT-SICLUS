# FRONTEND-SICLUS - Dokumentasi Source Code Inti

Dokumen ini berisi seluruh **source code inti aplikasi** dan **struktur folder** yang digunakan langsung untuk menjalankan sistem `PROJECT-SICLUS` saat ini tanpa menyertakan konfigurasi build/tooling eksternal seperti `package.json`, `vite.config.js`, dan `.gitignore`.

## 📁 Struktur File & Folder

```text
src/
├── assets/
│   └── react.svg
├── components/
│   ├── icons/
│   │   └── Icon.jsx
│   ├── layout/
│   │   ├── AppLayout.jsx
│   │   └── BottomNav.jsx
│   └── ui/
│       └── InspectionToggle.jsx
├── pages/
│   ├── admin/
│   │   ├── BerandaAdmin.jsx
│   │   ├── ManageDriver.jsx
│   │   ├── ProfilAdmin.jsx
│   │   ├── RegisterDriver.jsx
│   │   ├── RekapDriver.jsx
│   │   └── RiwayatAdmin.jsx
├── pages/
│   ├── auth/
│   │   └── Login.jsx
│   ├── beranda/
│   │   └── RingkasanHarian.jsx
│   └── driver/
│       ├── BerandaDriver.jsx
│       ├── DetailLaporan.jsx
│       ├── LaporanDriver.jsx
│       ├── ProfilDriver.jsx
│       └── RiwayatDriver.jsx
├── services/
│   └── api.js
├── App.jsx
├── index.css
└── Main.jsx
```

---

## 📑 Daftar Berkas Source Code

1. [`src/Main.jsx`](#1-srcmainjsx)
2. [`src/App.jsx`](#2-srcappjsx)
3. [`src/index.css`](#3-srcindexcss)
4. [`src/services/api.js`](#4-srcservicesapijs)
5. [`src/components/layout/AppLayout.jsx`](#5-srccomponentslayoutapplayoutjsx)
6. [`src/components/layout/BottomNav.jsx`](#6-srccomponentslayoutbottomnavjsx)
7. [`src/components/ui/InspectionToggle.jsx`](#7-srccomponentsuiinspectiontogglejsx)
8. [`src/components/icons/Icon.jsx`](#8-srccomponentsiconsiconjsx)
9. [`src/pages/auth/Login.jsx`](#9-srcpagesauthloginjsx)
10. [`src/pages/admin/BerandaAdmin.jsx`](#10-srcpagesadminberandaadminjsx)
11. [`src/pages/admin/ManageDriver.jsx`](#11-srcpagesadminmanagedriverjsx)
12. [`src/pages/admin/ProfilAdmin.jsx`](#12-srcpagesadminprofiladminjsx)
13. [`src/pages/admin/RegisterDriver.jsx`](#13-srcpagesadminregisterdriverjsx)
14. [`src/pages/admin/RekapDriver.jsx`](#14-srcpagesadminrekapdriverjsx)
15. [`src/pages/admin/RiwayatAdmin.jsx`](#15-srcpagesadminriwayatadminjsx)
16. [`src/pages/beranda/RingkasanHarian.jsx`](#16-srcpagesberandaringkasanharianjsx)
17. [`src/pages/driver/BerandaDriver.jsx`](#17-srcpagesdriverberandadriverjsx)
18. [`src/pages/driver/DetailLaporan.jsx`](#18-srcpagesdriverdetaillaporanjsx)
19. [`src/pages/driver/LaporanDriver.jsx`](#19-srcpagesdriverlaporandriverjsx)
20. [`src/pages/driver/ProfilDriver.jsx`](#20-srcpagesdriverprofildriverjsx)
21. [`src/pages/driver/RiwayatDriver.jsx`](#21-srcpagesdriverriwayatdriverjsx)

---

## 1. `src/Main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 
import './index.css'
import App from './App.jsx'

// Import Font
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

---

## 2. `src/App.jsx`

```jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { apiService } from "./services/api";

// Layouts
import AppLayout from "./components/layout/AppLayout";
import BottomNav from "./components/layout/BottomNav";

// Pages - Auth
import Login from "./pages/auth/Login";

// Pages - Admin
import RiwayatAdmin from "./pages/admin/RiwayatAdmin";
import ManageUser from "./pages/admin/ManageDriver";
import RekapPage from "./pages/admin/RekapDriver";
import ProfilAdmin from "./pages/admin/ProfilAdmin";

// Pages - Driver
import Beranda from "./pages/driver/BerandaDriver";
import Laporan from "./pages/driver/LaporanDriver";
import RiwayatDriver from "./pages/driver/RiwayatDriver";
import DetailLaporan from "./pages/driver/DetailLaporan";
import ProfilDriver from "./pages/driver/ProfilDriver";

// (PROTECTED ROUTE)
const ProtectedRoute = ({ user, allowedRole, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role.toLowerCase() !== allowedRole.toLowerCase()) {
    return <Navigate to={user.role.toLowerCase() === "admin" ? "/admin/riwayat" : "/driver/beranda"} replace />;
  }
  return children;
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const [tripStatus, setTripStatus] = useState("belum_mulai");
  const [driverReports, setDriverReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentShift, setCurrentShift] = useState("pagi");
  const [isLaporanLocked, setIsLaporanLocked] = useState(false);
  const [shiftRules, setShiftRules] = useState({ pagi: 5, siang: 12 });

  useEffect(() => {
    const token = localStorage.getItem("siclus_token");
    const savedUser = localStorage.getItem("siclus_user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsInitializing(false);
  }, []);

  const handleLogin = async (userInfo) => {
    setUser(userInfo);
    localStorage.setItem("siclus_user", JSON.stringify(userInfo));
    setTripStatus("belum_mulai");

    if (userInfo?.role?.toLowerCase() !== "admin") {
      try {
        const resJadwal = await apiService.getJadwalDriver();
        if (resJadwal && resJadwal.data) {
          const jadwalPagi = resJadwal.data.find((j) => j.tipe_sesi === "PAGI");
          const jadwalSiang = resJadwal.data.find((j) => j.tipe_sesi === "SIANG");
          setShiftRules({
            pagi: jadwalPagi ? parseInt(jadwalPagi.batas_keluar_dishub.split(":")[0]) : 5,
            siang: jadwalSiang ? parseInt(jadwalSiang.batas_keluar_dishub.split(":")[0]) : 12,
          });
        }
      } catch (err) {
        console.error("Gagal narik jadwal dari server:", err);
      }
      navigate("/driver/beranda");
    } else {
      navigate("/admin/riwayat");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("siclus_token");
    localStorage.removeItem("siclus_user");
    setUser(null);
    setTripStatus("belum_mulai");
    navigate("/login");
  };

  const handleMenuClick = (menuId) => {
    const baseRoute = user?.role?.toLowerCase() === "admin" ? "/admin" : "/driver";
    let targetRoute = menuId;
    if (menuId === "riwayatdriver") targetRoute = "riwayat";
    if (menuId === "kelolauser") targetRoute = "kelola-user";
    navigate(`${baseRoute}/${targetRoute}`);
  };

  const renderLockedScreen = () => {
    const nextShiftName = currentShift === "siang" ? "Siang" : "Pagi (Besok)";
    const nextShiftTime = currentShift === "siang" ? shiftRules.siang : shiftRules.pagi;
    return (
      <div className="flex flex-col items-center justify-center p-8 mt-16 text-center space-y-5 animate-[fadeIn_0.3s]">
        <div className="w-24 h-24 bg-[#FCE8E6] text-[#C5221F] rounded-full flex items-center justify-center border-4 border-[#FAD2CF] shadow-sm">🔒</div>
        <h2 className="text-2xl font-black text-[#00206B] uppercase m-0">Laporan Dikunci</h2>
        <div className="bg-white border-2 border-slate-200 w-full max-w-sm p-4 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Jadwal Pengisian Selanjutnya:</p>
          <p className="text-xl font-black text-[#C5221F]">
            Shift {nextShiftName} - {nextShiftTime}:00 WIB
          </p>
        </div>
        <button onClick={() => navigate("/driver/beranda")} className="mt-2 w-full max-w-xs bg-[#00206B] text-white py-4 rounded-xl font-extrabold text-sm shadow-md">
          Kembali ke Beranda
        </button>
      </div>
    );
  };

  if (isInitializing) return <div className="min-h-screen bg-[#131314] text-white flex items-center justify-center">Memuat Sistem...</div>;

  return (
    <div className="min-h-screen w-full bg-[#131314] font-sans antialiased overflow-hidden">
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <AppLayout user={user} title={"SICLUS"} onBack={location.pathname.includes("detail") ? () => navigate(-1) : null} activeMenu={location.pathname.split("/").pop()} onMenuClick={handleMenuClick}>
          <Routes>
            {/* ZONA KHUSUS DRIVER */}
            <Route path="/" element={<Navigate to={user?.role?.toLowerCase() === "admin" ? "/admin/riwayat" : "/driver/beranda"} replace />} />
            <Route
              path="/driver/*"
              element={
                <ProtectedRoute user={user} allowedRole="driver">
                  <Routes>
                    <Route
                      path="beranda"
                      element={
                        <Beranda
                          activeUser={user}
                          tripStatus={tripStatus}
                          currentShift={currentShift}
                          isLaporanLocked={isLaporanLocked}
                          shiftRules={shiftRules}
                          onLogout={handleLogout}
                          onStartInspection={() => navigate("/driver/laporan")}
                          onStartSiang={() => {
                            setIsLaporanLocked(false);
                            navigate("/driver/laporan");
                          }}
                        />
                      }
                    />
                    <Route
                      path="laporan"
                      element={
                        isLaporanLocked ? (
                          renderLockedScreen()
                        ) : (
                          <Laporan
                            user={user}
                            onFinishShift={() => {
                              setCurrentShift(currentShift === "pagi" ? "siang" : "pagi");
                              setIsLaporanLocked(currentShift === "pagi");
                              setTripStatus("belum_mulai");
                              navigate("/driver/beranda");
                            }}
                          />
                        )
                      }
                    />
                    <Route
                      path="riwayat"
                      element={
                        <RiwayatDriver
                          user={user}
                          driverReports={driverReports}
                          onViewDetail={(report) => {
                            setSelectedReport(report);
                            navigate("/driver/detail-laporan");
                          }}
                        />
                      }
                    />
                    <Route path="detail-laporan" element={<DetailLaporan report={selectedReport} onBack={() => navigate("/driver/riwayat")} />} />
                    <Route path="akun" element={<ProfilDriver user={user} onLogout={handleLogout} />} /> {/* ✅ FIX: Pake ProfilDriver */}
                    <Route path="*" element={<Navigate to="beranda" replace />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* ZONA KHUSUS ADMIN */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute user={user} allowedRole="admin">
                  <Routes>
                    <Route path="riwayat" element={<RiwayatAdmin user={user} />} />
                    <Route path="kelola-user" element={<ManageUser onBack={() => navigate("/admin/riwayat")} />} />
                    <Route path="rekap" element={<RekapPage />} />
                    <Route path="akun" element={<ProfilAdmin user={user} onLogout={handleLogout} />} /> {/* ✅ FIX: Pake ProfilAdmin */}
                    <Route path="*" element={<Navigate to="riwayat" replace />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
          <BottomNav user={user} />
        </AppLayout>
      )}
    </div>
  );
}

export default App;
```

---

## 3. `src/index.css`

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

## 4. `src/services/api.js`

```javascript
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// jwt token masuk
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("siclus_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// jwt token keluar
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("siclus_token");
      localStorage.removeItem("siclus_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const apiService = {
  // --- AUTH & USER ---
  login: async (email, password) => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },

  // ==========================================
  // ZONA DRIVER
  // ==========================================
  getJadwalDriver: async () => {
    const response = await apiClient.get("/driver/jadwal");
    return response.data;
  },
  getRiwayatDriver: async () => {
    const response = await apiClient.get("/driver/riwayat");
    return response.data;
  },
  mulaiLaporan: async (data) => {
    const response = await apiClient.post("/laporan/mulai", data);
    return response.data;
  },
  submitInspeksi: async (laporanId, data) => {
    const response = await apiClient.post(`/laporan/inspeksi?laporan_id=${laporanId}`, data);
    return response.data;
  },
  uploadSelfie: async (fileBlob) => {
    const formData = new FormData();
    formData.append("foto", fileBlob);
    const response = await apiClient.post("/laporan/upload-selfie", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  submitCP1: async (laporanId, data) => {
    const response = await apiClient.post(`/laporan/sesi/cp1?laporan_id=${laporanId}`, data);
    return response.data;
  },
  submitCP2: async (sesiId, data) => {
    const response = await apiClient.put(`/laporan/sesi/cp2/${sesiId}`, data);
    return response.data;
  },
  submitCP3: async (sesiId, data) => {
    const response = await apiClient.put(`/laporan/sesi/cp3/${sesiId}`, data);
    return response.data;
  },
  submitCP4: async (sesiId, data) => {
    const response = await apiClient.put(`/laporan/sesi/cp4/${sesiId}`, data);
    return response.data;
  },

  // ==========================================
  // ZONA ADMIN
  // ==========================================
  getDashboardAdmin: async () => {
    const response = await apiClient.get("/admin/dashboard");
    return response.data;
  },
  getRekapAdmin: async () => {
    const response = await apiClient.get("/admin/rekap");
    return response.data;
  },
  getRiwayatHarianAdmin: async () => {
    const response = await apiClient.get("/admin/riwayat-harian");
    return response.data;
  },
  getUsersAdmin: async () => {
    const response = await apiClient.get("/admin/users");
    return response.data;
  },
};

export default apiClient;
```

---

## 5. `src/components/layout/AppLayout.jsx`

```jsx
import React, { useState } from 'react';

const AppLayout = ({ children, title = 'SICLUS', onBack = null, activeMenu = 'beranda', onMenuClick = () => {}, user = null }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const adminMenuItems = [
    { id: 'riwayatdriver', label: 'Riwayat Driver', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> },
    { id: 'rekap', label: 'Rekap', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /> },
    { id: 'kelolauser', label: 'Kelola User', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
    { id: 'akun', label: 'Akun', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> }
  ];

  const driverMenuItems = [
    { id: 'beranda', label: 'Beranda', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
    { id: 'laporan', label: 'Laporan', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
    { id: 'riwayat', label: 'Riwayat', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { id: 'akun', label: 'Akun', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> }
  ];

  const menuItems = user?.role?.toLowerCase() === 'admin' ? adminMenuItems : driverMenuItems;

  return (
    <div className="flex h-screen w-full bg-[#131314] font-sans overflow-hidden">
      <aside className={`hidden md:flex flex-col h-full bg-[#131314] text-[#C4C7C5] transition-all duration-300 ease-in-out border-r border-white/5 z-50 ${isSidebarOpen ? 'w-64' : 'w-[72px]'}`}>
        <div className={`flex items-center h-20 ${isSidebarOpen ? 'px-4 justify-between' : 'justify-center'}`}>
          <div className={`overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
            <span className="text-xl font-black text-white tracking-widest uppercase">SICLUS</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex-shrink-0 focus:outline-none">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isReportTabActive = item.id === 'laporan' && ['persiapan', 'inspeksi', 'kendala', 'laporan'].includes(activeMenu);
            const isRiwayatTabActive = (item.id === 'riwayat' || item.id === 'riwayatdriver') && ['ringkasan', 'riwayat', 'detaillaporan'].includes(activeMenu);
            const isActive = activeMenu === item.id || isReportTabActive || isRiwayatTabActive;
            return (
              <button key={item.id} onClick={() => onMenuClick(item.id)} className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-[#A8C7FA]/10 text-[#A8C7FA]' : 'hover:bg-white/5 hover:text-white'}`} title={!isSidebarOpen ? item.label : ''}>
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{item.icon}</svg>
                </div>
                <div className={`overflow-hidden transition-all duration-300 flex items-center ${isSidebarOpen ? 'ml-4 opacity-100 w-full' : 'opacity-0 w-0'}`}>
                  <span className="text-sm font-semibold whitespace-nowrap text-left">{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
        <div className="p-3 mb-2 border-t border-white/5 mt-auto">
          <div onClick={() => onMenuClick('akun')} className="flex items-center p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer transition-colors group" title={!isSidebarOpen ? 'Buka Akun' : ''}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0 text-white shadow-md">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className={`overflow-hidden transition-all duration-300 flex flex-col justify-center ${isSidebarOpen ? 'ml-3 w-full opacity-100' : 'w-0 opacity-0'}`}>
              <span className="text-sm font-bold text-white truncate group-hover:text-cyan-200 transition-colors">{user?.name || 'Profil Saya'}</span>
              <span className="text-[10px] text-slate-400 truncate uppercase tracking-widest mt-0.5">{user?.role || 'Pengemudi'}</span>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-screen relative bg-[#F5F7FB] md:rounded-l-[2.5rem] md:my-2 md:mr-2 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-300">
        <header className="sticky top-0 z-40 flex items-center justify-between bg-white/80 backdrop-blur-xl px-6 py-4 border-b border-slate-200/50">
          <div className="w-10 flex items-center justify-start">
            {onBack && (
              <button onClick={onBack} className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all duration-200 text-slate-600 active:scale-95 focus:outline-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
            )}
          </div>
          <div className="text-center flex-1">
            <span className="text-lg font-black tracking-widest text-[#00206B] block uppercase">{title}</span>
          </div>
          <div className="w-10"></div>
        </header>
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 pb-28 md:pb-8">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
```

---

## 6. `src/components/layout/BottomNav.jsx`

```jsx
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

## 7. `src/components/ui/InspectionToggle.jsx`

```jsx
import React from 'react';

const InspectionToggle = ({ label, isChecked, onChange }) => {
  return (
    <label className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 rounded-xl cursor-pointer transition-all duration-200 select-none group">
      <span className="text-xs font-bold text-slate-700 group-hover:text-[#00206B] transition-colors duration-150">
        {label}
      </span>
      <div className="relative">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        {/* Track */}
        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${isChecked ? 'bg-[#34A853]' : 'bg-slate-300'}`}></div>
        {/* Thumb */}
        <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-transform duration-200 ${isChecked ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </div>
    </label>
  );
};

export default InspectionToggle;
```

---

## 8. `src/components/icons/Icon.jsx`

```jsx

```

---

## 9. `src/pages/auth/Login.jsx`

```jsx
import React, { useState, useEffect } from "react";
import { apiService } from "../../services/api";

const Login = ({ onLoginSuccess }) => {
  const [driverId, setDriverId] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. Tembak API Login (ngelewatin apiService yang udah disetting axios)
      const response = await apiService.login(driverId, pin);

      // 2. SIMPAN TIKET VIP (JWT) KE BRANKAS BROWSER!
      localStorage.setItem("siclus_token", response.access_token);

      // 3. Rapihin data dari Backend lu biar gampang dibaca FE Cevin
      const userData = {
        id: response.user.id,
        name: response.user.nama_lengkap,
        email: response.user.email,
        role: response.user.role,
        trayek: response.user.trayek,
        bus: response.user.bus,
      };

      setTimeout(() => {
        onLoginSuccess(userData);
      }, 500);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Terjadi kesalahan!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden font-sans">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 sm:-top-32 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-gradient-to-b from-blue-500 via-cyan-500 to-indigo-600 rounded-full blur-[80px] sm:blur-[120px] opacity-60 animate-pulse"></div>
      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 sm:-bottom-32 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-gradient-to-t from-purple-600 via-indigo-700 to-pink-500 rounded-full blur-[80px] sm:blur-[120px] opacity-50 animate-pulse"
        style={{ animationDelay: "2.5s" }}
      ></div>
      <div
        className={`relative w-full max-w-[360px] xs:max-w-[390px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[520px] bg-white/85 backdrop-blur-2xl rounded-[2.2rem] sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-white/70 transition-all duration-1000 ease-out transform ${isMounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
      >
        <div className="flex flex-col items-center text-center mt-1 mb-5 sm:mb-8">
          <div className="w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#00206B] via-[#00174E] to-[#000F33] flex items-center justify-center shadow-md border border-white/20">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <rect x="4" y="3" width="16" height="15" rx="3" />
              <line x1="4" y1="13" x2="20" y2="13" />
              <circle cx="8" cy="9" r="1.5" fill="currentColor" />
              <circle cx="16" cy="9" r="1.5" fill="currentColor" />
              <path d="M6 18v1.5a0.5 0 000.5 0.5h1a0.5 0 000.5-0.5V18H6zM16 18v1.5a0.5 0 000.5 0.5h1a0.5 0 000.5-0.5V18h-2z" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-4xl sm:text-3xl lg:text-4xl font-black text-[#00206B] tracking-tight mt-3 sm:mt-5 uppercase">SICLUS</h2>
          <p className="text-[7px] sm:text-xs font-bold text-slate-500 mt-1 tracking-widest leading-relaxed uppercase">School Integrated Check-in & Logbook Unit System</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className={`overflow-hidden transition-all duration-300 ${error ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="p-3 bg-red-500/10 border border-red-200/80 backdrop-blur-sm rounded-2xl text-xs text-red-600 font-bold text-center flex items-center justify-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
          <div className="space-y-1 group">
            <label className="text-[11px] sm:text-sm font-bold text-[#00206B] ml-1 uppercase tracking-wide">ID Pengemudi / Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#00206B] transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="9" cy="11" r="2.5" />
                  <path d="M15 9h3M15 13h3M15 17h3" />
                </svg>
              </div>
              <input
                type="text"
                required
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                className="w-full bg-slate-100/80 border-2 border-slate-200/70 focus:border-[#00206B] focus:bg-white focus:ring-4 focus:ring-[#00206B]/10 rounded-2xl pl-10 sm:pl-11 pr-4 py-3 sm:py-4 text-xs sm:text-base font-bold text-[#00206B] placeholder-slate-400 outline-none transition-all duration-300"
                placeholder="Contoh: admin@siclus.id"
              />
            </div>
          </div>
          <div className="space-y-1 group">
            <label className="text-[11px] sm:text-sm font-bold text-[#00206B] ml-1 uppercase tracking-wide">PIN / Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#00206B] transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <input
                type={showPin ? "text" : "password"}
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-slate-100/80 border-2 border-slate-200/70 focus:border-[#00206B] focus:bg-white focus:ring-4 focus:ring-[#00206B]/10 rounded-2xl pl-10 sm:pl-11 pr-11 py-3 sm:py-4 text-xs sm:text-base font-bold text-[#00206B] placeholder-slate-400 outline-none transition-all duration-300 tracking-wider"
                placeholder="••••••"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute inset-y-0 right-0 pr-3.5 sm:pr-4 flex items-center text-slate-400 hover:text-[#00206B] transition-colors focus:outline-none"
              >
                {showPin ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative overflow-hidden bg-gradient-to-r from-[#00206B] via-[#001D60] to-[#001240] text-white font-black py-3.5 sm:py-4 px-4 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,32,107,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(0,32,107,0.6)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 mt-3 sm:mt-6 group"
          >
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/30 opacity-20 group-hover:animate-[shine_1s] pointer-events-none" />
            <div className="flex items-center justify-center gap-2 relative z-10 text-xs sm:text-base">
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-white/70" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>MEMPROSES...</span>
                </>
              ) : (
                <>
                  <span>MASUK SISTEM</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </div>
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200/60">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="text-[9px] sm:text-xs font-bold text-slate-500 tracking-wide uppercase">Siclus 1.0</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

---

## 10. `src/pages/admin/BerandaAdmin.jsx`

```jsx

```

---

## 11. `src/pages/admin/ManageDriver.jsx`

```jsx
import React, { useState } from 'react';

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
  const [users, setUsers] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: `SUP${String(users.length + 1).padStart(3, '0')}`,
      ...formData
    };

    setUsers((prev) => [...prev, newUser]);
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">
            Kelola Pengguna
          </h2>
          <p className="text-sm text-slate-400 font-semibold mt-0.5">
            Tambah, edit, atau hapus akun pengemudi
          </p>
        </div>
        <button
          onClick={onBack}
          className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="bg-[#E6F7ED] border border-[#BCECD2] text-[#137333] font-bold py-3 px-4 rounded-xl flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          {successMsg}
        </div>
      )}

      {/* Add User Button */}
      <button
        onClick={() => setShowForm(true)}
        className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        TAMBAH PENGGUNA BARU
      </button>

      {/* User List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.filter(u => u.role !== 'admin').map((user) => (
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

      {/* Add User Modal/Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-[#00206B]">Tambah Pengguna Baru</h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all"
                  placeholder="Nama pengemudi"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all"
                  placeholder="pengemudi@siclus.id"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all"
                  placeholder="Minimal 6 karakter"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all"
                  placeholder="081234567890"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Trayek
                </label>
                <input
                  type="text"
                  name="trayek"
                  value={formData.trayek}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all"
                  placeholder="Trayek A"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Bus
                </label>
                <input
                  type="text"
                  name="bus"
                  value={formData.bus}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all"
                  placeholder="Bus 07 (S 1772 SP)"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer mt-2"
              >
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

export default ManageUsers;
```

---

## 12. `src/pages/admin/ProfilAdmin.jsx`

```jsx
import React from "react";

const ProfilAdmin = ({ user, onLogout }) => {
  return (
    <div className="space-y-6 text-left max-w-3xl mx-auto pb-6 relative">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Profil Administrator</h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">Kelola informasi akses dasbor instansi</p>
      </div>
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-slate-800 to-[#00206B]"></div>
        <div className="relative z-10 flex flex-col items-center mt-12 px-6 pb-8">
          <div className="w-28 h-28 rounded-full bg-white p-1.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
              <svg className="w-14 h-14 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </div>
          <h3 className="mt-4 text-2xl font-black text-[#00206B]">{user?.name || "Admin Dishub"}</h3>
          <span className="bg-slate-100 text-slate-600 font-bold px-4 py-1.5 rounded-full text-xs mt-2 uppercase tracking-wide border border-slate-200">{user?.role || "Administrator"}</span>
          <div className="mt-8 grid grid-cols-1 gap-3 w-full max-w-md">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Email Terdaftar</span>
              <span className="font-extrabold text-[#00206B] text-sm">{user?.email || "admin@siclus.id"}</span>
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

export default ProfilAdmin;
```

---

## 13. `src/pages/admin/RegisterDriver.jsx`

```jsx
import React, { useState } from "react";

const Register = ({ onRegisterSuccess, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter!");
      return;
    }

    // Simpan ke localStorage (nanti bisa diganti backend)
    const users = JSON.parse(localStorage.getItem("siclus_users") || "[]");

    if (users.find((u) => u.email === formData.email)) {
      setError("Email sudah terdaftar!");
      return;
    }

    const newUser = {
      id: `USR${Date.now()}`,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phone: formData.phone,
    };

    users.push(newUser);
    localStorage.setItem("siclus_users", JSON.stringify(users));

    onRegisterSuccess(newUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#00206B] to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white tracking-widest uppercase">SICLUS</h1>
          <p className="text-slate-300 text-sm mt-2">Sistem Informasi Angkutan Sekolah</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-[#00206B]">Buat Akun Admin</h2>
            <p className="text-xs text-slate-400 mt-1">Daftar untuk mengelola sistem</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3 rounded-xl mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="admin@siclus.id"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">No. Telepon</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="081234567890"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="Minimal 6 karakter"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Konfirmasi Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="Ulangi password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all text-sm cursor-pointer mt-2"
            >
              DAFTAR SEKARANG
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Sudah punya akun?{" "}
              <button onClick={onBackToLogin} className="text-[#00206B] font-bold hover:underline cursor-pointer">
                Login di sini
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
```

---

## 14. `src/pages/admin/RekapDriver.jsx`

```jsx
import React, { useState, useEffect } from "react";
import { apiService } from "../../services/api";

const Rekap = ({ trips = [], inspections = [] }) => {
  // inistate
  const [isLoading, setIsLoading] = useState(false);
  const [dataLaporan, setDataLaporan] = useState([]);

  // inifetch
  useEffect(() => {
    const fetchRekapBackend = async () => {
      setIsLoading(true);
      try {
        // Hapus komentar ini jika endpoint getRekapLaporan sudah tersedia di api.js lu
        // const response = await apiService.getRekapLaporan();
        // setDataLaporan(response.data);
      } catch (error) {
        console.error("Gagal mengambil data rekap dari server:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRekapBackend();
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-6">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Data Rekapitulasi</h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">Pantau dan unduh semua laporan pengemudi</p>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-sm">
        {isLoading ? (
          <div className="text-center text-[#00206B] font-bold py-10 animate-pulse">Mengambil data dari server...</div>
        ) : dataLaporan.length === 0 && trips.length === 0 ? (
          <div className="text-center text-slate-400 font-medium py-10">Belum ada data rekapitulasi perjalanan untuk saat ini.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 px-4 text-xs font-extrabold text-slate-500 uppercase">Tanggal</th>
                  <th className="py-3 px-4 text-xs font-extrabold text-slate-500 uppercase">Shift</th>
                  <th className="py-3 px-4 text-xs font-extrabold text-slate-500 uppercase">Total Siswa</th>
                  <th className="py-3 px-4 text-xs font-extrabold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* inirender dari props jika API belum dicolok sepenuhnya */}
                {trips.map((trip, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm font-bold text-[#00206B]">Hari ini</td>
                    <td className="py-3 px-4 text-sm font-bold text-slate-600 uppercase">{trip.tipe_sesi || "-"}</td>
                    <td className="py-3 px-4 text-sm font-bold text-slate-600">{trip.jumlah_penumpang || 0} Orang</td>
                    <td className="py-3 px-4">
                      <span className="bg-[#E6F7ED] text-[#137333] font-bold text-xs px-2 py-1 rounded">Selesai</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rekap;
```

---

## 15. `src/pages/admin/RiwayatAdmin.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const RiwayatAdmin = ({ onViewDetail, user }) => { 
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // KHUSUS ADMIN: Narik SEMUA riwayat 25 supir buat monitoring
    apiService.getRekapAdmin()
      .then(res => {
        if (res.data) {
          const formattedData = res.data.map(item => ({
            ...item,
            driverName: item.id_supir || "Anonim", // Munculin nama/ID supir yang ngisi
            date: item.tanggal,
            trayek: item.trayek,
            bus: item.bus,
            submittedAt: item.trip_sessions && item.trip_sessions.length > 0 ? "Selesai Direkam" : "Menunggu Penyelesaian"
          }));
          
          // Urutkan biar laporan paling baru (termasuk hari ini) ada di paling atas
          formattedData.sort((a, b) => new Date(b.created_at || b.tanggal) - new Date(a.created_at || a.tanggal));
          setReports(formattedData);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal narik data rekap admin:", err);
        setIsLoading(false);
      });
  }, [user]);

  if (isLoading) {
    return <div className="text-center p-10 font-bold text-[#00206B] animate-pulse">Memuat Monitoring Seluruh Armada... ⏳</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">
          Monitoring Laporan Armada
        </h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">
          Pantau aktivitas harian dan pengisian logbook dari seluruh pengemudi.
        </p>
      </div>

      {reports.length > 0 ? (
        <div className="space-y-3">
          {reports.map((report, index) => (
            <div key={index} onClick={() => onViewDetail && onViewDetail(report)} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-[#00206B] flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-inner">
                  {report.driverName?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-extrabold text-[#00206B] truncate">{report.driverName}</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">{report.date} • {report.trayek} • {report.bus}</p>
                  
                  {/* Indikator visual jelas buat admin */}
                  {report.submittedAt === "Selesai Direkam" ? (
                     <p className="text-[10px] text-emerald-600 font-bold mt-1 bg-emerald-50 w-max px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">✅ {report.submittedAt}</p>
                  ) : (
                     <p className="text-[10px] text-amber-600 font-bold mt-1 bg-amber-50 w-max px-2 py-0.5 rounded border border-amber-100 uppercase tracking-wider">⏳ {report.submittedAt}</p>
                  )}
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
          <h3 className="text-lg font-extrabold text-slate-600 m-0">Belum Ada Riwayat Laporan</h3>
          <p className="text-sm text-slate-500 font-medium mt-1">Belum ada pengemudi yang mengirimkan data ke server.</p>
        </div>
      )}
    </div>
  );
};

export default RiwayatAdmin;
```

---

## 16. `src/pages/beranda/RingkasanHarian.jsx`

```jsx
import React from "react";

const RingkasanHarian = ({ inspections = [], trips = [], currentShift, onResetAllLogs }) => {
  const latestTrip = trips[0];
  const latestInspection = inspections[0];
  const odometerStart = latestInspection?.odometer || "";
  const passengerCount = latestTrip?.passengers?.total || latestTrip?.passengers?.seated || 0;
  const departureTime = latestTrip?.departure || "";
  const arrivalTime = latestTrip?.arrival || "";
  const odometerDeparture = latestTrip?.odometerDeparture || "";
  const odometerArrival = latestTrip?.odometerArrival || "";

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">RINGKASAN LAPORAN HARIAN</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          {/* Card 1: Perjalanan Pagi */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-[#00206B] m-0 pb-2 border-b border-slate-100">Perjalanan Pagi</h3>

            {/* Start / Mulai Row */}
            <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="text-slate-400">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <rect x="4" y="3" width="16" height="15" rx="3" />
                  <line x1="4" y1="13" x2="20" y2="13" />
                  <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="16" cy="9" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div className="flex-1 flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Mulai (Dishub)</span>
                <div className="text-right">
                  <span className="font-black text-[#00206B] block">05:30 WIB</span>
                  <span className="text-xs text-slate-400 font-semibold block mt-0.5">KM {odometerStart ? parseInt(odometerStart).toLocaleString("id-ID") : "-"}</span>
                </div>
              </div>
            </div>

            {/* Departure from Start Point */}
            <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="text-slate-400">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" fill="currentColor" />
                </svg>
              </div>
              <div className="flex-1 flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Berangkat dari Titik Start</span>
                <div className="text-right">
                  <span className="font-black text-[#00206B] block">{departureTime} WIB</span>
                  <span className="text-xs text-slate-400 font-semibold block mt-0.5">KM {odometerDeparture ? parseInt(odometerDeparture).toLocaleString("id-ID") : "-"}</span>
                </div>
              </div>
            </div>

            {/* End / Selesai Row */}
            <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="text-slate-400">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
              </div>
              <div className="flex-1 flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Selesai (Sekolah)</span>
                <div className="text-right">
                  <span className="font-black text-[#00206B] block">{arrivalTime} WIB</span>
                  <span className="text-xs text-slate-400 font-semibold block mt-0.5">KM {odometerArrival ? parseInt(odometerArrival).toLocaleString("id-ID") : "-"}</span>
                </div>
              </div>
            </div>

            {/* Total Passengers Row */}
            <div className="flex items-center justify-between pt-2 text-sm">
              <span className="font-bold text-slate-500">Total Penumpang</span>
              <span className="text-base font-black text-[#00206B]">{passengerCount} Siswa</span>
            </div>
          </div>

          {/* 🔥 BELAJAR DISINI: Card Perjalanan Siang beserta tombolnya 
              UDAH GUE BUMI HANGUSKAN DARI SINI BIAR HALAMANNYA BERSIH! 🧹 */}
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-4">
          {/* Complete Data Check Box */}
          <div className="bg-[#E6F7ED] border border-[#BCECD2] rounded-xl p-4 flex items-center gap-2 text-[#137333] shadow-sm">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <span className="text-sm font-extrabold uppercase tracking-wide">Data Pagi Lengkap</span>
          </div>

          {/* Statistics */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h4 className="text-sm font-extrabold text-[#00206B] mb-3">Statistik Hari Ini</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Perjalanan</span>
                <span className="font-bold text-[#00206B]">1/2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Siswa</span>
                <span className="font-bold text-[#00206B]">{passengerCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jarak Tempuh</span>
                <span className="font-bold text-[#00206B]">{odometerArrival && odometerStart ? (parseInt(odometerArrival) - parseInt(odometerStart)).toLocaleString("id-ID") + " KM" : "30 KM"}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => alert("Laporan harian berhasil disimpan ke server!")}
              className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              SIMPAN LAPORAN HARIAN
            </button>
            {inspections.length > 0 && (
              <button
                onClick={onResetAllLogs}
                className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-500 hover:text-slate-700 font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Hapus Log Percobaan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingkasanHarian;
```

---

## 17. `src/pages/driver/BerandaDriver.jsx`

```jsx
import React from "react";

const Beranda = ({ activeUser, onQuickAction, onLogout, tripStatus = "belum_mulai", onStartInspection, currentShift, isLaporanLocked, shiftRules, onStartSiang }) => {
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentHour = new Date().getHours();
  const siangHour = shiftRules?.siang || 12;
  const isSiangTime = currentHour >= siangHour;
  const renderKotakSiang = () => {
    const isDisabled = currentShift === "pagi" || !isSiangTime;
    const btnText = currentShift === "pagi" ? "SELESAIKAN PAGI DULU" : isSiangTime ? "MULAI LAPORAN SIANG" : `TUNGGU JAM ${siangHour}:00 WIB`;

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 transition-all hover:shadow-md">
        <div className="flex items-center gap-3 text-[#00206B]">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-base font-extrabold m-0">Laporan Siang</h3>
            <p className="text-[11px] text-slate-500 font-bold mt-1">Buka Pukul {siangHour}:00 WIB</p>
          </div>
        </div>

        <button
          onClick={onStartSiang}
          disabled={isDisabled}
          className={`w-full font-extrabold py-3.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs ${
            !isDisabled ? "bg-[#00206B] hover:bg-[#00174E] text-white shadow-md active:scale-[0.98]" : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            {isDisabled ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            )}
          </svg>
          {btnText}
        </button>
      </div>
    );
  };

  // State: Shift Sedang Berlangsung
  if (tripStatus === "sedang_berlangsung") {
    return (
      <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
        <header className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0">
            Selamat bertugas, <span className="block text-3xl md:text-4xl font-black">{activeUser?.name || "Pengemudi"}</span>
          </h2>
          <p className="text-sm text-slate-400 font-semibold">{currentDate}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 bg-[#E6F7ED] border border-[#BCECD2] text-[#137333] font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                SEDANG BERLANGSUNG
              </div>
              <span className="text-sm font-black text-[#00206B]">Sistem Terhubung</span>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="w-12 h-12 rounded-lg bg-[#00206B] text-white flex items-center justify-center font-black text-xl shadow-sm">A</div>
              <div>
                <h4 className="text-base font-extrabold text-[#00206B] m-0">{activeUser?.trayek || "Trayek A"}</h4>
                <p className="text-sm text-slate-500 font-medium mt-0.5">{activeUser?.bus || "Bus 07"}</p>
              </div>
            </div>

            <button
              onClick={() => onQuickAction("laporan")}
              className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base"
            >
              LANJUTKAN LAPORAN
            </button>
          </div>

          <aside className="space-y-4">
            {renderKotakSiang()}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="text-[#00206B]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-black text-[#00206B] block uppercase tracking-wide">LOKASI TERVALIDASI</span>
                <span className="text-xs text-slate-400 font-semibold block">Dishub Mojokerto</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // State: Belum Mulai (Initial)
  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      <header className="space-y-1">
        <h2 className="text-3xl md:text-4xl font-black text-[#00206B] m-0">{activeUser?.name || "Pengemudi"}</h2>
        <p className="text-sm text-slate-500 font-bold">Pengemudi Angkutan Sekolah</p>
        <p className="text-xs text-slate-400 font-semibold mt-1">{currentDate}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {isLaporanLocked && currentShift === "siang" ? (
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
              <div className="w-20 h-20 bg-[#E6F7ED] text-[#137333] rounded-full flex items-center justify-center border-4 border-[#BCECD2]">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-[#00206B] m-0">Shift Pagi Selesai</h3>
                <p className="text-sm text-slate-500 font-medium mt-2 max-w-xs mx-auto">
                  Anda telah menyelesaikan tugas pagi. Silakan istirahat, dan mulai laporan siang pada menu di samping ketika waktunya tiba.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-[#E6F7ED] border border-[#BCECD2] rounded-xl p-4 flex items-center gap-2 text-[#137333] shadow-sm">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-sm font-black uppercase tracking-wide">SISTEM TERHUBUNG KE SERVER</span>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-[#00206B] m-0">Perjalanan Hari Ini</h3>
                    <span className="inline-block bg-slate-100 text-slate-500 font-extrabold text-xs px-3 py-1.5 rounded mt-1.5">BELUM DIMULAI</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-[#00206B] block">{activeUser?.trayek || "TRAYEK A"}</span>
                    <span className="text-xs text-slate-400 font-semibold block mt-0.5">{activeUser?.bus || "S 1772 SP"}</span>
                  </div>
                </div>

                <button className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-black text-sm py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(0,32,107,0.39)] hover:shadow-[0_6px_20px_rgba(0,32,107,0.23)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer">
                  MULAI LAPORAN PERJALANAN
                </button>
              </div>
            </>
          )}
        </div>

        <aside className="space-y-4">
          {renderKotakSiang()}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h4 className="text-sm font-extrabold text-[#00206B] mb-3">Info Cepat</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="font-semibold">Batas Buka Pagi</span>
                <span className="text-slate-400">{shiftRules?.pagi || 5}:00 WIB</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Batas Buka Siang</span>
                <span className="text-slate-400">{shiftRules?.siang || 12}:00 WIB</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 border-t border-slate-100 pt-2 text-center">Patuhi batas jadwal yang ditentukan.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Beranda;
```

---

## 18. `src/pages/driver/DetailLaporan.jsx`

```jsx
import React from 'react';

const DetailLaporan = ({ report }) => {
  if (!report) return null;

  const sesiPagi = report.trip_sessions?.find(s => s.tipe_sesi === "PAGI");
  const sesiSiang = report.trip_sessions?.find(s => s.tipe_sesi === "SIANG");
  const inspeksi = report.inspections && report.inspections.length > 0 ? report.inspections[0] : null;

  const calculateCompleteness = () => {
    let total = 0;
    let filled = 0;
    const checkFields = ['jam_berangkat_kantor', 'km_berangkat_kantor', 'jam_berangkat_start', 'km_berangkat_start', 'jam_tiba_finish', 'km_tiba_finish', 'jumlah_penumpang', 'jam_tiba_kantor', 'km_tiba_kantor'];

    if (sesiPagi) {
      total += checkFields.length;
      checkFields.forEach(field => { if (sesiPagi[field] !== null && sesiPagi[field] !== undefined) filled++; });
    }
    if (sesiSiang) {
      total += checkFields.length;
      checkFields.forEach(field => { if (sesiSiang[field] !== null && sesiSiang[field] !== undefined) filled++; });
    }
    if (inspeksi) {
      const inspFields = ['rem', 'ac', 'lampu', 'klakson', 'wiper', 'lampu_rem', 'bell', 'pintu', 'kebersihan'];
      total += inspFields.length;
      inspFields.forEach(field => { if (inspeksi[field]) filled++; });
    }
    return total > 0 ? Math.round((filled / total) * 100) : 0;
  };

  const completeness = calculateCompleteness();

  const formatTime = (timeString) => {
    if (!timeString) return "-";
    try {
      const d = new Date(timeString);
      if (!isNaN(d.getTime())) return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      return timeString;
    } catch {
      return timeString;
    }
  };

  const TimelineItem = ({ title, time, odometer, passengers, isLast }) => (
    <div className={`relative pl-7 ${isLast ? '' : 'pb-8'}`}>
      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-[#00206B] ring-4 ring-slate-50"></div>
      {!isLast && <div className="absolute left-[6px] top-5 bottom-0 w-0.5 bg-slate-100"></div>}
      
      <div>
        <h4 className="text-xs font-black text-[#00206B] uppercase tracking-wider">{title}</h4>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:max-w-sm">
          <div className="bg-slate-50 p-4 rounded-2xl">
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">WAKTU</span>
            <span className="block text-sm font-black text-slate-800 mt-1">{formatTime(time)} WIB</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl">
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">ODOMETER</span>
            <span className="block text-sm font-black text-slate-800 mt-1">{odometer ? `${odometer} KM` : '-'}</span>
          </div>
          {passengers !== undefined && passengers !== null && (
            <div className="col-span-2 bg-[#00206B] p-4 rounded-2xl flex justify-between items-center shadow-sm">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">SISWA DIANGKUT</span>
              <span className="text-sm font-black text-white">{passengers} ORANG</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const inspKeys = [
    { id: 'rem', label: 'REM' }, { id: 'ac', label: 'AC' }, { id: 'lampu', label: 'LAMPU' },
    { id: 'klakson', label: 'KLAKSON' }, { id: 'wiper', label: 'WIPER' }, { id: 'lampu_rem', label: 'LAMPU REM' },
    { id: 'bell', label: 'BELL' }, { id: 'pintu', label: 'PINTU' }, { id: 'kebersihan', label: 'KEBERSIHAN' }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10 mt-2">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-slate-100 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#00206B] text-white text-[10px] font-black rounded-lg uppercase tracking-widest mb-4">LAPORAN OPERASIONAL</span>
            <h2 className="text-3xl font-black text-[#00206B] uppercase tracking-tighter">{report.tanggal || report.date || 'TANGGAL KOSONG'}</h2>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#00206B] flex items-center justify-center text-white font-black text-xs">A</div>
                <span className="text-sm font-black text-slate-700 uppercase">{report.driverName || 'ANDA'}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
              <span className="text-sm font-black text-slate-500 uppercase">{report.trayek || '-'} ({report.bus || '-'})</span>
            </div>
          </div>
          
          <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-2xl">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={completeness >= 80 ? '#00206B' : completeness >= 50 ? '#F59E0B' : '#EF4444'} strokeWidth="4" strokeDasharray={`${completeness}, 100`} />
              </svg>
              <span className="absolute text-sm font-black text-[#00206B]">{completeness}%</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">KELENGKAPAN</p>
              <p className={`text-sm font-black mt-1 uppercase ${completeness >= 80 ? 'text-[#00206B]' : completeness >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                {completeness >= 80 ? 'DATA AMAN' : completeness >= 50 ? 'BELUM LENGKAP' : 'DATA KURANG'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-black text-[#00206B] uppercase tracking-widest mb-6">SESI BERANGKAT (PAGI)</h3>
          {sesiPagi ? (
            <div>
              <TimelineItem title="KELUAR GARASI DISHUB" time={sesiPagi.jam_berangkat_kantor} odometer={sesiPagi.km_berangkat_kantor} />
              <TimelineItem title="TIBA DI TITIK START" time={sesiPagi.jam_berangkat_start} odometer={sesiPagi.km_berangkat_start} />
              <TimelineItem title="TIBA DI SEKOLAH (FINISH)" time={sesiPagi.jam_tiba_finish} odometer={sesiPagi.km_tiba_finish} passengers={sesiPagi.jumlah_penumpang} />
              <TimelineItem title="KEMBALI KE DISHUB" time={sesiPagi.jam_tiba_kantor} odometer={sesiPagi.km_tiba_kantor} isLast={true} />
            </div>
          ) : (
             <div className="text-center py-12 text-slate-400 font-black text-xs uppercase tracking-widest bg-slate-50 rounded-2xl">DATA SESI PAGI KOSONG</div>
          )}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-black text-[#00206B] uppercase tracking-widest mb-6">SESI PULANG (SIANG)</h3>
          {sesiSiang ? (
            <div>
              <TimelineItem title="KELUAR GARASI DISHUB" time={sesiSiang.jam_berangkat_kantor} odometer={sesiSiang.km_berangkat_kantor} />
              <TimelineItem title="TIBA DI TITIK START" time={sesiSiang.jam_berangkat_start} odometer={sesiSiang.km_berangkat_start} />
              <TimelineItem title="TIBA DI SEKOLAH (FINISH)" time={sesiSiang.jam_tiba_finish} odometer={sesiSiang.km_tiba_finish} passengers={sesiSiang.jumlah_penumpang} />
              <TimelineItem title="KEMBALI KE DISHUB" time={sesiSiang.jam_tiba_kantor} odometer={sesiSiang.km_tiba_kantor} isLast={true} />
            </div>
          ) : (
             <div className="text-center py-12 text-slate-400 font-black text-xs uppercase tracking-widest bg-slate-50 rounded-2xl">DATA SESI SIANG KOSONG</div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
        <h3 className="text-sm font-black text-[#00206B] uppercase tracking-widest mb-6">KONDISI KENDARAAN (INSPEKSI)</h3>
        {inspeksi ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {inspKeys.map((item, idx) => {
                const statusValue = inspeksi[item.id];
                const isOk = statusValue === 'OK';
                return (
                  <div key={idx} className={`flex items-center justify-between px-5 py-4 rounded-2xl ${isOk ? 'bg-slate-50' : 'bg-[#C5221F]'}`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isOk ? 'text-slate-600' : 'text-white'}`}>{item.label}</span>
                    <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${isOk ? 'bg-white text-[#00206B] shadow-sm' : 'bg-white text-[#C5221F]'}`}>
                      {statusValue || '-'}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {inspeksi.catatan && (
              <div className="mt-6 bg-slate-50 p-5 rounded-2xl border-l-4 border-[#C5221F]">
                 <span className="text-[10px] font-black text-[#C5221F] uppercase tracking-widest block mb-2">CATATAN KERUSAKAN</span>
                 <p className="text-sm font-bold text-slate-700 leading-relaxed">{inspeksi.catatan}</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-slate-400 font-black text-xs uppercase tracking-widest bg-slate-50 rounded-2xl">
            DATA INSPEKSI TIDAK TERSEDIA
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailLaporan;
```

---

## 19. `src/pages/driver/LaporanDriver.jsx`

```jsx
import React, { useState, useRef, useEffect } from "react";
import { apiService } from "../../services/api";

const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const LiveCamera = ({ onCapture, onCancel }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        setStream(mediaStream);
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      } catch (err) {
        alert("Akses kamera ditolak!");
        onCancel();
      }
    };
    startCamera();
    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");
      if (stream) stream.getTracks().forEach((track) => track.stop());
      onCapture(imageData);
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-3">
      <div className="relative w-full aspect-[3/4] max-w-sm mx-auto bg-black rounded-lg overflow-hidden border-2 border-[#00206B]">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <div className="flex gap-2 w-full max-w-sm mx-auto">
        <button type="button" onClick={takePhoto} className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded shadow-md text-sm">
          Ambil Foto
        </button>
        <button
          type="button"
          onClick={() => {
            if (stream) stream.getTracks().forEach((t) => t.stop());
            onCancel();
          }}
          className="bg-rose-600 text-white font-bold py-3 px-6 rounded shadow-md text-sm"
        >
          Batal
        </button>
      </div>
    </div>
  );
};

const LaporanDriver = ({ user, currentShift = "pagi", onFinishShift }) => {
  const [activeCP, setActiveCP] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cpToConfirm, setCpToConfirm] = useState(null); // Fitur Safety Lock

  const [laporanId, setLaporanId] = useState(null);
  const [sesiId, setSesiId] = useState(null);

  const [merkKendaraan, setMerkKendaraan] = useState("");
  const [nopol, setNopol] = useState("");
  const [odoAwal, setOdoAwal] = useState("");
  const [odo2, setOdo2] = useState("");
  const [odo3, setOdo3] = useState("");
  const [odo4, setOdo4] = useState("");
  const [penumpang, setPenumpang] = useState("");
  const [catatan, setCatatan] = useState("");

  const [isPhotoSaved, setIsPhotoSaved] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const [inspeksi, setInspeksi] = useState({
    rem: null,
    ac: null,
    lampu: null,
    klakson: null,
    wiper: null,
    lampu_rem: null,
    bell: null,
    pintu: null,
    kebersihan: null,
  });

  useEffect(() => {
    const initLaporan = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const res = await apiService.mulaiLaporan({
          tanggal: today,
          trayek: user?.trayek || "T06",
          bus: user?.bus || "ARMADA",
        });
        setLaporanId(res.id);
      } catch (err) {
        console.error("Gagal init laporan:", err);
      }
    };
    initLaporan();
  }, [user]);

  const handleCeklis = (item, status) => setInspeksi((prev) => ({ ...prev, [item]: status }));
  const totalCeklis = Object.values(inspeksi).filter((val) => val !== null).length;
  const adaKurang = Object.values(inspeksi).includes("KURANG");

  // Logika Validasi (Jika ada "KURANG", wajib isi catatan)
  const isInspeksiValid = adaKurang ? totalCeklis === 9 && catatan.trim() !== "" : totalCeklis === 9;
  const isCP1Ready =
    currentShift === "pagi" ? isInspeksiValid && isPhotoSaved && odoAwal !== "" && merkKendaraan !== "" && nopol !== "" : isPhotoSaved && odoAwal !== "" && merkKendaraan !== "" && nopol !== "";

  const handlePreSubmit = (e, cpNumber) => {
    e.preventDefault();
    setCpToConfirm(cpNumber);
  };

  const submitCP1 = async () => {
    if (!laporanId) return alert("Sistem memuat ID Laporan. Tunggu sebentar.");
    setIsProcessing(true);
    try {
      const fileFoto = dataURLtoFile(photoPreview, `selfie_awal.jpg`);
      const uploadRes = await apiService.uploadSelfie(fileFoto);

      if (currentShift === "pagi") {
        await apiService.submitInspeksi(laporanId, { ...inspeksi, catatan: adaKurang ? catatan : "" });
      }

      const platNomorFinal = `${merkKendaraan.trim()} - ${nopol.trim()}`;
      const cp1Res = await apiService.submitCP1(laporanId, {
        tipe_sesi: currentShift,
        nopol_kendaraan: platNomorFinal,
        km_berangkat_kantor: parseInt(odoAwal),
        foto_awal: uploadRes.url_foto,
      });

      setSesiId(cp1Res.data.id);
      setCpToConfirm(null);
      setActiveCP(2);
    } catch (err) {
      alert("Gagal kirim CP1: " + (err.response?.data?.detail || err.message));
      setCpToConfirm(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const submitCP2 = async () => {
    setIsProcessing(true);
    try {
      await apiService.submitCP2(sesiId, { km_berangkat_start: parseInt(odo2) });
      setCpToConfirm(null);
      setActiveCP(3);
    } catch (err) {
      alert("Gagal kirim CP2: " + (err.response?.data?.detail || err.message));
      setCpToConfirm(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const submitCP3 = async () => {
    setIsProcessing(true);
    try {
      await apiService.submitCP3(sesiId, {
        km_tiba_finish: parseInt(odo3),
        jumlah_penumpang: parseInt(penumpang),
      });
      setIsPhotoSaved(false);
      setPhotoPreview(null);
      setCpToConfirm(null);
      setActiveCP(4);
    } catch (err) {
      alert("Gagal kirim CP3: " + (err.response?.data?.detail || err.message));
      setCpToConfirm(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const submitCP4 = async () => {
    setIsProcessing(true);
    try {
      const fileFoto = dataURLtoFile(photoPreview, `selfie_akhir.jpg`);
      const uploadRes = await apiService.uploadSelfie(fileFoto);

      await apiService.submitCP4(sesiId, {
        km_tiba_kantor: parseInt(odo4),
        foto_akhir: uploadRes.url_foto,
      });

      alert("Shift Berhasil Ditutup!");
      if (onFinishShift) onFinishShift();
    } catch (err) {
      alert("Gagal kirim CP4: " + (err.response?.data?.detail || err.message));
      setCpToConfirm(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const CheckItem = ({ id, label }) => (
    <div className="flex items-center justify-between bg-white border border-slate-200 p-2 rounded-lg shadow-sm">
      <span className="text-xs font-bold text-[#00206B] truncate w-20">{label}</span>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => handleCeklis(id, "OK")}
          className={`text-[9px] font-black px-3 py-1.5 rounded transition-colors ${inspeksi[id] === "OK" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}
        >
          OK
        </button>
        <button
          type="button"
          onClick={() => handleCeklis(id, "KURANG")}
          className={`text-[9px] font-black px-2 py-1.5 rounded transition-colors ${inspeksi[id] === "KURANG" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-400"}`}
        >
          KURANG
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 px-4 md:px-0 font-sans">
      {/* 🔴 CHECK POINT 1 🔴 */}
      <div className={`border rounded-xl bg-white transition-all ${activeCP === 1 ? "border-[#00206B] shadow-md" : "border-slate-200"}`}>
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
          <h3 className="font-black text-[#00206B] text-sm tracking-wide">CHECK POINT 1: KELUAR DISHUB</h3>
          {activeCP > 1 && <span className="text-emerald-600 font-black text-sm">✓</span>}
        </div>

        {activeCP >= 1 && (
          <form onSubmit={(e) => handlePreSubmit(e, 1)} className={`p-6 ${activeCP > 1 ? "opacity-60 pointer-events-none" : ""}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">TRAYEK PENUGASAN</p>
                  <h4 className="text-xl font-black text-[#00206B]">{user?.trayek || "T06"}</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">MERK MOBIL</label>
                    <input
                      type="text"
                      required
                      value={merkKendaraan}
                      onChange={(e) => setMerkKendaraan(e.target.value.toUpperCase())}
                      className="w-full p-3 border border-slate-200 rounded-lg font-bold text-[#00206B] outline-none focus:border-[#00206B]"
                      placeholder="Cth: ISUZU"
                    />
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">NO. POLISI</label>
                    <input
                      type="text"
                      required
                      value={nopol}
                      onChange={(e) => setNopol(e.target.value.toUpperCase())}
                      className="w-full p-3 border border-slate-200 rounded-lg font-bold text-[#00206B] outline-none focus:border-[#00206B]"
                      placeholder="Cth: S 1234 XA"
                    />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">ODOMETER AWAL (KM)</label>
                  <input
                    type="number"
                    required
                    value={odoAwal}
                    onChange={(e) => setOdoAwal(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-lg font-bold text-[#00206B] outline-none focus:border-[#00206B]"
                    placeholder="Contoh: 67008"
                  />
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">AMBIL FOTO WAJAH</span>
                  {isCameraOpen ? (
                    <LiveCamera
                      onCapture={(img) => {
                        setPhotoPreview(img);
                        setIsPhotoSaved(true);
                        setIsCameraOpen(false);
                      }}
                      onCancel={() => setIsCameraOpen(false)}
                    />
                  ) : !isPhotoSaved ? (
                    <button
                      type="button"
                      onClick={() => setIsCameraOpen(true)}
                      className="w-full aspect-[3/4] max-w-sm mx-auto flex flex-col items-center justify-center border-2 border-dashed border-[#00206B] text-[#00206B] bg-blue-50 font-bold text-sm rounded-lg hover:bg-blue-100 transition"
                    >
                      Buka Kamera
                    </button>
                  ) : (
                    <div className="relative w-full aspect-[3/4] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-emerald-500">
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded shadow z-10">✓ Foto Tersimpan</div>
                      <img src={photoPreview} alt="Selfie" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setIsCameraOpen(true)} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        Ulangi Foto
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {currentShift === "pagi" && (
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xs font-black text-slate-600 uppercase tracking-wider">INSPEKSI KENDARAAN</h4>
                      <p className="text-[10px] font-medium text-slate-400 mt-0.5">Lakukan pemeriksaan fungsional sebelum perjalanan.</p>
                    </div>
                    <div className="bg-[#00206B] text-white px-3 py-1.5 rounded-lg text-center shadow-sm">
                      <span className="block text-xs font-black">{totalCeklis}/9</span>
                      <span className="block text-[7px] uppercase font-bold">Diperiksa</span>
                    </div>
                  </div>

                  {/* BUNGKUS GRID 2 KOLOM HANYA UNTUK CHECKITEM */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <CheckItem id="rem" label="Rem" />
                    <CheckItem id="ac" label="AC" />
                    <CheckItem id="lampu" label="Lampu" />
                    <CheckItem id="klakson" label="Klakson" />
                    <CheckItem id="wiper" label="Wiper" />
                    <CheckItem id="lampu_rem" label="Lampu Rem" />
                    <CheckItem id="bell" label="Bell" />
                    <CheckItem id="pintu" label="Pintu" />
                    <CheckItem id="kebersihan" label="Kebersihan" />
                  </div>
                  {/* PENUTUP GRID 2 KOLOM DI SINI */}

                  {/* KOTAK CATATAN DI LUAR GRID BIAR FULL WIDTH */}
                  {adaKurang && (
                    <div className="mt-4 flex-grow flex flex-col bg-amber-50 p-4 rounded-xl border-2 border-amber-300 shadow-sm transition-all animate-[fadeIn_0.3s]">
                      <label className="text-[11px] font-black text-amber-800 uppercase tracking-wider block mb-2">Catatan Kerusakan (Wajib)</label>
                      <textarea
                        required
                        value={catatan}
                        onChange={(e) => setCatatan(e.target.value)}
                        className="flex-grow w-full min-h-[120px] p-3 border border-amber-300 rounded-lg text-sm text-slate-700 font-medium outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-shadow resize-none"
                        placeholder="Jelaskan detail komponen yang kurang berfungsi atau rusak..."
                      ></textarea>
                    </div>
                  )}
                </div>
              )}
            </div>

            {activeCP === 1 &&
              (cpToConfirm === 1 ? (
                <div className="mt-6 p-4 bg-[#FCE8E6] border-2 border-[#C5221F] rounded-xl shadow-sm">
                  <p className="text-sm font-bold text-[#C5221F] mb-3">Tunggu! Pastikan angka Odometer ({odoAwal} KM) dan Nopol sudah benar. Data tidak bisa diubah setelah terkirim!</p>
                  <div className="flex gap-3">
                    <button type="button" onClick={submitCP1} disabled={isProcessing} className="flex-1 bg-[#C5221F] text-white font-black py-3 rounded-lg shadow-md">
                      Ya, Kirim Permanen
                    </button>
                    <button type="button" onClick={() => setCpToConfirm(null)} className="flex-1 bg-white text-[#C5221F] font-bold py-3 rounded-lg border-2 border-[#C5221F]">
                      Batal / Cek Lagi
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={!isCP1Ready || isProcessing}
                  className={`w-full mt-6 py-4 rounded-xl font-black text-white transition-all shadow-md ${isCP1Ready ? "bg-[#00206B]" : "bg-slate-300"}`}
                >
                  KIRIM CP 1 & CATAT JAM KELUAR
                </button>
              ))}
          </form>
        )}
      </div>

      {/* 🔴 CHECK POINT 2 🔴 */}
      <div className={`border rounded-xl bg-white transition-all ${activeCP === 2 ? "border-[#00206B] shadow-md" : "border-slate-200"}`}>
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
          <h3 className={`font-black text-sm tracking-wide ${activeCP >= 2 ? "text-[#00206B]" : "text-slate-400"}`}>CHECK POINT 2: TIBA DI TITIK START</h3>
        </div>
        {activeCP >= 2 && (
          <form onSubmit={(e) => handlePreSubmit(e, 2)} className={`p-6 ${activeCP > 2 ? "opacity-60 pointer-events-none" : ""}`}>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">ODOMETER HALTE PERTAMA (KM)</label>
            <input
              type="number"
              required
              value={odo2}
              onChange={(e) => setOdo2(e.target.value)}
              className="w-full md:w-1/2 p-3 border border-slate-200 rounded-lg font-bold text-[#00206B] outline-none"
              placeholder="0"
            />

            {activeCP === 2 &&
              (cpToConfirm === 2 ? (
                <div className="mt-4 p-4 bg-[#FCE8E6] border-2 border-[#C5221F] rounded-xl shadow-sm md:w-1/2">
                  <p className="text-sm font-bold text-[#C5221F] mb-3">Odometer Halte = {odo2} KM. Lanjutkan?</p>
                  <div className="flex gap-3">
                    <button type="button" onClick={submitCP2} disabled={isProcessing} className="flex-1 bg-[#C5221F] text-white font-bold py-2 rounded-lg">
                      Kirim
                    </button>
                    <button type="button" onClick={() => setCpToConfirm(null)} className="flex-1 bg-white text-[#C5221F] font-bold py-2 rounded-lg border border-[#C5221F]">
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <button type="submit" className="block w-full md:w-1/2 mt-4 bg-[#00206B] text-white font-bold py-3 rounded-lg shadow-md">
                  SIMPAN & CATAT WAKTU TIBA
                </button>
              ))}
          </form>
        )}
      </div>

      {/* 🔴 CHECK POINT 3 🔴 */}
      <div className={`border rounded-xl bg-white transition-all ${activeCP === 3 ? "border-[#00206B] shadow-md" : "border-slate-200"}`}>
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
          <h3 className={`font-black text-sm tracking-wide ${activeCP >= 3 ? "text-[#00206B]" : "text-slate-400"}`}>CHECK POINT 3: TIBA DI TITIK FINISH</h3>
        </div>
        {activeCP >= 3 && (
          <form onSubmit={(e) => handlePreSubmit(e, 3)} className={`p-6 grid grid-cols-1 md:grid-cols-2 gap-6 ${activeCP > 3 ? "opacity-60 pointer-events-none" : ""}`}>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2">ODOMETER SEKOLAH (KM)</label>
              <input type="number" required value={odo3} onChange={(e) => setOdo3(e.target.value)} className="w-full p-3 border border-slate-200 rounded-lg font-bold text-[#00206B]" placeholder="0" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2">TOTAL SISWA DIANGKUT</label>
              <input
                type="number"
                required
                value={penumpang}
                onChange={(e) => setPenumpang(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg font-bold text-[#00206B]"
                placeholder="0"
              />
            </div>

            {activeCP === 3 && (
              <div className="col-span-1 md:col-span-2">
                {cpToConfirm === 3 ? (
                  <div className="mt-2 p-4 bg-[#FCE8E6] border-2 border-[#C5221F] rounded-xl shadow-sm">
                    <p className="text-sm font-bold text-[#C5221F] mb-3">
                      Odometer Akhir {odo3} KM & Jumlah {penumpang} Siswa. Data Benar?
                    </p>
                    <div className="flex gap-3">
                      <button type="button" onClick={submitCP3} disabled={isProcessing} className="flex-1 bg-[#C5221F] text-white font-bold py-2 rounded-lg">
                        Kirim Permanen
                      </button>
                      <button type="button" onClick={() => setCpToConfirm(null)} className="flex-1 bg-white text-[#C5221F] font-bold py-2 rounded-lg border border-[#C5221F]">
                        Cek Lagi
                      </button>
                    </div>
                  </div>
                ) : (
                  <button type="submit" className="w-full mt-2 bg-[#00206B] text-white font-bold py-3 rounded-lg shadow-md">
                    SIMPAN & CATAT WAKTU SELESAI
                  </button>
                )}
              </div>
            )}
          </form>
        )}
      </div>

      {/* 🔴 CHECK POINT 4 🔴 */}
      <div className={`border rounded-xl bg-white transition-all ${activeCP === 4 ? "border-[#C5221F] shadow-md" : "border-slate-200"}`}>
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
          <h3 className={`font-black text-sm tracking-wide ${activeCP >= 4 ? "text-[#00206B]" : "text-slate-400"}`}>CHECK POINT 4: KEMBALI KE DISHUB</h3>
        </div>
        {activeCP === 4 && (
          <form onSubmit={(e) => handlePreSubmit(e, 4)} className="p-6 space-y-6">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2">ODOMETER AKHIR GARASI (KM)</label>
              <input
                type="number"
                required
                value={odo4}
                onChange={(e) => setOdo4(e.target.value)}
                className="w-full md:w-1/2 p-3 border border-slate-200 rounded-lg font-bold text-[#00206B]"
                placeholder="0"
              />
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm md:w-1/2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">FOTO WAJAH AKHIR SHIFT</span>
              {isCameraOpen ? (
                <LiveCamera
                  onCapture={(img) => {
                    setPhotoPreview(img);
                    setIsPhotoSaved(true);
                    setIsCameraOpen(false);
                  }}
                  onCancel={() => setIsCameraOpen(false)}
                />
              ) : !isPhotoSaved ? (
                <button
                  type="button"
                  onClick={() => setIsCameraOpen(true)}
                  className="w-full aspect-[3/4] max-w-sm mx-auto flex flex-col items-center justify-center border-2 border-dashed border-[#00206B] text-[#00206B] bg-blue-50 font-bold hover:bg-blue-100 transition"
                >
                  Buka Kamera Akhir
                </button>
              ) : (
                <div className="relative w-full aspect-[3/4] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-emerald-500">
                  <img src={photoPreview} alt="Selfie" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setIsCameraOpen(true)} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    Ulangi Foto
                  </button>
                </div>
              )}
            </div>

            {cpToConfirm === 4 ? (
              <div className="p-4 bg-[#FCE8E6] border-2 border-[#C5221F] rounded-xl shadow-sm">
                <p className="text-sm font-bold text-[#C5221F] mb-3">Tutup Laporan Harian dengan Odometer Garasi {odo4} KM?</p>
                <div className="flex gap-3">
                  <button type="button" onClick={submitCP4} disabled={isProcessing} className="flex-1 bg-[#C5221F] text-white font-black py-4 rounded-xl shadow-md">
                    TUTUP SHIFT SEKARANG
                  </button>
                  <button type="button" onClick={() => setCpToConfirm(null)} className="flex-1 bg-white text-[#C5221F] font-bold py-4 rounded-xl border-2 border-[#C5221F]">
                    BATAL
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled={!isPhotoSaved}
                className={`w-full py-4 rounded-xl shadow-md font-black text-white transition-all ${!isPhotoSaved ? "bg-slate-300" : "bg-[#C5221F] hover:bg-red-800"}`}
              >
                SUBMIT FINAL & TUTUP SHIFT
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default LaporanDriver;
```

---

## 20. `src/pages/driver/ProfilDriver.jsx`

```jsx
import React from "react";

const ProfilDriver = ({ user, onLogout }) => {
  return (
    <div className="space-y-6 text-left max-w-3xl mx-auto pb-6 relative">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Profil Pengemudi</h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">Kelola informasi data diri operasional Anda</p>
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
          <h3 className="mt-4 text-2xl font-black text-[#00206B]">{user?.name || "Nama Pengemudi"}</h3>
          <span className="bg-blue-50 text-blue-600 font-bold px-4 py-1.5 rounded-full text-xs mt-2 uppercase tracking-wide border border-blue-100">{user?.role || "Pengemudi"}</span>
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

export default ProfilDriver;
```

---

## 21. `src/pages/driver/RiwayatDriver.jsx`

```jsx
import React, { useState, useEffect } from "react";
import { apiService } from "../../services/api";

const RiwayatDriver = ({ onViewDetail, user }) => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    apiService
      .getRiwayatDriver()
      .then((res) => {
        if (res.data) {
          const formattedData = res.data.map((item) => ({
            ...item,
            driverName: "ANDA",
            date: item.tanggal,
            trayek: item.trayek,
            bus: item.bus,
            submittedAt: item.trip_sessions && item.trip_sessions.length > 0 ? "SELESAI DIREKAM" : "MENUNGGU PENYELESAIAN",
          }));

          formattedData.sort((a, b) => new Date(b.created_at || b.tanggal) - new Date(a.created_at || a.tanggal));
          setReports(formattedData);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal menarik data riwayat pengemudi:", err);
        setIsLoading(false);
      });
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-20">
        <span className="text-xs font-black text-[#00206B] uppercase tracking-widest animate-pulse">MEMUAT RIWAYAT PERJALANAN...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto mt-2">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-[#00206B] uppercase tracking-tighter">RIWAYAT PERJALANAN</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">CATATAN OPERASIONAL HARIAN SISTEM</p>
      </div>

      {reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map((report, index) => {
            const isCompleted = report.submittedAt === "SELESAI DIREKAM";
            return (
              <div
                key={index}
                onClick={() => onViewDetail && onViewDetail(report)}
                className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-white flex items-center justify-between"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#00206B] flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-sm">A</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-black text-[#00206B] uppercase tracking-wide truncate">LAPORAN OPERASIONAL</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{report.date}</span>
                      <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        {report.trayek} ({report.bus})
                      </span>
                    </div>
                    <div className="mt-2.5">
                      <span
                        className={`inline-block px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${isCompleted ? "bg-[#00206B] text-white shadow-sm" : "bg-slate-100 text-slate-500"}`}
                      >
                        STATUS: {report.submittedAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-slate-300 pr-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-3xl">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">BELUM ADA DATA LAPORAN</span>
        </div>
      )}
    </div>
  );
};

export default RiwayatDriver;
```

---
