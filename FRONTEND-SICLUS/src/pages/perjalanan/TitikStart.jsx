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
    <div className="space-y-4 text-left max-w-[420px] mx-auto pb-6">
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-xl font-black text-[#00206B] m-0">Tiba di Titik Start</h2>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">Laporan Kedatangan Bus</p>
      </div>

      {/* Mock Map with floating card */}
      <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-[#E5EEF9] flex items-center justify-center">
        {/* Abstract Map Background Lines */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute left-[30%] top-0 bottom-0 w-[4px] bg-white"></div>
          <div className="absolute left-0 right-0 top-[40%] h-[4px] bg-white"></div>
          <div className="absolute left-0 right-0 top-[70%] h-[4px] bg-white"></div>
          <div className="absolute left-[70%] top-0 bottom-0 w-[4px] bg-white"></div>
          <div className="absolute left-[10%] right-[10%] top-[20%] bottom-[20%] rounded-full border-[8px] border-white"></div>
        </div>

        {/* Floating Card */}
        <div className="relative z-10 bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3.5 shadow-md max-w-[90%]">
          <div className="text-[#00206B]">
            {/* Map Pin Icon */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" fill="currentColor" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#00206B] m-0">Terminal Kertajaya</h3>
            <p className="text-[10px] text-slate-400 font-bold mt-0.5">Titik Awal Rute A</p>
          </div>
        </div>
      </div>

      {/* Automatic Time Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#E6F7ED] text-[#137333] flex items-center justify-center">
            {/* Clock Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block tracking-wide">Waktu Tercatat Otomatis</span>
            <span className="text-base font-black text-[#00206B] mt-0.5 block">06:10 WIB</span>
          </div>
        </div>
        
        {/* On Time Badge */}
        <div className="flex items-center gap-1 text-[#137333] font-extrabold text-xs">
          <span>✓</span>
          <span>Tepat Waktu</span>
        </div>
      </div>

      {/* Speedometer Input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <label className="block text-xs font-bold text-[#00206B] uppercase tracking-wide">
            Odometer Kendaraan (KM)
          </label>
          <div className="relative flex items-center bg-white border-2 border-[#00206B] rounded-2xl px-4 py-3 shadow-sm">
            <input
              type="number"
              required
              value={odometer}
              onChange={(e) => setOdometer(e.target.value)}
              className="w-full bg-transparent text-center text-xl font-black text-[#00206B] focus:outline-none placeholder-slate-300"
              placeholder="67013"
            />
            <span className="absolute right-4 text-xs font-black text-[#00206B]">KM</span>
          </div>
          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
            Pastikan angka sesuai dengan dashboard bus saat tiba.
          </p>
        </div>

        {/* Confirm Button */}
        <button
          type="submit"
          className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          KONFIRMASI TIBA ✓
        </button>
      </form>
    </div>
  );
};

export default TitikStart;
