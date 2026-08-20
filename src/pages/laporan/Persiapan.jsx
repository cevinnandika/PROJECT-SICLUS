import React, { useState } from 'react';

const Persiapan = ({ onNext }) => {
  const [odometer, setOdometer] = useState('67008');
  const [photoTaken, setPhotoTaken] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (odometer && photoTaken) {
      onNext({
        odometer,
        photoTaken,
        driver: { name: 'Pak Budi', date: '24 Oktober 2023' },
        assignment: { route: 'Trayek A', bus: 'Bus 07', plate: 'S 1772 SP' }
      });
    }
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      {/* Progress Step Bar - Lebih Lebar */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#00206B] text-white flex items-center justify-center text-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm font-bold text-[#00206B]">Persiapan</span>
        </div>
        <div className="flex-1 mx-4 border-t-2 border-dashed border-slate-200"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center text-sm font-bold">
            2
          </div>
          <span className="text-sm font-bold text-slate-400">Inspeksi</span>
        </div>
      </div>

      {/* Grid Layout untuk Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          {/* Driver Card */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#00206B] m-0">Pak Budi</h3>
              <p className="text-sm text-slate-400 font-semibold mt-0.5">24 Oktober 2023</p>
            </div>
          </div>

          {/* Assignment Card */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-3">
            <span className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
              Penugasan Saat Ini
            </span>
            <div className="bg-[#F0F4F8] rounded-xl p-5 flex items-center justify-between border border-slate-100">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#00206B] m-0">Trayek A</h4>
                <p className="text-sm text-slate-500 font-medium">S 1772 SP (Bus 07)</p>
              </div>
              <div className="text-slate-400">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="4" y="3" width="16" height="15" rx="3" />
                  <line x1="4" y1="13" x2="20" y2="13" />
                  <circle cx="8" cy="9" r="1.2" fill="currentColor" />
                  <circle cx="16" cy="9" r="1.2" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>

          {/* Speedometer Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-3">
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-wide">
                Speedometer Awal (KM)
              </label>
              <input
                type="number"
                required
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-4 text-base text-[#00206B] font-bold focus:outline-none transition-all"
                placeholder="67008"
              />
            </div>

            {/* Take Photo Button */}
            <button
              type="button"
              onClick={() => setPhotoTaken(true)}
              className={`w-full py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all text-sm cursor-pointer ${
                photoTaken 
                  ? 'bg-[#E6F7ED] border-[#BCECD2] text-[#137333]' 
                  : 'bg-slate-200/80 border-slate-200 hover:bg-slate-300/80 text-[#00206B]'
              }`}
            >
              {photoTaken ? (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Foto Speedometer Terambil
                </>
              ) : (
                <>
                  <span className="text-lg">📷</span>
                  Ambil Foto Speedometer
                </>
              )}
            </button>

            {/* Proceed Button */}
            <button
              type="submit"
              disabled={!photoTaken}
              className="w-full bg-[#00206B] hover:bg-[#00174E] disabled:bg-slate-300 disabled:text-slate-500 text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <span>LANJUT KE INSPEKSI</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-4">
          {/* GPS Validated Alert */}
          <div className="bg-[#E6F7ED] border border-[#BCECD2] rounded-xl p-4 flex items-center gap-3 text-[#137333] shadow-sm">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-sm font-extrabold uppercase tracking-wide">
              GPS Tervalidasi
            </span>
          </div>

          {/* Info Card */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h4 className="text-sm font-extrabold text-[#00206B] mb-3">Info Persiapan</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="font-semibold">Waktu Mulai</span>
                <span className="text-slate-400">06:00 WIB</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Lokasi</span>
                <span className="text-slate-400">Dishub Mojokerto</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status</span>
                <span className="text-emerald-600 font-bold">Siap</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Persiapan;