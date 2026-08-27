import axios from "axios";

// 1. NGAMBIL URL DARI FILE .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// 2. BIKIN MESIN AXIOS
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420", // RESEP AGAR ANTI-BLOKIR NGROK
  },
});

// 3. SATPAM TOKEN (INTERCEPTOR)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("siclus_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 4. DAFTAR COLOKAN API
export const apiService = {
  login: async (email, password) => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },

  // ZONA DRIVER
  getJadwalDriver: async () => {
    const response = await apiClient.get("/driver/jadwal");
    return response.data;
  },
  getProfilDriver: async () => {
    const response = await apiClient.get("/driver/profil");
    return response.data;
  },
  getRiwayatDriver: async () => {
    const response = await apiClient.get("/driver/riwayat");
    return response.data;
  },
  updateFotoProfil: async (formData) => {
    const response = await apiClient.put("/driver/profil/foto", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  mulaiLaporan: async (data) => {
    const response = await apiClient.post("/laporan/mulai", data);
    return response.data;
  },
  submitInspeksi: async (laporanId, data) => {
    const response = await apiClient.post(`/laporan/inspeksi?laporan_id=${laporanId}`, data);
    return response.data;
  },
  submitSesiPerjalanan: async (laporanId, data) => {
    const response = await apiClient.post(`/laporan/sesi?laporan_id=${laporanId}`, data);
    return response.data;
  },
  uploadSelfie: async (formData) => {
    const response = await apiClient.post("/laporan/upload-selfie", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // ZONA ADMIN
  getDashboardAdmin: async () => {
    const response = await apiClient.get("/admin/dashboard");
    return response.data;
  },
  getUsersAdmin: async () => {
    const response = await apiClient.get("/admin/users");
    return response.data;
  },
  tambahUserAdmin: async (userData) => {
    const response = await apiClient.post("/admin/users", userData);
    return response.data;
  },
  getRekapAdmin: async () => {
    const response = await apiClient.get("/admin/rekap");
    return response.data;
  },
  exportExcelAdmin: async () => {
    const response = await apiClient.get("/admin/export-excel", {
      responseType: "blob",
    });
    return response.data;
  },
};

export default apiClient;
