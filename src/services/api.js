import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// jwt token masuk
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("siclus_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// jwt token keluar
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("siclus_token");
      localStorage.removeItem("siclus_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const apiService = {
  // --- AUTH & USER ---
  login: async (email, password) => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },

  // ==========================================
  // ZONA DRIVER
  // ==========================================
  getJadwalDriver: async () => {
    const response = await apiClient.get("/driver/jadwal");
    return response.data;
  },
  getRiwayatDriver: async () => {
    const response = await apiClient.get("/driver/riwayat");
    return response.data;
  },
  updateFotoProfil: async (fileBlob) => {
    const formData = new FormData();
    formData.append("foto", fileBlob, "profile.jpg");
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
  uploadSelfie: async (fileBlob) => {
    const formData = new FormData();
    formData.append("foto", fileBlob);
    const response = await apiClient.post("/laporan/upload-selfie", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  submitCP1: async (laporanId, data) => {
    const response = await apiClient.post(`/laporan/sesi/cp1?laporan_id=${laporanId}`, data);
    return response.data;
  },
  submitCP2: async (sesiId, data) => {
    const response = await apiClient.put(`/laporan/sesi/cp2/${sesiId}`, data);
    return response.data;
  },
  submitCP3: async (sesiId, data) => {
    const response = await apiClient.put(`/laporan/sesi/cp3/${sesiId}`, data);
    return response.data;
  },
  submitCP4: async (sesiId, data) => {
    const response = await apiClient.put(`/laporan/sesi/cp4/${sesiId}`, data);
    return response.data;
  },

  // ==========================================
  // ZONA ADMIN
  // ==========================================
  getDashboardAdmin: async () => {
    const response = await apiClient.get("/admin/dashboard");
    return response.data;
  },
  getRekapAdmin: async () => {
    const response = await apiClient.get("/admin/rekap");
    return response.data;
  },
  getRiwayatHarianAdmin: async () => {
    const response = await apiClient.get("/admin/riwayat-harian");
    return response.data;
  },
  getUsersAdmin: async () => {
    const response = await apiClient.get("/admin/users");
    return response.data;
  },
};

export default apiClient;
