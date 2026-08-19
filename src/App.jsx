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
    setCurrentPage("beranda"); // Go back to dashboard showing active trip stepper
  };

  // Inspection failed -> reported issues
  const handleInspectionIssues = (report) => {
    const timestamp = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
    setInspections((prev) => [{ ...report, timestamp }, ...prev]);
    setTripStatus("belum_mulai");
    setCurrentPage("ringkasan"); // View logs which shows issues
    setPreparationData(null);
  };

  // Passenger logging finish -> daily log summary view
  const handleTripSubmit = (report) => {
    setTrips((prev) => [report, ...prev]);
    setTripStatus("belum_mulai"); // Reset trip cycle
    setCurrentPage("ringkasan"); // Open Daily summary log screen (Image 4)
    setTripData(null);
  };

  // Reset logs
  const handleResetLogs = () => {
    setInspections([]);
    setTrips([]);
    setTripStatus("belum_mulai");
  };

  // Stepper screen switcher
  const renderPage = () => {
    // Kalau belum login, langsung tembak komponen Login aja!
    if (!user) {
      return <Login onLoginSuccess={handleLogin} />;
    }

    // Kalau udah login, baru masuk ke routing halaman aplikasi
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

      // PRE-CHECK INSPECTION FLOW
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

      // ARRIVAL & PASSENGER INPUT FLOW
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

      // DAILY REKAPITULASI
      case "ringkasan":
        return <RingkasanHarian inspections={inspections} trips={trips} onResetAllLogs={handleResetLogs} />;

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
        return "Laporan";
      case "inspeksi":
        return "Laporan";
      case "kendala":
        return "Laporan";
      case "titikstart":
        return "Laporan";
      case "penumpang":
        return "Laporan";
      case "ringkasan":
        return "SICLUS";
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
    } else {
      setCurrentPage("beranda");
    }
  };

  return (
    // Container Utama (Full Screen Web)
    <div className="min-h-screen w-full bg-[#F5F7FB] font-sans antialiased">
      {!user ? (
        /* =========================================
           TAMPILAN 1: WEB FULL SCREEN UNTUK LOGIN
           ========================================= */
        renderPage()
      ) : (
        /* =========================================
           TAMPILAN 2: MOBILE VIEW UNTUK APP SUPIR
           ========================================= */
        <div className="flex justify-center items-start min-h-screen bg-slate-200">
          <MobileLayout title={getPageTitle()} onBack={currentPage !== "beranda" && currentPage !== "ringkasan" ? handleBack : null}>
            {renderPage()}
          </MobileLayout>

          <BottomNav activeTab={currentPage} setActiveTab={setCurrentPage} />
        </div>
      )}
    </div>
  );
}

export default App;
