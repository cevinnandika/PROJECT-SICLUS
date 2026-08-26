import React, { useState } from 'react';

const Penumpang = ({ tripData, onSubmit }) => {
  const [passengerCount, setPassengerCount] = useState(6);

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0) {
      setPassengerCount(val);
    } else if (e.target.value === '') {
      setPassengerCount('');
    }
  };

  const handleBlur = () => {
    if (passengerCount === '') {
      setPassengerCount(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...tripData,
      passengers: {
        seated: passengerCount,
        standing: 0,
        total: passengerCount
      }
    });
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      
      {/* Title Section */}
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0">Pencatatan Penumpang</h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">
          {tripData?.route || 'Rute Pagi - SMPN 1 Mojokerto'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Input Penumpang (2/3 layar Desktop) */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-6 flex flex-col items-center h-full">
            <span className="text-lg font-extrabold text-[#00206B] tracking-tight block">
              Jumlah Pelajar / Penumpang
            </span>
            <div className="flex items-center justify-center gap-8 py-4 select-none w-full max-w-[400px]">
              <button
                type="button"
                onClick={() => setPassengerCount(Math.max(0, (typeof passengerCount === 'number' ? passengerCount : 0) - 1))}
                className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 text-3xl font-bold flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
              >
                －
              </button>
              
              <div className="flex items-baseline justify-center relative flex-1 min-w-[100px]">
                <input
                  type="text"
                  value={passengerCount}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="w-full text-center text-6xl font-black text-[#00206B] focus:outline-none bg-transparent"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPassengerCount((typeof passengerCount === 'number' ? passengerCount : 0) + 1)}
                  className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 text-3xl font-bold flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                >
                  ＋
                </button>
                <span className="text-sm font-black text-slate-500">Orang</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold pt-2 border-t border-slate-50 w-full justify-center">
              <span>ⓘ</span>
              <span>Klik +/- atau ketik langsung angkanya</span>
            </div>
          </div>
        </div>

        {/* 🔥 BELAJAR DISINI: Kolom Kanan: Info Perjalanan 
            Gue ubah padding jadi p-8 (setara kotak kiri),
            Font title dibesarin (text-lg), Font list dibesarin (text-sm/base),
            Margin/Space ditambahin biar renggang dan proporsional! */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm h-full">
            <h4 className="text-lg font-extrabold text-[#00206B] mb-5 border-b border-slate-100 pb-3">Info Perjalanan</h4>
            <div className="space-y-4 text-sm text-slate-600">
              
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-500">Rute</span>
                <span className="text-base font-black text-[#00206B]">Pagi</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-500">Trayek</span>
                <span className="text-base font-black text-[#00206B]">A</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-500">Bus</span>
                <span className="text-base font-black text-[#00206B]">07</span>
              </div>
              
            </div>
          </div>
        </div>

      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        SIMPAN DATA PENUMPANG
      </button>
    </div>
  );
};

export default Penumpang;