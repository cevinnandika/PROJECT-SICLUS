// src/utils/usersData.js

export const dummyUsers = [
  // Admin
  {
    id: 'ADM001',
    name: 'Admin SICLUS',
    email: 'admin@siclus.id',
    password: 'admin123',
    role: 'admin',
    phone: '081234567890'
  },
  // Supir 1
  {
    id: 'SUP001',
    name: 'Pak Budi',
    email: 'budi@siclus.id',
    password: 'budi123',
    role: 'pengemudi',
    phone: '081234567891',
    trayek: 'Trayek A',
    bus: 'Bus 07 (S 1772 SP)'
  },
  // Supir 2
  {
    id: 'SUP002',
    name: 'Pak Joko',
    email: 'joko@siclus.id',
    password: 'joko123',
    role: 'pengemudi',
    phone: '081234567892',
    trayek: 'Trayek B',
    bus: 'Bus 03 (S 1773 SP)'
  },
  // Supir 3
  {
    id: 'SUP003',
    name: 'Pak Ahmad',
    email: 'ahmad@siclus.id',
    password: 'ahmad123',
    role: 'pengemudi',
    phone: '081234567893',
    trayek: 'Trayek C',
    bus: 'Bus 05 (S 1774 SP)'
  }
];

// Dummy trips data untuk rekap
export const dummyTrips = [
  {
    id: 'TRP001',
    driverId: 'SUP001',
    driverName: 'Pak Budi',
    trayek: 'Trayek A',
    bus: 'Bus 07',
    date: '2023-10-24',
    morning: {
      start: '05:30',
      end: '07:15',
      passengers: 42,
      odometerStart: 45200,
      odometerEnd: 45230
    },
    afternoon: {
      start: '12:00',
      end: '14:00',
      passengers: 38,
      odometerStart: 45230,
      odometerEnd: 45260
    },
    status: 'completed'
  },
  {
    id: 'TRP002',
    driverId: 'SUP002',
    driverName: 'Pak Joko',
    trayek: 'Trayek B',
    bus: 'Bus 03',
    date: '2023-10-24',
    morning: {
      start: '05:45',
      end: '07:30',
      passengers: 35,
      odometerStart: 32100,
      odometerEnd: 32140
    },
    afternoon: null,
    status: 'partial'
  },
  {
    id: 'TRP003',
    driverId: 'SUP003',
    driverName: 'Pak Ahmad',
    trayek: 'Trayek C',
    bus: 'Bus 05',
    date: '2023-10-24',
    morning: {
      start: '06:00',
      end: '08:00',
      passengers: 40,
      odometerStart: 28500,
      odometerEnd: 28545
    },
    afternoon: {
      start: '12:30',
      end: '14:30',
      passengers: 37,
      odometerStart: 28545,
      odometerEnd: 28590
    },
    status: 'completed'
  }
];