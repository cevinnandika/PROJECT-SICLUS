import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const RiwayatAdmin = ({ onViewDetail, user }) => { 
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // KHUSUS ADMIN: Narik SEMUA riwayat 25 supir buat monitoring
    apiService.getRekapAdmin()
      .then(res => {
        if (res.data) {
          const formattedData = res.data.map(item => ({
            ...item,
            driverName: item.id_supir || "Anonim", // Munculin nama/ID supir yang ngisi
            date: item.tanggal,
            trayek: item.trayek,
            bus: item.bus,
            submittedAt: item.trip_sessions && item.trip_sessions.length > 0 ? "Selesai Direkam" : "Menunggu Penyelesaian"
          }));
          
          // Urutkan biar laporan paling baru (termasuk hari ini) ada di paling atas
          formattedData.sort((a, b) => new Date(b.created_at || b.tanggal) - new Date(a.created_at || a.tanggal));
          setReports(formattedData);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal narik data rekap admin:", err);
        setIsLoading(false);
      });
  }, [user]);

  if (isLoading) {
    return <div className="text-center p-10 font-bold text-[#00206B] animate-pulse">Memuat Monitoring Seluruh Armada... ⏳</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">
          Monitoring Laporan Armada
        </h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">
          Pantau aktivitas harian dan pengisian logbook dari seluruh pengemudi.
        </p>
      </div>

      {reports.length > 0 ? (
        <div className="space-y-3">
          {reports.map((report, index) => (
            <div key={index} onClick={() => onViewDetail && onViewDetail(report)} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-[#00206B] flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-inner">
                  {report.driverName?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-extrabold text-[#00206B] truncate">{report.driverName}</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">{report.date} • {report.trayek} • {report.bus}</p>
                  
                  {/* Indikator visual jelas buat admin */}
                  {report.submittedAt === "Selesai Direkam" ? (
                     <p className="text-[10px] text-emerald-600 font-bold mt-1 bg-emerald-50 w-max px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">✅ {report.submittedAt}</p>
                  ) : (
                     <p className="text-[10px] text-amber-600 font-bold mt-1 bg-amber-50 w-max px-2 py-0.5 rounded border border-amber-100 uppercase tracking-wider">⏳ {report.submittedAt}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>
          <h3 className="text-lg font-extrabold text-slate-600 m-0">Belum Ada Riwayat Laporan</h3>
          <p className="text-sm text-slate-500 font-medium mt-1">Belum ada pengemudi yang mengirimkan data ke server.</p>
        </div>
      )}
    </div>
  );
};

export default RiwayatAdmin;