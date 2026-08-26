import React, { useState } from 'react';

const TitikStart = ({ onNext }) => {
  const [odometer, setOdometer] = useState('67013');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (odometer) {
      onNext({
        odometer,
        terminal: 'Terminal Kertajaya',
        route: 'Rute Pagi - SMPN 1 Mojokerto',
        arrivalTime: '06:10 WIB'
      });
    }
  };

  return (
    // 🔥 BELAJAR DISINI: Lebar kontainer diubah jadi max-w-4xl biar seragam dan nggak bantet!
    <div className="space-y-6 text-left max-w-4xl mx-auto pb-6">
      
      {/* Title */}
      <div className="space-y-1">
        {/* 🔥 BELAJAR DISINI: Font judul dibesarin (text-2xl/3xl) biar seragam sama halaman Beranda/Riwayat */}
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">
          Tiba di Titik Start
        </h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">Laporan Kedatangan Bus</p>
      </div>

      {/* 🔥 BELAJAR DISINI: Ilustrasi Peta (Mock Map) DIBABAT HABIS SESUAI PERMINTAAN! 🧹 */}

      {/* Wrapper Card Biar Rapi di Desktop */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
        
        {/* Automatic Time Card */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E6F7ED] text-[#137333] flex items-center justify-center">
              {/* Clock Icon */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block tracking-wide uppercase">Waktu Tercatat Otomatis</span>
              <span className="text-xl font-black text-[#00206B] mt-0.5 block">06:10 WIB</span>
            </div>
          </div>
          
          {/* On Time Badge */}
          <div className="flex items-center gap-1.5 bg-[#E6F7ED] text-[#137333] px-3 py-1.5 rounded-full font-extrabold text-xs">
            <span>✓</span>
            <span>Tepat Waktu</span>
          </div>
        </div>

        {/* Speedometer Input */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#00206B] uppercase tracking-wide">
              Odometer Kendaraan (KM)
            </label>
            <div className="relative flex items-center bg-white border-2 border-[#00206B] rounded-2xl px-5 py-4 shadow-sm">
              <input
                type="number"
                required
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                className="w-full bg-transparent text-center text-2xl font-black text-[#00206B] focus:outline-none placeholder-slate-300"
                placeholder="67013"
              />
              <span className="absolute right-5 text-sm font-black text-[#00206B]">KM</span>
            </div>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Pastikan angka sesuai dengan dashboard bus saat tiba.
            </p>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
          >
            KONFIRMASI TIBA ✓
          </button>
        </form>
      </div>
    </div>
  );
};

export default TitikStart;