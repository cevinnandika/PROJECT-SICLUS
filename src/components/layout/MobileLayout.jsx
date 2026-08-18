import React from 'react';

const MobileLayout = ({ children, title = 'SICLUS', onBack = null }) => {
  return (
    <div className="mx-auto my-0 min-h-screen w-full max-w-[480px] bg-[#F5F7FB] text-slate-800 flex flex-col relative shadow-2xl overflow-x-hidden border-x border-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-4 border-b border-slate-100">
        
        {/* Sisi Kiri: Tombol Back (Hanya muncul jika props onBack dikirim) */}
        <div className="w-8 flex items-center justify-start">
          {onBack && (
            <button 
              onClick={onBack} 
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors duration-200 text-slate-600"
              aria-label="Kembali"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Sisi Tengah: Judul App / Halaman (Presisi Center) */}
        <div className="text-center flex-1">
          <span className="text-lg font-black tracking-wider text-[#00206B] block">
            {title}
          </span>
        </div>

        {/* Sisi Kanan: Penyeimbang Space (Kosong agar Judul tetap di tengah) */}
        <div className="w-8"></div>

      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-24 overflow-y-auto px-5 py-5">
        {children}
      </main>
    </div>
  );
};

export default MobileLayout;