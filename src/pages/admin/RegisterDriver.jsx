import React, { useState } from "react";

const Register = ({ onRegisterSuccess, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter!");
      return;
    }

    // Simpan ke localStorage (nanti bisa diganti backend)
    const users = JSON.parse(localStorage.getItem("siclus_users") || "[]");

    if (users.find((u) => u.email === formData.email)) {
      setError("Email sudah terdaftar!");
      return;
    }

    const newUser = {
      id: `USR${Date.now()}`,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phone: formData.phone,
    };

    users.push(newUser);
    localStorage.setItem("siclus_users", JSON.stringify(users));

    onRegisterSuccess(newUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#00206B] to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white tracking-widest uppercase">SICLUS</h1>
          <p className="text-slate-300 text-sm mt-2">Sistem Informasi Angkutan Sekolah</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-[#00206B]">Buat Akun Admin</h2>
            <p className="text-xs text-slate-400 mt-1">Daftar untuk mengelola sistem</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3 rounded-xl mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="admin@siclus.id"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">No. Telepon</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="081234567890"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="Minimal 6 karakter"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Konfirmasi Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="Ulangi password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all text-sm cursor-pointer mt-2"
            >
              DAFTAR SEKARANG
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Sudah punya akun?{" "}
              <button onClick={onBackToLogin} className="text-[#00206B] font-bold hover:underline cursor-pointer">
                Login di sini
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
