import React, { useState, useEffect } from "react";
import { apiService } from "../../services/api";

const Rekap = ({ trips = [], inspections = [] }) => {
  // inistate
  const [isLoading, setIsLoading] = useState(false);
  const [dataLaporan, setDataLaporan] = useState([]);

  // inifetch
  useEffect(() => {
    const fetchRekapBackend = async () => {
      setIsLoading(true);
      try {
        // Hapus komentar ini jika endpoint getRekapLaporan sudah tersedia di api.js lu
        // const response = await apiService.getRekapLaporan();
        // setDataLaporan(response.data);
      } catch (error) {
        console.error("Gagal mengambil data rekap dari server:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRekapBackend();
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-6">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Data Rekapitulasi</h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">Pantau dan unduh semua laporan pengemudi</p>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-sm">
        {isLoading ? (
          <div className="text-center text-[#00206B] font-bold py-10 animate-pulse">Mengambil data dari server...</div>
        ) : dataLaporan.length === 0 && trips.length === 0 ? (
          <div className="text-center text-slate-400 font-medium py-10">Belum ada data rekapitulasi perjalanan untuk saat ini.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 px-4 text-xs font-extrabold text-slate-500 uppercase">Tanggal</th>
                  <th className="py-3 px-4 text-xs font-extrabold text-slate-500 uppercase">Shift</th>
                  <th className="py-3 px-4 text-xs font-extrabold text-slate-500 uppercase">Total Siswa</th>
                  <th className="py-3 px-4 text-xs font-extrabold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* inirender dari props jika API belum dicolok sepenuhnya */}
                {trips.map((trip, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm font-bold text-[#00206B]">Hari ini</td>
                    <td className="py-3 px-4 text-sm font-bold text-slate-600 uppercase">{trip.tipe_sesi || "-"}</td>
                    <td className="py-3 px-4 text-sm font-bold text-slate-600">{trip.jumlah_penumpang || 0} Orang</td>
                    <td className="py-3 px-4">
                      <span className="bg-[#E6F7ED] text-[#137333] font-bold text-xs px-2 py-1 rounded">Selesai</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rekap;
