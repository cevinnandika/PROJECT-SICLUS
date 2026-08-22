import React, { useState } from 'react';

const checklistItems = [
  { id: 'rem', name: 'Rem', icon: '⚙️' },
  { id: 'ac', name: 'AC', icon: '❄️' },
  { id: 'lampu', name: 'Lampu', icon: '💡' },
  { id: 'klakson', name: 'Klakson', icon: '📢' },
  { id: 'wiper', name: 'Wiper', icon: '💧' },
  { id: 'lampuRem', name: 'Lampu Rem', icon: '🔦' },
  { id: 'bell', name: 'Bell', icon: '🔔' },
  { id: 'pintu', name: 'Pintu', icon: '🚪' },
  { id: 'kebersihan', name: 'Kebersihan', icon: '🧹' }
];

const Inspeksi = ({ preparationData, onNext, onReportIssue }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [answers, setAnswers] = useState({});

  const handleSelect = (itemId, status) => {
    setAnswers(prev => ({ ...prev, [itemId]: status }));
  };

  const evaluatedCount = Object.keys(answers).length;
  const isAllEvaluated = evaluatedCount === checklistItems.length;

  const handleLanjutkan = () => {
    if (!isAllEvaluated) return;
    const failedItems = Object.entries(answers)
      .filter(([_, status]) => status === 'KURANG')
      .map(([itemId]) => itemId);
    
    if (failedItems.length > 0) {
      onReportIssue({
        preparationData,
        checklist: answers,
        issueItem: failedItems[0]
      });
    } else {
      setShowSummary(true);
    }
  };

  const handleConfirmDeparture = () => {
    onNext({
      preparationData,
      checklist: answers,
      status: 'Siap Berangkat',
      summary: {
        trayek: 'Trayek A',
        armada: 'Bus 07',
        odometer: preparationData.odometer || '67008',
        waktu: '05:50 WIB'
      }
    });
  };

  // 1. RENDER SUMMARY
  if (showSummary) {
    return (
      <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#00206B] m-0">Ringkasan Laporan</h2>
          <p className="text-sm text-slate-400 font-semibold mt-0.5">Tinjauan akhir sebelum keberangkatan.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#E6F7ED] border border-[#BCECD2] rounded-2xl p-6 flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#34A853]/20 flex items-center justify-center text-[#137333] flex-shrink-0">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-[#137333] m-0">SIAP BERANGKAT</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Semua pengecekan keselamatan telah selesai.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-[#00206B] border border-slate-100">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-400 block tracking-wide">TRAYEK</span>
                  <span className="text-lg font-extrabold text-[#00206B]">Trayek A</span>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-[#00206B] border border-slate-100">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                    <rect x="4" y="3" width="16" height="15" rx="3" />
                    <line x1="4" y1="13" x2="20" y2="13" />
                    <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                    <circle cx="16" cy="9" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-400 block tracking-wide">ARMADA</span>
                  <span className="text-lg font-extrabold text-[#00206B]">Bus 07</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-3 shadow-sm">
              <div className="text-[#00206B]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 12l3-3" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-400 block tracking-wide">ODOMETER</span>
                <span className="text-base font-black text-[#00206B]">
                  {preparationData.odometer ? Number(preparationData.odometer).toLocaleString('id-ID') : '67.008'} KM
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-3 shadow-sm">
              <div className="text-[#00206B]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 15 14" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-400 block tracking-wide">WAKTU</span>
                <span className="text-base font-black text-[#00206B]">05:50 WIB</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirmDeparture}
          className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 text-base cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="4" y="3" width="16" height="15" rx="3" />
            <line x1="4" y1="13" x2="20" y2="13" />
            <circle cx="8" cy="9" r="1.5" fill="currentColor" />
            <circle cx="16" cy="9" r="1.5" fill="currentColor" />
          </svg>
          KONFIRMASI BERANGKAT
        </button>
      </div>
    );
  }

  // 2. RENDER PHYSICAL CHECKLIST
  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">
          INSPEKSI KONDISI KENDARAAN
        </h2>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed mt-0.5">
          Lakukan pemeriksaan visual dan fungsional sebelum memulai perjalanan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklistItems.map((item) => {
              const status = answers[item.id];
              return (
                <div 
                  key={item.id}
                  className="bg-white border border-slate-100 rounded-xl p-5 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                      {item.icon}
                    </span>
                    <span className="text-sm font-black text-[#00206B]">{item.name}</span>
                  </div>
                  <div className="flex bg-slate-100 rounded-lg p-0.5 w-[140px] border border-slate-200/50">
                    <button
                      type="button"
                      onClick={() => handleSelect(item.id, 'OK')}
                      className={`flex-1 text-xs font-extrabold py-2 rounded-md transition-all cursor-pointer ${
                        status === 'OK'
                          ? 'bg-[#34A853] text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      OK
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelect(item.id, 'KURANG')}
                      className={`flex-1 text-xs font-extrabold py-2 rounded-md transition-all cursor-pointer ${
                        status === 'KURANG'
                          ? 'bg-[#C5221F] text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      KURANG
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <div className="text-center">
              <div className="text-3xl font-black text-[#00206B] mb-2">
                {evaluatedCount} / {checklistItems.length}
              </div>
              <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                KOMPONEN DIPERIKSA
              </div>
            </div>
            <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
              <div 
                className="bg-[#00206B] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(evaluatedCount / checklistItems.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={handleLanjutkan}
            disabled={!isAllEvaluated}
            className="w-full bg-[#00206B] hover:bg-[#00174E] disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
          >
            LANJUTKAN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inspeksi;