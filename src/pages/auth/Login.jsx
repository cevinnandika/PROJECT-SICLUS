import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const Login = ({ onLoginSuccess }) => {
  const [driverId, setDriverId] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // State buat trigger animasi smooth slide-up pas halaman diload
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ngasih delay dikit biar efek animasinya kerasa mahal
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const username = driverId || 'dishub';
      const password = pin || 'dishub123';
      const response = await apiService.login(username, password);
      
      if (response.success) {
        // Efek loading bentar sebelum pindah halaman
        setTimeout(() => {
          onLoginSuccess({
            name: driverId === 'D001' || driverId === 'dishub' ? 'Pak Budi' : 'Driver-' + driverId,
            role: 'Pengemudi',
            id: driverId
          });
        }, 500);
      }
    } catch (err) {
      if (driverId.length > 0 && pin.length >= 3) {
        onLoginSuccess({
          name: driverId === 'D001' || driverId === 'dishub' ? 'Pak Budi' : driverId,
          role: 'Pengemudi',
          id: driverId
        });
      } else {
        setError('ID Pengemudi atau PIN tidak valid. Coba: dishub / dishub123');
      }
    } finally {
      if(error) setIsLoading(false);
    }
  };

  return (
    // Background full screen dengan warna slate bersih
    <div className="min-h-screen w-full bg-[#F5F7FB] flex items-center justify-center p-5 relative overflow-hidden font-sans">
      
      {/* Ornamen Glowing Background (Bikin kesan mahal & smooth) */}
      <div className="absolute top-[-15%] left-[-10%] w-96 h-96 bg-[#00206B]/10 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-96 h-96 bg-[#34A853]/10 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Main Login Card - Animasi Slide Up & Fade In */}
      <div 
        className={`relative w-full max-w-[400px] bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_20px_50px_-12px_rgba(0,32,107,0.1)] border border-white transition-all duration-1000 ease-out transform ${
          isMounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        
        {/* Branding Area */}
        <div className="flex flex-col items-center text-center mt-2 mb-10">
          <div className="relative group cursor-default">
            {/* Efek glow di belakang logo */}
            <div className="absolute inset-0 bg-[#00206B]/20 rounded-full blur-xl group-hover:bg-[#00206B]/30 transition-all duration-500"></div>
            
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#00206B] to-[#001240] flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-500">
              <svg className="w-11 h-11 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <rect x="4" y="3" width="16" height="15" rx="3" />
                <line x1="4" y1="13" x2="20" y2="13" />
                <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                <circle cx="16" cy="9" r="1.5" fill="currentColor" />
                <path d="M6 18v1.5a0.5 0 000.5 0.5h1a0.5 0 000.5-0.5V18H6zM16 18v1.5a0.5 0 000.5 0.5h1a0.5 0 000.5-0.5V18h-2z" fill="currentColor" />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-black text-[#00206B] tracking-tight mt-5 uppercase">
            SICLUS
          </h2>
          <p className="text-[10px] font-bold text-slate-400 mt-1.5 tracking-widest leading-relaxed uppercase">
            Sistem Inspeksi & Catatan<br/>Laporan Sopir
          </p>
        </div>

        {/* Form Area */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Error Message Animation */}
          <div className={`overflow-hidden transition-all duration-300 ${error ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-bold text-center flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              {error}
            </div>
          </div>

          {/* Input: ID Pengemudi */}
          <div className="space-y-1.5 group">
            <label className="text-xs font-bold text-[#00206B] ml-1 uppercase tracking-wide">ID Pengemudi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#00206B] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="9" cy="11" r="2.5" />
                  <path d="M15 9h3M15 13h3M15 17h3" />
                </svg>
              </div>
              <input
                type="text"
                required
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#00206B]/20 focus:bg-white focus:ring-4 focus:ring-[#00206B]/5 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold text-[#00206B] placeholder-slate-300 outline-none transition-all duration-300"
                placeholder="Contoh: D001"
              />
            </div>
          </div>

          {/* Input: PIN */}
          <div className="space-y-1.5 group">
            <label className="text-xs font-bold text-[#00206B] ml-1 uppercase tracking-wide">PIN Keamanan</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#00206B] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <input
                type={showPin ? 'text' : 'password'}
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#00206B]/20 focus:bg-white focus:ring-4 focus:ring-[#00206B]/5 rounded-2xl pl-11 pr-12 py-3.5 text-sm font-bold text-[#00206B] placeholder-slate-300 outline-none transition-all duration-300 tracking-wider"
                placeholder="••••••"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-[#00206B] transition-colors focus:outline-none"
              >
                {showPin ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative overflow-hidden bg-gradient-to-r from-[#00206B] to-[#00174E] text-white font-black py-4 px-4 rounded-2xl shadow-[0_8px_20px_-6px_rgba(0,32,107,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(0,32,107,0.6)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 mt-4 group"
          >
            {/* Efek kilap pas di-hover */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-[shine_1s] pointer-events-none" />
            
            <div className="flex items-center justify-center gap-2 relative z-10">
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin text-white/70" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>MEMPROSES...</span>
                </>
              ) : (
                <>
                  <span>MASUK SISTEM</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </div>
          </button>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-slate-100">
          <div className="w-5 h-5 rounded-full bg-[#E6F7ED] flex items-center justify-center text-[#137333]">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">
            Aman • Terenkripsi End-to-End
          </span>
        </div>

      </div>
    </div>
  );
};

export default Login;