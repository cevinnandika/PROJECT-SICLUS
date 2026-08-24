import React, { useState } from 'react';
import { dummyUsers, dummyTrips } from '../utils/usersData';

const Rekap = () => {
  const [activeTab, setActiveTab] = useState('drivers');
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Gabungkan dummy users dengan yang di localStorage
  const allUsers = [...dummyUsers];
  const localUsers = JSON.parse(localStorage.getItem('siclus_users') || '[]');
  const drivers = [...allUsers, ...localUsers].filter(u => u.role !== 'admin');
  const admins = [...allUsers, ...localUsers].filter(u => u.role === 'admin');

  const allTrips = [...dummyTrips];

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto pb-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">
          Rekapitulasi Data
        </h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">
          Pantau performa seluruh pengemudi angkutan sekolah
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block">Total Supir</span>
              <span className="text-2xl font-black text-[#00206B] block mt-1">{drivers.length}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#00206B]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block">Total Perjalanan</span>
              <span className="text-2xl font-black text-[#00206B] block mt-1">{allTrips.length}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block">Total Penumpang</span>
              <span className="text-2xl font-black text-[#00206B] block mt-1">
                {allTrips.reduce((sum, t) => sum + (t.morning?.passengers || 0) + (t.afternoon?.passengers || 0), 0)}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block">Selesai Hari Ini</span>
              <span className="text-2xl font-black text-green-600 block mt-1">
                {allTrips.filter(t => t.status === 'completed').length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white border border-slate-100 rounded-xl p-1.5 shadow-sm">
        <button
          onClick={() => { setActiveTab('drivers'); setSelectedDriver(null); }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'drivers' ? 'bg-[#00206B] text-white' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Daftar Supir
        </button>
        <button
          onClick={() => setActiveTab('trips')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'trips' ? 'bg-[#00206B] text-white' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Riwayat Perjalanan
        </button>
        <button
          onClick={() => setActiveTab('admins')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'admins' ? 'bg-[#00206B] text-white' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Admin
        </button>
      </div>

      {/* Content */}
      {activeTab === 'drivers' && !selectedDriver && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drivers.map((driver) => {
            const driverTrips = allTrips.filter(t => t.driverId === driver.id);
            const totalPassengers = driverTrips.reduce((sum, t) => sum + (t.morning?.passengers || 0) + (t.afternoon?.passengers || 0), 0);
            
            return (
              <div
                key={driver.id}
                onClick={() => setSelectedDriver(driver)}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                    {driver.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-extrabold text-[#00206B] truncate">{driver.name}</h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{driver.id}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">{driver.trayek || 'Belum ditugaskan'}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">Perjalanan</span>
                    <span className="text-sm font-black text-[#00206B]">{driverTrips.length}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">Penumpang</span>
                    <span className="text-sm font-black text-[#00206B]">{totalPassengers}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Driver Detail */}
      {activeTab === 'drivers' && selectedDriver && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedDriver(null)}
            className="flex items-center gap-2 text-sm font-bold text-[#00206B] hover:underline cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Daftar
          </button>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-2xl">
                {selectedDriver.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-black text-[#00206B]">{selectedDriver.name}</h3>
                <p className="text-sm text-slate-400 font-semibold">{selectedDriver.id} • {selectedDriver.role}</p>
                <p className="text-xs text-slate-500 mt-1">{selectedDriver.email}</p>
              </div>
            </div>

            <h4 className="text-sm font-extrabold text-[#00206B] mb-3 uppercase tracking-wide">Riwayat Perjalanan</h4>
            <div className="space-y-3">
              {allTrips.filter(t => t.driverId === selectedDriver.id).map((trip) => (
                <div key={trip.id} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-[#00206B]">{trip.trayek} • {trip.bus}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      trip.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {trip.status === 'completed' ? 'SELESAI' : 'PARTIAL'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Pagi</span>
                      <span className="font-bold text-[#00206B]">{trip.morning?.start || '-'} - {trip.morning?.end || '-'}</span>
                      <span className="text-slate-500 block">{trip.morning?.passengers || 0} penumpang</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Siang</span>
                      <span className="font-bold text-[#00206B]">{trip.afternoon?.start || '-'} - {trip.afternoon?.end || '-'}</span>
                      <span className="text-slate-500 block">{trip.afternoon?.passengers || 0} penumpang</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trips' && (
        <div className="space-y-3">
          {allTrips.map((trip) => (
            <div key={trip.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-[#00206B]">{trip.driverName}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{trip.trayek} • {trip.bus} • {trip.date}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                  trip.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {trip.status === 'completed' ? 'SELESAI' : 'PARTIAL'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3">
                  <span className="text-xs font-bold text-slate-400 block mb-1">PERJALANAN PAGI</span>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-700">{trip.morning?.start || '-'} → {trip.morning?.end || '-'}</span>
                    <span className="font-black text-[#00206B]">{trip.morning?.passengers || 0} org</span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <span className="text-xs font-bold text-slate-400 block mb-1">PERJALANAN SIANG</span>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-700">{trip.afternoon?.start || '-'} → {trip.afternoon?.end || '-'}</span>
                    <span className="font-black text-[#00206B]">{trip.afternoon?.passengers || 0} org</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'admins' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {admins.map((admin) => (
            <div key={admin.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-lg">
                  {admin.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#00206B]">{admin.name}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{admin.id}</p>
                  <p className="text-xs text-slate-500 mt-1">{admin.email}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">
                  ADMIN
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rekap;