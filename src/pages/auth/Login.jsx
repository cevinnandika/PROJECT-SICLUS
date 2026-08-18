import React, { useState } from 'react';
import { apiService } from '../../services/api';

const Login = ({ onLoginSuccess }) => {
  const [driverId, setDriverId] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate login via apiService
      // Using standard login with credentials 'dishub' and 'dishub123'
      // Or if the user types a specific ID/PIN, we can mock accept it for a realistic demo
      const username = driverId || 'dishub';
      const password = pin || 'dishub123';
      const response = await apiService.login(username, password);
      if (response.success) {
        onLoginSuccess({
          name: driverId === 'D001' || driverId === 'dishub' ? 'Pak Budi' : 'Driver-' + driverId,
          role: 'Pengemudi',
          id: driverId
        });
      }
    } catch (err) {
      // For ease of demo, if they input anything, let them login
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
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-[82vh] bg-white rounded-3xl p-6 shadow-sm border border-slate-100 max-w-[420px] mx-auto">
      {/* Branding Section */}
      <div className="flex flex-col items-center text-center mt-6">
        {/* Blue Circle Bus Icon */}
        <div className="w-24 h-24 rounded-full bg-[#113B8c] flex items-center justify-center shadow-md mb-6">
          <svg className="w-12 h-12 text-[#99CCFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <rect x="4" y="3" width="16" height="15" rx="3" />
            <line x1="4" y1="13" x2="20" y2="13" />
            <circle cx="8" cy="9" r="1.5" fill="currentColor" />
            <circle cx="16" cy="9" r="1.5" fill="currentColor" />
            <path d="M6 18v1.5a0.5 0 000.5 0.5h1a0.5 0 000.5-0.5V18H6zM16 18v1.5a0.5 0 000.5 0.5h1a0.5 0 000.5-0.5V18h-2z" fill="currentColor" />
          </svg>
        </div>

        <h2 className="text-3xl font-extrabold text-[#00206B] tracking-tight m-0 uppercase">
          SICLUS
        </h2>
        <p className="text-[11px] font-bold text-slate-500 mt-2 tracking-widest leading-relaxed uppercase max-w-[200px]">
          SISTEM INSPEKSI & CATATAN LAPORAN SOPIR
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium text-center">
            {error}
          </div>
        )}

        {/* ID Pengemudi Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-[#00206B]">
            <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="11" r="2.5" />
              <path d="M15 9h3M15 13h3M15 17h3" />
            </svg>
            ID Pengemudi
          </label>
          <input
            type="text"
            required
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3.5 text-sm text-[#00206B] focus:outline-none transition-all placeholder-slate-400 font-medium"
            placeholder="Masukkan ID Pengemudi"
          />
        </div>

        {/* PIN / Password Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-[#00206B]">
            <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="6" cy="6" r="1.5" fill="currentColor" />
              <circle cx="12" cy="6" r="1.5" fill="currentColor" />
              <circle cx="18" cy="6" r="1.5" fill="currentColor" />
              <circle cx="6" cy="12" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="18" cy="12" r="1.5" fill="currentColor" />
              <circle cx="6" cy="18" r="1.5" fill="currentColor" />
              <circle cx="12" cy="18" r="1.5" fill="currentColor" />
              <circle cx="18" cy="18" r="1.5" fill="currentColor" />
            </svg>
            PIN / Password
          </label>
          <div className="relative">
            <input
              type={showPin ? 'text' : 'password'}
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3.5 text-sm text-[#00206B] focus:outline-none transition-all placeholder-slate-400 font-medium pr-12"
              placeholder="Masukkan PIN 6 Angka"
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
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
          className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer text-sm"
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              MASUK
            </>
          )}
        </button>
      </form>

      {/* Footer Section */}
      <div className="flex items-center justify-center gap-1.5 text-slate-500 mt-8 pt-4 border-t border-slate-100">
        <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span className="text-[11px] font-semibold text-slate-500 tracking-tight">
          Sistem Internal - Hanya untuk petugas terdaftar
        </span>
      </div>
    </div>
  );
};

export default Login;
