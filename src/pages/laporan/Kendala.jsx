import React, { useState } from 'react';

const Kendala = ({ data, onSubmit }) => {
  const [desc, setDesc] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...data,
      status: 'Keberangkatan Ditahan (Rem Bermasalah)',
      kendala: {
        itemTerpengaruh: ['Rem Utama'],
        deskripsi: desc,
        keparahan: 'Kritis',
        photoTaken
      }
    });
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#FCE8E6] border border-[#FAD2CF] rounded-2xl p-6 space-y-4 shadow-sm text-[#C5221F]">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="space-y-1">
                <h3 className="text-lg font-black tracking-wide uppercase m-0">PERINGATAN KESELAMATAN</h3>
                <p className="text-sm text-[#A81F1C] font-semibold leading-relaxed m-0">
                  Kendala Rem wajib dilaporkan.
                </p>
              </div>
            </div>
            <div className="bg-[#C5221F] text-white font-extrabold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm uppercase tracking-wide">
              <span></span>
              <span>KEBERANGKATAN DITAHAN</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm font-black text-[#00206B]">Item: Rem</span>
                <span className="bg-[#C5221F] text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  KURANG
                </span>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-500 uppercase tracking-wide">
                  Deskripsi Kendala
                </label>
                <textarea
                  required
                  rows={4}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#C5221F] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all placeholder-slate-400 resize-none leading-relaxed"
                  placeholder="Jelaskan kendala rem secara rinci..."
                />
              </div>
              <button
                type="button"
                onClick={() => setPhotoTaken(true)}
                className={`w-full py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-dashed transition-all text-sm cursor-pointer ${
                  photoTaken 
                    ? 'bg-[#E6F7ED] border-[#BCECD2] text-[#137333]' 
                    : 'bg-slate-50/50 border-slate-300 hover:bg-slate-50 text-[#00206B]'
                }`}
              >
                {photoTaken ? (
                  <>
                    <span>📷</span>
                    <span>Foto Terlampir</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">📷</span>
                    <span>FOTO KONDISI KENDARAAN</span>
                  </>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-[#C5221F] hover:bg-[#A81F1C] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              LAPORKAN KENDALA
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h4 className="text-sm font-extrabold text-[#00206B] mb-3">Info Kendala</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="font-semibold">Keparahan</span>
                <span className="text-[#C5221F] font-bold">Kritis</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status</span>
                <span className="text-slate-400">Belum Dilaporkan</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Waktu</span>
                <span className="text-slate-400">06:05 WIB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kendala;