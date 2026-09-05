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
    // Tambahkan kondisi currentShift === "selesai"
    const isDisabled = currentShift === "pagi" || !isSiangTime || currentShift === "selesai";
    const btnText = currentShift === "selesai" ? "TUGAS SELESAI" : currentShift === "pagi" ? "SELESAIKAN PAGI DULU" : isSiangTime ? "MULAI LAPORAN SIANG" : `TUNGGU JAM ${siangHour}:00 WIB`;

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
            Selamat bertugas, <span className="block text-3xl md:text-4xl font-black">{activeUser?.nama_lengkap || activeUser?.nama || activeUser?.name || "Pengemudi"}</span>
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
                <h4 className="text-base font-extrabold text-[#00206B] m-0">{activeUser?.trayek || "Belum ada trayek"}</h4>
                <p className="text-sm text-slate-500 font-medium mt-0.5">{activeUser?.bus || "Belum ada armada"}</p>
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
        <h2 className="text-3xl md:text-4xl font-black text-[#00206B] m-0">
          {activeUser?.nama_lengkap || activeUser?.nama || activeUser?.name || "Pengemudi"}
        </h2>
        <p className="text-sm text-slate-500 font-bold">Pengemudi Angkutan Sekolah</p>
        <p className="text-xs text-slate-400 font-semibold mt-1">{currentDate}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {(isLaporanLocked && currentShift === "siang") || currentShift === "selesai" ? (
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
              <div className="w-20 h-20 bg-[#E6F7ED] text-[#137333] rounded-full flex items-center justify-center border-4 border-[#BCECD2]">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-[#00206B] m-0">
                  {currentShift === "selesai" ? "TUGAS HARI INI SELESAI" : "Shift Pagi Selesai"}
                </h3>
                <p className="text-sm text-slate-500 font-medium mt-2 max-w-xs mx-auto">
                  {currentShift === "selesai" 
                    ? "Terima kasih! Anda telah menyelesaikan seluruh tugas operasional hari ini. Laporan akan dibuka kembali besok." 
                    : "Anda telah menyelesaikan tugas pagi. Silakan istirahat, dan mulai laporan siang pada menu di samping ketika waktunya tiba."}
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
                    <span className="text-base font-extrabold text-[#00206B] block">{activeUser?.trayek || "Belum ada trayek"}</span>
                    <span className="text-xs text-slate-400 font-semibold block mt-0.5">{activeUser?.bus || "Belum ada armada"}</span>
                  </div>
                </div>

                <button
                  onClick={onStartInspection}
                  className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-black text-sm py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(0,32,107,0.39)] hover:shadow-[0_6px_20px_rgba(0,32,107,0.23)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                >
                  MULAI LAPORAN PERJALANAN
                </button>
              </div>
            </>
          )}
        </div>

        <aside className="space-y-4">
          {renderKotakSiang()}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h4 className="text-sm font-extrabold text-[#00206B] mb-3">BATAS PENGISIAN LAPORAN</h4>
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
