import React, { useRef, useState, useEffect } from 'react';

const BottomNav = ({ activeTab, setActiveTab, user = null }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const allNavItems = [
    {
      id: 'beranda',
      label: 'Beranda',
      icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> </svg>
    },
    {
      id: 'laporan',
      label: 'Laporan',
      icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /> </svg>
    },
    {
      id: 'riwayat',
      label: 'Riwayat',
      icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
    },
    {
      id: 'rekap',
      label: 'Rekap',
      adminOnly: true,
      icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
    },
    {
      id: 'akun',
      label: 'Akun',
      icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    }
  ];

  const navItems = allNavItems.filter(item => !item.adminOnly || user?.role?.toLowerCase() === 'admin');
  const needScroll = navItems.length > 3;

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 5);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };

    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScroll);
      checkScroll();
    }

    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', checkScroll);
      }
    };
  }, [navItems]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 120;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMenuClick = (item) => {
    if (item.id === 'laporan') setActiveTab('persiapan');
    else if (item.id === 'riwayat') setActiveTab('ringkasan');
    else setActiveTab(item.id);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 shadow-lg">
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/60 transition-all border border-white/30 shadow-sm"
          >
            <svg className="w-3.5 h-3.5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Scroll Container - 3 menu visible */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide px-3 py-3 gap-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {navItems.map((item) => {
            const isReportTabActive = item.id === 'laporan' && (activeTab === 'persiapan' || activeTab === 'inspeksi' || activeTab === 'kendala' || activeTab === 'laporan');
            const isRiwayatTabActive = item.id === 'riwayat' && (activeTab === 'ringkasan' || activeTab === 'riwayat');
            const isActive = activeTab === item.id || isReportTabActive || isRiwayatTabActive;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`flex flex-col items-center justify-center flex-[0_0_calc((100%-16px)/3)] px-3 py-2.5 rounded-2xl transition-all duration-200 scroll-snap-align-start ${
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

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/60 transition-all border border-white/30 shadow-sm"
          >
            <svg className="w-3.5 h-3.5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
};

export default BottomNav;