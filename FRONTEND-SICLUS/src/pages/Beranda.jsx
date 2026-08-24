import React from 'react';

const Beranda = ({ activeUser, onQuickAction, onLogout, tripStatus = 'belum_mulai', onStartInspection }) => {
  const currentDate = 'Kamis, 13 Agustus 2026';

  // 1. RENDER ACTIVE TRIP STATE
  if (tripStatus === 'sedang_berlangsung') {
    return (
      <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
        {/* Welcome Section */}
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0">
            Selamat bertugas, <span className="block text-3xl md:text-4xl font-black">{activeUser.name || 'Pak Budi'}</span>
          </h2>
          <p className="text-sm text-slate-400 font-semibold">Senin, 24 Oktober 2023</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Trip Dashboard Card - Takes 2 columns on desktop */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
            {/* Status Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 bg-[#E6F7ED] border border-[#BCECD2] text-[#137333] font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                SEDANG BERLANGSUNG
              </div>
              <span className="text-sm font-black text-[#00206B]">06:15 WIB</span>
            </div>

            {/* Route details */}
            <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="w-12 h-12 rounded-lg bg-[#00206B] text-white flex items-center justify-center font-black text-xl">
                A
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#00206B] m-0">Trayek A</h4>
                <p className="text-sm text-slate-500 font-medium mt-0.5">Bus 07 (W 1234 XY)</p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="relative pl-6 space-y-6">
              <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-slate-200"></div>
              
              <div className="relative flex gap-3">
                <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#E6F7ED] border border-[#BCECD2] flex items-center justify-center text-[#137333] text-xs font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-500">Pemeriksaan Awal</span>
                  <span className="text-xs text-slate-400 font-semibold block mt-0.5">Selesai 06:05</span>
                </div>
              </div>

              <div className="relative flex gap-3">
                <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#00206B] border border-white flex items-center justify-center text-white text-xs font-bold">
                  •
                </div>
                <div>
                  <span className="text-sm font-black text-[#00206B]">Menuju Titik Start</span>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Halte SMPN 1 Mojokerto</p>
                  <div className="flex items-center gap-1.5 text-sm text-[#00206B] font-bold mt-1">
                    <span></span>
                    <span>Estimasi 10 menit</span>
                  </div>
                </div>
              </div>

              <div className="relative flex gap-3">
                <div className="absolute -left-6 w-5 h-5 rounded-full bg-slate-100 border-2 border-slate-300"></div>
                <div>
                  <span className="text-sm font-bold text-slate-300">Perjalanan Rute</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onQuickAction('titikstart')}
              className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              LANJUTKAN LAPORAN ➔
            </button>
          </div>

          {/* Sidebar Cards - Takes 1 column on desktop */}
          <div className="space-y-4">
            <button 
              onClick={() => alert('Menghubungi bantuan darurat...')}
              className="w-full bg-white border border-slate-100 hover:bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-sm text-[#C5221F] font-bold text-sm cursor-pointer"
            >
              <span className="text-3xl"></span>
              Darurat
            </button>

            <button 
              onClick={() => alert('Membuka peta rute...')}
              className="w-full bg-white border border-slate-100 hover:bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-sm text-[#00206B] font-bold text-sm cursor-pointer"
            >
              <span className="text-3xl">️</span>
              Peta Rute
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. RENDER INITIAL STATE
  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      {/* Profile Header */}
      <div className="space-y-1">
        <h2 className="text-3xl md:text-4xl font-black text-[#00206B] m-0">
          {activeUser.name || 'Pak Budi'}
        </h2>
        <p className="text-sm text-slate-500 font-bold">
          Pengemudi Angkutan Sekolah
        </p>
        <p className="text-xs text-slate-400 font-semibold mt-1">
          {currentDate}
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Assignment Card - Takes 2 columns on desktop */}
        <div className="lg:col-span-2 space-y-4">
          {/* System Active Badge */}
          <div className="bg-[#E6F7ED] border border-[#BCECD2] rounded-xl p-4 flex items-center gap-2 text-[#137333] shadow-sm">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-black uppercase tracking-wide">
              SISTEM AKTIF
            </span>
          </div>

          {/* Today's Assignment Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-[#00206B] m-0">
                  Perjalanan Hari Ini
                </h3>
                <span className="inline-block bg-slate-100 text-slate-500 font-extrabold text-xs px-3 py-1.5 rounded mt-1.5">
                  BELUM DIMULAI
                </span>
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold text-[#00206B] block">Trayek A</span>
                <span className="text-xs text-slate-400 font-semibold block mt-0.5">Bus 07 (S 1772 SP)</span>
              </div>
            </div>

            <button
              onClick={onStartInspection}
              className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer mt-2"
            >
              MULAI LAPORAN
            </button>
          </div>
        </div>

        {/* Sidebar Cards - Takes 1 column on desktop */}
        <div className="space-y-4">
          {/* Location Validated Tile */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="text-[#00206B]">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-black text-[#00206B] block uppercase tracking-wide">LOKASI TERVALIDASI</span>
              <span className="text-xs text-slate-400 font-semibold block">Dishub Mojokerto</span>
            </div>
          </div>

          {/* Quick Stats or Info Cards */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h4 className="text-sm font-extrabold text-[#00206B] mb-3">Info Cepat</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="font-semibold">Shift Pagi</span>
                <span className="text-slate-400">06:00 - 12:00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Trayek</span>
                <span className="text-slate-400">3 Hari Ini</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;