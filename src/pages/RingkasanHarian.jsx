import React from 'react';

const RingkasanHarian = ({ inspections = [], trips = [], onResetAllLogs }) => {
  return (
    <div className="space-y-4 text-left max-w-[420px] mx-auto pb-6">
      {/* Title */}
      <h2 className="text-xl font-black text-[#00206B] m-0 tracking-wide uppercase">
        RINGKASAN LAPORAN HARIAN
      </h2>

      {/* Card 1: Perjalanan Pagi */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-[#00206B] m-0 pb-2 border-b border-slate-100">
          Perjalanan Pagi
        </h3>

        {/* Start / Mulai Row */}
        <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="text-slate-400">
            {/* Bus Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
              <rect x="4" y="3" width="16" height="15" rx="3" />
              <line x1="4" y1="13" x2="20" y2="13" />
              <circle cx="8" cy="9" r="1.5" fill="currentColor" />
              <circle cx="16" cy="9" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="flex-1 flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700">Mulai (Dishub)</span>
            <div className="text-right">
              <span className="font-black text-[#00206B] block">05:30 WIB</span>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">KM 45,200</span>
            </div>
          </div>
        </div>

        {/* End / Selesai Row */}
        <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="text-slate-400">
            {/* Flag Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
          </div>
          <div className="flex-1 flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700">Selesai (Sekolah)</span>
            <div className="text-right">
              <span className="font-black text-[#00206B] block">07:15 WIB</span>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">KM 45,230</span>
            </div>
          </div>
        </div>

        {/* Total Passengers Row */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="font-bold text-slate-500">Total Penumpang</span>
          <span className="text-sm font-black text-[#00206B]">42 Siswa</span>
        </div>
      </div>

      {/* Card 2: Perjalanan Siang */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-[#00206B] m-0 pb-2 border-b border-slate-100">
          Perjalanan Siang
        </h3>

        {/* Status Warning Alert */}
        <div className="bg-[#FCE8E6] border border-[#FAD2CF] text-[#C5221F] rounded-xl p-3.5 flex items-center gap-2 text-xs font-bold">
          <span>⚠️</span>
          <span>Status: Belum Dimulai</span>
        </div>

        {/* Total Passengers Row */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="font-bold text-slate-400">Total Penumpang</span>
          <span className="text-sm font-black text-slate-400">-</span>
        </div>
      </div>

      {/* Complete Data Check Box */}
      <div className="bg-[#E6F7ED] border border-[#BCECD2] rounded-xl p-3.5 flex items-center gap-2 text-[#137333] shadow-sm">
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        <span className="text-xs font-extrabold uppercase tracking-wide">
          Data Pagi Lengkap
        </span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() => alert('Laporan harian berhasil disimpan ke server!')}
          className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          SIMPAN LAPORAN HARIAN
        </button>

        {inspections.length > 0 && (
          <button
            onClick={onResetAllLogs}
            className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-500 hover:text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Hapus Log Percobaan
          </button>
        )}
      </div>
    </div>
  );
};

export default RingkasanHarian;
