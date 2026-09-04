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
