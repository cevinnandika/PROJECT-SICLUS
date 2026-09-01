import React, { useState, useRef, useEffect } from "react";

// Komponen Live Camera Terintegrasi (Anti-Kecurangan / Buka Kamera Langsung)
const LiveCamera = ({ onCapture, onCancel }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        alert("Akses kamera ditolak atau kamera tidak ditemukan!");
        onCancel();
      }
    };
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");

      // Matikan kamera setelah jepret
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      onCapture(imageData);
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-2">
      <div className="relative w-full h-48 bg-black rounded-lg overflow-hidden border-2 border-[#00206B]">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <div className="flex gap-2 w-full">
        <button type="button" onClick={takePhoto} className="flex-1 bg-[#137333] text-white font-bold py-2 rounded-lg text-xs shadow-md">
          📸 Jepret Sekarang
        </button>
        <button
          type="button"
          onClick={() => {
            if (stream) stream.getTracks().forEach((t) => t.stop());
            onCancel();
          }}
          className="bg-[#C5221F] text-white font-bold py-2 px-4 rounded-lg text-xs"
        >
          Batal
        </button>
      </div>
    </div>
  );
};

const Laporan = ({ user, onFinishShift }) => {
  const [activeCP, setActiveCP] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [odoAwal, setOdoAwal] = useState("");
  const [odo2, setOdo2] = useState("");
  const [odo3, setOdo3] = useState("");
  const [odo4, setOdo4] = useState("");
  const [penumpang, setPenumpang] = useState("");

  // State Kamera & Foto
  const [isPhotoSaved, setIsPhotoSaved] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const [inspeksi, setInspeksi] = useState({
    rem: null,
    ac: null,
    lampu: null,
    klakson: null,
    wiper: null,
    lampuRem: null,
    bell: null,
    pintu: null,
    kebersihan: null,
  });

  const handleCeklis = (item, status) => {
    setInspeksi((prev) => ({ ...prev, [item]: status }));
  };

  const totalCeklis = Object.values(inspeksi).filter((val) => val !== null).length;
  const isCP1Ready = totalCeklis === 9 && isPhotoSaved && odoAwal !== "";

  const handleSubmitCP = (e, nextCP) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);

      // Reset foto saat masuk CP4 biar minta foto penutup
      if (nextCP === 4) {
        setIsPhotoSaved(false);
        setPhotoPreview(null);
      }

      if (nextCP === 5) onFinishShift();
      else setActiveCP(nextCP);
    }, 800);
  };

  const CheckItem = ({ id, label, svgPath }) => (
    <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-lg">
      <div className="flex items-center gap-3">
        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={svgPath} />
        </svg>
        <span className="text-sm font-bold text-[#00206B]">{label}</span>
      </div>
      <div className="flex gap-2 bg-slate-50 p-1 rounded-lg border border-slate-100">
        <button
          type="button"
          onClick={() => handleCeklis(id, "OK")}
          className={`text-[10px] font-black px-4 py-1.5 rounded transition-colors cursor-pointer ${inspeksi[id] === "OK" ? "bg-[#00206B] text-white" : "bg-transparent text-slate-400 hover:bg-slate-200"}`}
        >
          OK
        </button>
        <button
          type="button"
          onClick={() => handleCeklis(id, "KURANG")}
          className={`text-[10px] font-black px-3 py-1.5 rounded transition-colors cursor-pointer ${inspeksi[id] === "KURANG" ? "bg-[#C5221F] text-white" : "bg-transparent text-slate-400 hover:bg-slate-200"}`}
        >
          KURANG
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 px-4 md:px-0 font-sans">
      {/* CHECK POINT 1: KELUAR DISHUB */}
      <div className={`border rounded-xl bg-white transition-all ${activeCP === 1 ? "border-[#00206B] shadow-sm" : "border-slate-200"}`}>
        <div className="flex justify-between items-center p-5 border-b border-slate-100">
          <h3 className="font-black text-[#00206B] text-sm md:text-base uppercase tracking-wide">CHECK POINT 1: KELUAR DISHUB</h3>
          {activeCP > 1 ? (
            <svg className="w-6 h-6 text-[#137333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        {activeCP >= 1 && (
          <div className={`p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all ${activeCP > 1 ? "opacity-60 pointer-events-none grayscale-[20%]" : ""}`}>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">PENUGASAN SAAT INI</span>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-black text-[#00206B] text-xl">{user?.trayek || "T06"}</h4>
                    <p className="text-xs font-semibold text-slate-500 mt-1">{user?.bus || "EKA"}</p>
                  </div>
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">ODOMETER AWAL</label>
                <input
                  type="number"
                  required
                  value={odoAwal}
                  onChange={(e) => setOdoAwal(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-[#00206B] text-lg outline-none focus:border-[#00206B]"
                  placeholder="0"
                />
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">AMBIL FOTO WAJAH</span>

                {isCameraOpen ? (
                  <LiveCamera
                    onCapture={(base64Img) => {
                      setPhotoPreview(base64Img);
                      setIsPhotoSaved(true);
                      setIsCameraOpen(false);
                    }}
                    onCancel={() => setIsCameraOpen(false)}
                  />
                ) : !isPhotoSaved ? (
                  <button
                    type="button"
                    onClick={() => setIsCameraOpen(true)}
                    className="w-full h-28 rounded-lg border-2 border-dashed border-slate-300 text-[#00206B] font-bold text-sm hover:bg-slate-50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    Buka Kamera Layar
                  </button>
                ) : (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border border-[#137333]">
                    <img src={photoPreview} alt="Selfie" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-[#137333] text-white text-[10px] font-bold px-2 py-1 rounded shadow">✓ Foto Tersimpan</div>
                    {activeCP === 1 && (
                      <button
                        type="button"
                        onClick={() => setIsCameraOpen(true)}
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-[#00206B] text-xs font-bold px-4 py-2 rounded shadow-md cursor-pointer"
                      >
                        Ulangi Foto
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-black text-[#00206B] text-base uppercase tracking-wide">INSPEKSI KENDARAAN</h4>
                  <p className="text-xs text-slate-500 mt-1">Lakukan pemeriksaan fungsional sebelum memulai perjalanan.</p>
                </div>
                <div className="bg-[#00206B] text-white text-center px-4 py-2 rounded-lg">
                  <span className="block text-xl font-black">{totalCeklis}/9</span>
                  <span className="block text-[8px] uppercase tracking-widest opacity-90">DIPERIKSA</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-grow">
                <CheckItem
                  id="rem"
                  label="Rem"
                  svgPath="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <CheckItem id="ac" label="AC" svgPath="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                <CheckItem
                  id="lampu"
                  label="Lampu"
                  svgPath="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
                <CheckItem
                  id="klakson"
                  label="Klakson"
                  svgPath="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
                <CheckItem
                  id="wiper"
                  label="Wiper"
                  svgPath="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
                <CheckItem
                  id="lampuRem"
                  label="Lampu Rem"
                  svgPath="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
                <CheckItem
                  id="bell"
                  label="Bell"
                  svgPath="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
                <CheckItem
                  id="pintu"
                  label="Pintu"
                  svgPath="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
                <CheckItem id="kebersihan" label="Kebersihan" svgPath="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </div>

              {activeCP === 1 && (
                <button
                  onClick={(e) => handleSubmitCP(e, 2)}
                  disabled={!isCP1Ready || isProcessing}
                  className={`w-full mt-6 font-bold py-4 rounded-lg text-sm transition-all ${isCP1Ready ? "bg-slate-100 text-[#00206B] hover:bg-slate-200 cursor-pointer" : "bg-slate-50 text-slate-300 cursor-not-allowed"}`}
                >
                  {isProcessing ? "MEMPROSES DATA..." : ">>> KIRIM DATA & CATAT WAKTU MULAI <<<"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CHECK POINT 2: TIBA DI TITIK START */}
      <div className={`border rounded-xl bg-white transition-all ${activeCP === 2 ? "border-[#00206B] shadow-sm" : "border-slate-200"}`}>
        <div className="flex justify-between items-center p-5 border-b border-slate-100">
          <h3 className={`font-black text-sm md:text-base uppercase tracking-wide ${activeCP >= 2 ? "text-[#00206B]" : "text-slate-400"}`}>CHECK POINT 2: TIBA DI TITIK START</h3>
          {activeCP > 2 ? (
            <svg className="w-6 h-6 text-[#137333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : activeCP === 2 ? (
            <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}
        </div>

        {activeCP >= 2 && (
          <form onSubmit={(e) => handleSubmitCP(e, 3)} className={`p-6 transition-all ${activeCP > 2 ? "opacity-60 pointer-events-none grayscale-[20%]" : ""}`}>
            <div className="max-w-xl">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">ODOMETER HALTE PERTAMA (KM)</label>
              <input
                type="number"
                required
                value={odo2}
                onChange={(e) => setOdo2(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-4 font-bold text-[#00206B] text-lg outline-none focus:border-[#00206B]"
                placeholder="0"
              />

              {activeCP === 2 && (
                <button type="submit" disabled={isProcessing} className="w-full mt-4 bg-[#00206B] text-white font-bold py-4 rounded-xl text-sm hover:bg-[#00174E] cursor-pointer">
                  {isProcessing ? "MEMPROSES..." : ">>> SIMPAN ODO & CATAT WAKTU TIBA <<<"}
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {/* CHECK POINT 3: TIBA DI TITIK FINISH */}
      <div className={`border rounded-xl bg-white transition-all ${activeCP === 3 ? "border-[#00206B] shadow-sm" : "border-slate-200"}`}>
        <div className="flex justify-between items-center p-5 border-b border-slate-100">
          <h3 className={`font-black text-sm md:text-base uppercase tracking-wide ${activeCP >= 3 ? "text-[#00206B]" : "text-slate-400"}`}>CHECK POINT 3: TIBA DI TITIK FINISH</h3>
          {activeCP > 3 ? (
            <svg className="w-6 h-6 text-[#137333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : activeCP === 3 ? (
            <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}
        </div>

        {activeCP >= 3 && (
          <form onSubmit={(e) => handleSubmitCP(e, 4)} className={`p-6 transition-all ${activeCP > 3 ? "opacity-60 pointer-events-none grayscale-[20%]" : ""}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">ODOMETER SEKOLAH (KM)</label>
                <input
                  type="number"
                  required
                  value={odo3}
                  onChange={(e) => setOdo3(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-4 font-bold text-[#00206B] text-lg outline-none focus:border-[#00206B]"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">TOTAL SISWA DIANGKUT</label>
                <input
                  type="number"
                  required
                  value={penumpang}
                  onChange={(e) => setPenumpang(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-4 font-bold text-[#00206B] text-lg outline-none focus:border-[#00206B]"
                  placeholder="0"
                />
              </div>
            </div>

            {activeCP === 3 && (
              <button type="submit" disabled={isProcessing} className="w-full max-w-2xl mt-4 bg-[#00206B] text-white font-bold py-4 rounded-xl text-sm hover:bg-[#00174E] cursor-pointer">
                {isProcessing ? "MEMPROSES..." : ">>> SIMPAN DATA & CATAT WAKTU SELESAI <<<"}
              </button>
            )}
          </form>
        )}
      </div>

      {/* CHECK POINT 4: KEMBALI KE DISHUB */}
      <div className={`border rounded-xl bg-white transition-all ${activeCP === 4 ? "border-[#00206B] shadow-sm" : "border-slate-200"}`}>
        <div className="flex justify-between items-center p-5 border-b border-slate-100">
          <h3 className={`font-black text-sm md:text-base uppercase tracking-wide ${activeCP >= 4 ? "text-[#00206B]" : "text-slate-400"}`}>CHECK POINT 4: KEMBALI KE DISHUB</h3>
          {activeCP === 4 ? (
            <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}
        </div>

        {activeCP === 4 && (
          <form onSubmit={(e) => handleSubmitCP(e, 5)} className="p-6">
            <div className="max-w-xl space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">ODOMETER AKHIR GARASI (KM)</label>
                <input
                  type="number"
                  required
                  value={odo4}
                  onChange={(e) => setOdo4(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-4 font-bold text-[#00206B] text-lg outline-none focus:border-[#00206B]"
                  placeholder="0"
                />
              </div>

              {isCameraOpen ? (
                <LiveCamera
                  onCapture={(base64Img) => {
                    setPhotoPreview(base64Img);
                    setIsPhotoSaved(true);
                    setIsCameraOpen(false);
                  }}
                  onCancel={() => setIsCameraOpen(false)}
                />
              ) : !isPhotoSaved ? (
                <button
                  type="button"
                  onClick={() => setIsCameraOpen(true)}
                  className="w-full py-4 rounded-xl border border-slate-400 bg-white text-[#00206B] font-bold text-sm hover:bg-slate-50 flex justify-center items-center gap-2 cursor-pointer transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                  Buka Kamera Akhir
                </button>
              ) : (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-[#137333]">
                  <img src={photoPreview} alt="Selfie Akhir" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-[#137333] text-white text-[10px] font-bold px-2 py-1 rounded shadow">✓ Foto Akhir Tersimpan</div>
                  <button
                    type="button"
                    onClick={() => setIsCameraOpen(true)}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-[#00206B] text-xs font-bold px-4 py-2 rounded shadow-md cursor-pointer"
                  >
                    Ulangi Foto
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing || !isPhotoSaved}
                className={`w-full text-white font-bold py-4 rounded-xl text-sm transition-colors ${!isPhotoSaved ? "bg-slate-300 cursor-not-allowed" : "bg-[#C5221F] hover:bg-[#A81F1C] cursor-pointer"}`}
              >
                {isProcessing ? "MEMPROSES..." : ">>> 🏁 SUBMIT FINAL & TUTUP SHIFT <<<"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Laporan;
