export const dummyDrivers = [
  { id: 'D001', name: 'Pak Budi', phone: '0812-3456-7890', status: 'Aktif', vehicleId: 'B-1234-TJS' },
  { id: 'D002', name: 'Pak Joko', phone: '0813-9876-5432', status: 'Sedang Tugas', vehicleId: 'B-5678-WQA' },
  { id: 'D003', name: 'Bu Ani', phone: '0815-1122-3344', status: 'Libur', vehicleId: 'B-9012-KLP' },
];

export const dummyVehicles = [
  { id: 'V001', plateNumber: 'B-1234-TJS', type: 'Bus TransJakarta', capacity: 50, condition: 'Baik' },
  { id: 'V002', plateNumber: 'B-5678-WQA', type: 'Microtrans (Angkot)', capacity: 15, condition: 'Baik' },
  { id: 'V003', plateNumber: 'B-9012-KLP', type: 'Medium Bus', capacity: 30, condition: 'Butuh Perbaikan' },
];

export const dummyInspections = [
  { id: 'I001', driverId: 'D001', vehicleId: 'V001', date: '2026-08-18', time: '08:00', status: 'Selesai', notes: 'Semua aman' },
  { id: 'I002', driverId: 'D002', vehicleId: 'V002', date: '2026-08-18', time: '09:30', status: 'Tertunda', notes: 'Pengecekan rem' },
];

export const dummyTrips = [
  { id: 'T001', driverName: 'Pak Budi', route: 'Rute 1A (Balai Kota - PIK)', passengers: 42, startTime: '07:15', status: 'Dalam Perjalanan' },
  { id: 'T002', driverName: 'Pak Joko', route: 'Rute 2B (Kuningan - Senayan)', passengers: 12, startTime: '08:45', status: 'Terjadwal' },
];
