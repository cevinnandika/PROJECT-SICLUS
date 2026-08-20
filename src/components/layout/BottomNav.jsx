import React from 'react';

const BottomNav = ({ activeTab, setActiveTab, user = null }) => {
  const allNavItems = [
    {
      id: 'beranda',
      label: 'Beranda',
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> </svg>
    },
    {
      id: 'laporan',
      label: 'Laporan',
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /> </svg>
    },
    {
      id: 'riwayat',
      label: 'Riwayat',
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
    },
    {
      id: 'rekap',
      label: 'Rekap',
      adminOnly: true,
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
    },
    {
      id: 'kelolauser',
      label: 'Kelola User',
      adminOnly: true,
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    },
    {
      id: 'akun',
      label: 'Akun',
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    }
  ];

  // Filter menu berdasarkan role
  const navItems = allNavItems.filter(item => !item.adminOnly || user?.role?.toLowerCase() === 'admin');

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 shadow-lg">
      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto scrollbar-hide px-2 py-3 gap-1">
        {navItems.map((item) => {
          const isReportTabActive = item.id === 'laporan' && (activeTab === 'persiapan' || activeTab === 'inspeksi' || activeTab === 'kendala' || activeTab === 'laporan');
          const isRiwayatTabActive = item.id === 'riwayat' && (activeTab === 'ringkasan' || activeTab === 'riwayat');
          const isActive = activeTab === item.id || isReportTabActive || isRiwayatTabActive;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'laporan') setActiveTab('persiapan');
                else if (item.id === 'riwayat') setActiveTab('ringkasan');
                else setActiveTab(item.id);
              }}
              className={`flex flex-col items-center justify-center min-w-[80px] px-4 py-2 rounded-2xl transition-all duration-200 flex-shrink-0 ${
                isActive 
                  ? 'bg-[#66FFAA]/40 text-[#006633] shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="mb-1">
                {item.icon}
              </div>
              <span className={`text-[11px] font-bold whitespace-nowrap ${isActive ? 'font-extrabold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;