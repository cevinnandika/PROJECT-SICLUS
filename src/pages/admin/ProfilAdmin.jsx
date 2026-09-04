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
