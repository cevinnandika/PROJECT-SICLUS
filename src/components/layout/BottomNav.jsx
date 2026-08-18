import React from 'react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    {
      id: 'beranda',
      label: 'Beranda',
      icon: (
        <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'laporan', // maps to Persiapan / Inspeksi / Kendala
      label: 'Laporan',
      icon: (
        <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      id: 'riwayat', // maps to RingkasanHarian
      label: 'Riwayat',
      icon: (
        <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'notifikasi',
      label: 'Notifikasi',
      icon: (
        <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
    {
      id: 'akun',
      label: 'Akun',
      icon: (
        <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around z-50">
      {navItems.map((item) => {
        // Map reporting flows to the 'laporan' tab
        const isReportTabActive = item.id === 'laporan' && 
          (activeTab === 'persiapan' || activeTab === 'inspeksi' || activeTab === 'kendala' || activeTab === 'laporan');
        
        // Map history to the 'riwayat' tab
        const isRiwayatTabActive = item.id === 'riwayat' && 
          (activeTab === 'ringkasan' || activeTab === 'riwayat');

        const isActive = activeTab === item.id || isReportTabActive || isRiwayatTabActive;

        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === 'laporan') {
                setActiveTab('persiapan');
              } else if (item.id === 'riwayat') {
                setActiveTab('ringkasan');
              } else {
                setActiveTab(item.id);
              }
            }}
            className="flex flex-col items-center justify-center min-w-[64px] transition-all duration-200"
          >
            {isActive ? (
              // Green background pill active tab design matching the screenshots
              <div className="flex flex-col items-center justify-center px-4 py-1 rounded-2xl bg-[#66FFAA]/40 text-[#006633]">
                {item.icon}
                <span className="text-[10px] font-bold mt-0.5">{item.label}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-800">
                {item.icon}
                <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
              </div>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
