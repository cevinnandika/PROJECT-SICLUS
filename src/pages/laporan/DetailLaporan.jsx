import React from 'react';

const DetailLaporan = ({ report, onBack }) => {
  // Hitung persentase kelengkapan data
  const calculateCompleteness = () => {
    let total = 0;
    let filled = 0;
    
    if (report.morning) {
      total += 5;
      if (report.morning.start) filled++;
      if (report.morning.odometerStart) filled++;
      if (report.morning.departure) filled++;
      if (report.morning.arrival) filled++;
      if (report.morning.passengers) filled++;
    }
    
    if (report.afternoon) {
      total += 5;
      if (report.afternoon.start) filled++;
      if (report.afternoon.odometerStart) filled++;
      if (report.afternoon.departure) filled++;
      if (report.afternoon.arrival) filled++;
      if (report.afternoon.passengers) filled++;
    }
    
    return total > 0 ? Math.round((filled / total) * 100) : 0;
  };

  const completeness = calculateCompleteness();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-[#00206B] hover:underline">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Riwayat
      </button>

      {/* Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-[#00206B] uppercase">Kelengkapan Data</h3>
          <span className="text-2xl font-black text-[#00206B]">{completeness}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              completeness >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
              completeness >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
              'bg-gradient-to-r from-red-500 to-pink-500'
            }`}
            style={{ width: `${completeness}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {completeness >= 80 ? '✅ Data hampir lengkap' : completeness >= 50 ? '⚠️ Data belum lengkap' : '❌ Data sangat kurang'}
        </p>
      </div>

      {/* Detail Laporan */}
      <div className="bg-white border-2 border-slate-300 rounded-xl p-8 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-xl font-black text-slate-800 uppercase">LAPORAN HARIAN ANGKUTAN SEKOLAH GRATIS KOTA MOJOKERTO</h2>
          <p className="text-sm font-bold text-slate-600">TAHUN 2026</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div><span className="font-bold">HARI / TANGGAL</span><p className="text-slate-700 mt-1">{report.date || '-'}</p></div>
          <div><span className="font-bold">TRAYEK / NOPOL</span><p className="text-slate-700 mt-1">{report.trayek || '-'} / {report.bus || '-'}</p></div>
        </div>

        <table className="w-full border-collapse border-2 border-slate-400 text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-2 border-slate-400 p-2" rowSpan="2">No.</th>
              <th className="border-2 border-slate-400 p-2" rowSpan="2">URAIAN</th>
              <th className="border-2 border-slate-400 p-2" colSpan="2">PELAYANAN</th>
            </tr>
            <tr className="bg-slate-100">
              <th className="border-2 border-slate-400 p-2">PAGI / BERANGKAT SEKOLAH</th>
              <th className="border-2 border-slate-400 p-2">SIANG / PULANG SEKOLAH</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border-2 border-slate-400 p-2 text-center">1</td><td className="border-2 border-slate-400 p-2">Nama Pengemudi</td><td className="border-2 border-slate-400 p-2" colSpan="2">{report.driverName || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">2</td><td className="border-2 border-slate-400 p-2">Km speedometer pada saat berangkat dari kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerStart || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerStart || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">3</td><td className="border-2 border-slate-400 p-2">Jam berangkat dari kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.start || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.start || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center" rowSpan="9">4</td><td className="border-2 border-slate-400 p-2 font-bold" colSpan="3">Kondisi kendaraan sebelum berangkat</td></tr>
            {['Rem', 'AC', 'Lampu', 'Klakson', 'Wiper kaca', 'Lampu rem/seint', 'Bell Penumpang depan dan belakang', 'Pintu bus depan dan belakang', 'Kebersihan'].map((item, idx) => (
              <tr key={idx}><td className="border-2 border-slate-400 p-2">{String.fromCharCode(97 + idx)}. {item}</td><td className="border-2 border-slate-400 p-2 text-center"><span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded font-bold text-xs">OK</span><span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded font-bold text-xs ml-2">KURANG</span></td><td className="border-2 border-slate-400 p-2 text-center" rowSpan="8"></td></tr>
            ))}
            <tr><td className="border-2 border-slate-400 p-2 font-bold" colSpan="3">Kondisi kendaraan sesudah berangkat</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">5</td><td className="border-2 border-slate-400 p-2">Jam berangkat dari titik awal trayek/start</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.departure || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.departure || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">6</td><td className="border-2 border-slate-400 p-2">Km speedometer pada saat berangkat dari titik awal trayek/start</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerDeparture || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerDeparture || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">7</td><td className="border-2 border-slate-400 p-2">Jam datang di titik akhir trayek/finish</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.arrival || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.arrival || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">8</td><td className="border-2 border-slate-400 p-2">Km speedometer bus pada saat datang di titik akhir trayek/finish</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerArrival || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerArrival || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">9</td><td className="border-2 border-slate-400 p-2">Jumlah penumpang/pelajar yang diangkut</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.passengers || '-'} Orang</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.passengers || '-'} Orang</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">10</td><td className="border-2 border-slate-400 p-2">Jam datang di kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.returnTime || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.returnTime || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">11</td><td className="border-2 border-slate-400 p-2">Km speedometer pada saat datang di kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerReturn || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerReturn || '-'}</td></tr>
          </tbody>
        </table>

        <div className="mt-8 text-center">
          <div className="inline-block text-center">
            <p className="font-bold mb-16">PENGEMUDI</p>
            <div className="border-t-2 border-slate-800 pt-2 w-48"><p className="font-bold text-sm">{report.driverName || '________________'}</p></div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs">
          <p className="font-bold">Catatan:</p>
          <p>Jika uraian kondisi kendaraan sebelum berangkat ada yang kurang, maka harus/wajib menghubungi/melaporkan kepada Seksi Angkutan, Bidang Angkutan Jalan.</p>
        </div>
      </div>
    </div>
  );
};

export default DetailLaporan;