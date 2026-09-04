import React from 'react';

const DetailLaporan = ({ report }) => {
  if (!report) return null;

  const sesiPagi = report.trip_sessions?.find(s => s.tipe_sesi === "PAGI");
  const sesiSiang = report.trip_sessions?.find(s => s.tipe_sesi === "SIANG");
  const inspeksi = report.inspections && report.inspections.length > 0 ? report.inspections[0] : null;

  const calculateCompleteness = () => {
    let total = 0;
    let filled = 0;
    const checkFields = ['jam_berangkat_kantor', 'km_berangkat_kantor', 'jam_berangkat_start', 'km_berangkat_start', 'jam_tiba_finish', 'km_tiba_finish', 'jumlah_penumpang', 'jam_tiba_kantor', 'km_tiba_kantor'];

    if (sesiPagi) {
      total += checkFields.length;
      checkFields.forEach(field => { if (sesiPagi[field] !== null && sesiPagi[field] !== undefined) filled++; });
    }
    if (sesiSiang) {
      total += checkFields.length;
      checkFields.forEach(field => { if (sesiSiang[field] !== null && sesiSiang[field] !== undefined) filled++; });
    }
    if (inspeksi) {
      const inspFields = ['rem', 'ac', 'lampu', 'klakson', 'wiper', 'lampu_rem', 'bell', 'pintu', 'kebersihan'];
      total += inspFields.length;
      inspFields.forEach(field => { if (inspeksi[field]) filled++; });
    }
    return total > 0 ? Math.round((filled / total) * 100) : 0;
  };

  const completeness = calculateCompleteness();

  const formatTime = (timeString) => {
    if (!timeString) return "-";
    try {
      const d = new Date(timeString);
      if (!isNaN(d.getTime())) return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      return timeString;
    } catch {
      return timeString;
    }
  };

  const TimelineItem = ({ title, time, odometer, passengers, isLast }) => (
    <div className={`relative pl-7 ${isLast ? '' : 'pb-8'}`}>
      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-[#00206B] ring-4 ring-slate-50"></div>
      {!isLast && <div className="absolute left-[6px] top-5 bottom-0 w-0.5 bg-slate-100"></div>}
      
      <div>
        <h4 className="text-xs font-black text-[#00206B] uppercase tracking-wider">{title}</h4>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:max-w-sm">
          <div className="bg-slate-50 p-4 rounded-2xl">
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">WAKTU</span>
            <span className="block text-sm font-black text-slate-800 mt-1">{formatTime(time)} WIB</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl">
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">ODOMETER</span>
            <span className="block text-sm font-black text-slate-800 mt-1">{odometer ? `${odometer} KM` : '-'}</span>
          </div>
          {passengers !== undefined && passengers !== null && (
            <div className="col-span-2 bg-[#00206B] p-4 rounded-2xl flex justify-between items-center shadow-sm">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">SISWA DIANGKUT</span>
              <span className="text-sm font-black text-white">{passengers} ORANG</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const inspKeys = [
    { id: 'rem', label: 'REM' }, { id: 'ac', label: 'AC' }, { id: 'lampu', label: 'LAMPU' },
    { id: 'klakson', label: 'KLAKSON' }, { id: 'wiper', label: 'WIPER' }, { id: 'lampu_rem', label: 'LAMPU REM' },
    { id: 'bell', label: 'BELL' }, { id: 'pintu', label: 'PINTU' }, { id: 'kebersihan', label: 'KEBERSIHAN' }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10 mt-2">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-slate-100 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#00206B] text-white text-[10px] font-black rounded-lg uppercase tracking-widest mb-4">LAPORAN OPERASIONAL</span>
            <h2 className="text-3xl font-black text-[#00206B] uppercase tracking-tighter">{report.tanggal || report.date || 'TANGGAL KOSONG'}</h2>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#00206B] flex items-center justify-center text-white font-black text-xs">A</div>
                <span className="text-sm font-black text-slate-700 uppercase">{report.driverName || 'ANDA'}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
              <span className="text-sm font-black text-slate-500 uppercase">{report.trayek || '-'} ({report.bus || '-'})</span>
            </div>
          </div>
          
          <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-2xl">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={completeness >= 80 ? '#00206B' : completeness >= 50 ? '#F59E0B' : '#EF4444'} strokeWidth="4" strokeDasharray={`${completeness}, 100`} />
              </svg>
              <span className="absolute text-sm font-black text-[#00206B]">{completeness}%</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">KELENGKAPAN</p>
              <p className={`text-sm font-black mt-1 uppercase ${completeness >= 80 ? 'text-[#00206B]' : completeness >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                {completeness >= 80 ? 'DATA AMAN' : completeness >= 50 ? 'BELUM LENGKAP' : 'DATA KURANG'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-black text-[#00206B] uppercase tracking-widest mb-6">SESI BERANGKAT (PAGI)</h3>
          {sesiPagi ? (
            <div>
              <TimelineItem title="KELUAR GARASI DISHUB" time={sesiPagi.jam_berangkat_kantor} odometer={sesiPagi.km_berangkat_kantor} />
              <TimelineItem title="TIBA DI TITIK START" time={sesiPagi.jam_berangkat_start} odometer={sesiPagi.km_berangkat_start} />
              <TimelineItem title="TIBA DI SEKOLAH (FINISH)" time={sesiPagi.jam_tiba_finish} odometer={sesiPagi.km_tiba_finish} passengers={sesiPagi.jumlah_penumpang} />
              <TimelineItem title="KEMBALI KE DISHUB" time={sesiPagi.jam_tiba_kantor} odometer={sesiPagi.km_tiba_kantor} isLast={true} />
            </div>
          ) : (
             <div className="text-center py-12 text-slate-400 font-black text-xs uppercase tracking-widest bg-slate-50 rounded-2xl">DATA SESI PAGI KOSONG</div>
          )}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-black text-[#00206B] uppercase tracking-widest mb-6">SESI PULANG (SIANG)</h3>
          {sesiSiang ? (
            <div>
              <TimelineItem title="KELUAR GARASI DISHUB" time={sesiSiang.jam_berangkat_kantor} odometer={sesiSiang.km_berangkat_kantor} />
              <TimelineItem title="TIBA DI TITIK START" time={sesiSiang.jam_berangkat_start} odometer={sesiSiang.km_berangkat_start} />
              <TimelineItem title="TIBA DI SEKOLAH (FINISH)" time={sesiSiang.jam_tiba_finish} odometer={sesiSiang.km_tiba_finish} passengers={sesiSiang.jumlah_penumpang} />
              <TimelineItem title="KEMBALI KE DISHUB" time={sesiSiang.jam_tiba_kantor} odometer={sesiSiang.km_tiba_kantor} isLast={true} />
            </div>
          ) : (
             <div className="text-center py-12 text-slate-400 font-black text-xs uppercase tracking-widest bg-slate-50 rounded-2xl">DATA SESI SIANG KOSONG</div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
        <h3 className="text-sm font-black text-[#00206B] uppercase tracking-widest mb-6">KONDISI KENDARAAN (INSPEKSI)</h3>
        {inspeksi ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {inspKeys.map((item, idx) => {
                const statusValue = inspeksi[item.id];
                const isOk = statusValue === 'OK';
                return (
                  <div key={idx} className={`flex items-center justify-between px-5 py-4 rounded-2xl ${isOk ? 'bg-slate-50' : 'bg-[#C5221F]'}`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isOk ? 'text-slate-600' : 'text-white'}`}>{item.label}</span>
                    <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${isOk ? 'bg-white text-[#00206B] shadow-sm' : 'bg-white text-[#C5221F]'}`}>
                      {statusValue || '-'}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {inspeksi.catatan && (
              <div className="mt-6 bg-slate-50 p-5 rounded-2xl border-l-4 border-[#C5221F]">
                 <span className="text-[10px] font-black text-[#C5221F] uppercase tracking-widest block mb-2">CATATAN KERUSAKAN</span>
                 <p className="text-sm font-bold text-slate-700 leading-relaxed">{inspeksi.catatan}</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-slate-400 font-black text-xs uppercase tracking-widest bg-slate-50 rounded-2xl">
            DATA INSPEKSI TIDAK TERSEDIA
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailLaporan;