import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const RiwayatAdmin = () => {
  const [riwayatHarian, setRiwayatHarian] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const res = await apiService.getRiwayatHarianAdmin();
        if (res && res.data) {
          setRiwayatHarian(res.data);
        }
      } catch (err) {
        console.error("Gagal menarik riwayat harian:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRiwayat();
  }, []);

  if (isLoading) {
    return <div className="text-center p-10 font-bold text-[#00206B] animate-pulse">Menghubungkan ke Live Feed Server... ⏳</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Pantauan Harian</h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">Live feed status laporan operasional pengemudi per hari.</p>
      </div>

      {riwayatHarian.length > 0 ? (
        riwayatHarian.map((grup, idx) => (
          <div key={idx} className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="text-sm font-black text-slate-700 border-b-2 border-slate-100 pb-3 mb-4 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-5 h-5 text-[#00206B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              TANGGAL: {grup.tanggal}
            </h3>
            <div className="space-y-3">
              {grup.laporan?.map((lap, i) => {
                // Cek status kedisiplinan dan apakah sudah sampai CP akhir
                const sesiAkhir = lap.trip_sessions?.[lap.trip_sessions.length - 1];
                const isSelesai = sesiAkhir?.jam_tiba_kantor !== null && sesiAkhir?.jam_tiba_kantor !== undefined;
                const statusWaktu = sesiAkhir?.status_waktu || "BELUM ADA";
                const namaSupir = lap.users?.nama || lap.nama_supir || lap.id_supir || "PENGEMUDI";

                return (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors group cursor-pointer" title="Lihat detail di menu Rekap">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00206B] to-blue-500 text-white flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0">
                        {(namaSupir || "?").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#00206B] uppercase">{namaSupir}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5 tracking-wider">TRAYEK {lap.trayek} • {lap.bus}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1.5">
                      {isSelesai ? (
                        <span className="bg-[#E6F7ED] text-[#137333] border border-[#BCECD2] text-[9px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-wider">SELESAI DIREKAM</span>
                      ) : (
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> SEDANG BERJALAN
                        </span>
                      )}
                      {statusWaktu === "TERLAMBAT" && (
                        <span className="text-[9px] font-black text-rose-500 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-rose-500"></span> TERLAMBAT
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-16 bg-white border-2 border-slate-200 rounded-2xl">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-sm font-black text-slate-400 uppercase tracking-widest">BELUM ADA PANTAUAN HARIAN</span>
        </div>
      )}
    </div>
  );
};

export default RiwayatAdmin;