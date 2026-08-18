import { dummyDrivers, dummyVehicles, dummyInspections, dummyTrips } from '../utils/dummyData';

const BASE_URL = 'http://localhost:8000/api'; // Ganti dengan URL FastAPI nanti

// Simulasi delay panggillan API
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  // Authentication
  login: async (username, password) => {
    await delay(800);
    if (username === 'dishub' && password === 'dishub123') {
      return { 
        success: true, 
        token: 'mock-jwt-token-12345', 
        user: { name: 'Petugas Dishub', role: 'Inspector' } 
      };
    }
    throw new Error('Username atau password salah');
  },

  // Drivers & Vehicles
  getDrivers: async () => {
    await delay(500);
    return dummyDrivers;
  },

  getVehicles: async () => {
    await delay(500);
    return dummyVehicles;
  },

  // Inspections / Laporan
  submitInspection: async (data) => {
    await delay(1000);
    console.log('Mengirim data inspeksi ke FastAPI:', data);
    return { success: true, data };
  },

  // Trip Start
  startTrip: async (data) => {
    await delay(1000);
    console.log('Mengirim data mulai perjalanan ke FastAPI:', data);
    return { success: true, data };
  }
};
