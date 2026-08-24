import React, { useState, useRef, useEffect, useCallback } from 'react';

const Persiapan = ({ onNext }) => {
  const [odometer, setOdometer] = useState('67008');
  const [photoTaken, setPhotoTaken] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [currentFacing, setCurrentFacing] = useState('environment');
  const [videoKey, setVideoKey] = useState(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const facingRef = useRef('environment');

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startCameraStream = useCallback(async (facing) => {
    setCameraError('');
    setIsCameraLoading(true);

    try {
      stopStream();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });

      streamRef.current = stream;

      const trySetVideo = () => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().then(() => {
              setIsCameraLoading(false);
            }).catch(err => {
              console.error('Play error:', err);
              setCameraError('Gagal memutar video. Coba refresh halaman.');
              setIsCameraLoading(false);
            });
          };
        } else {
          setTimeout(trySetVideo, 100);
        }
      };

      trySetVideo();
    } catch (err) {
      console.error('Camera error:', err);
      let errorMessage = 'Gagal akses kamera';
      if (err.name === 'NotAllowedError') errorMessage = 'Izin kamera ditolak. Aktifkan di pengaturan browser.';
      else if (err.name === 'NotFoundError') errorMessage = 'Kamera tidak ditemukan.';
      else if (err.name === 'NotReadableError') errorMessage = 'Kamera sedang digunakan aplikasi lain.';

      setCameraError(errorMessage);
      setIsCameraLoading(false);
      setShowCamera(false);
    }
  }, [stopStream]);

  useEffect(() => {
    if (showCamera) {
      setVideoKey(prev => prev + 1);
      facingRef.current = currentFacing;
      startCameraStream(currentFacing);
    } else {
      stopStream();
    }

    return () => {
      stopStream();
    };
  }, [showCamera]);

  const switchCamera = useCallback(() => {
    const newFacing = facingRef.current === 'environment' ? 'user' : 'environment';
    facingRef.current = newFacing;
    setCurrentFacing(newFacing);
    setVideoKey(prev => prev + 1);
    startCameraStream(newFacing);
  }, [startCameraStream]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        setCameraError('Video belum siap. Tunggu sebentar lalu coba lagi.');
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      if (facingRef.current === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      setPhotoPreview(dataUrl);
      setPhotoTaken(true);
      setShowCamera(false);
      stopStream();
    }
  }, [stopStream]);

  const stopCamera = useCallback(() => {
    setShowCamera(false);
    setCameraError('');
  }, []);

  const handleRetakePhoto = () => {
    setPhotoTaken(false);
    setPhotoPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (odometer && photoTaken) {
      onNext({
        odometer, photoTaken, photoPreview,
        driver: { name: 'Pak Budi', date: '24 Oktober 2023' },
        assignment: { route: 'Trayek A', bus: 'Bus 07', plate: 'S 1772 SP' }
      });
    }
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      {/* Progress Step Bar */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#00206B] text-white flex items-center justify-center text-xs">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm font-bold text-[#00206B]">Persiapan</span>
        </div>
        <div className="flex-1 mx-4 border-t-2 border-dashed border-slate-200"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center text-xs font-bold">2</div>
          <span className="text-sm font-bold text-slate-400">Inspeksi</span>
        </div>
      </div>

      {/* Grid Layout untuk Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          {/* Driver Card */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#00206B] m-0">Pak Budi</h3>
              <p className="text-sm text-slate-400 font-semibold mt-0.5">24 Oktober 2023</p>
            </div>
          </div>

          {/* Assignment Card */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-3">
            <span className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">Penugasan Saat Ini</span>
            <div className="bg-[#F0F4F8] rounded-xl p-5 flex items-center justify-between border border-slate-100">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#00206B] m-0">Trayek A</h4>
                <p className="text-sm text-slate-500 font-medium">S 1772 SP (Bus 07)</p>
              </div>
              <div className="text-slate-400">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="4" y="3" width="16" height="15" rx="3" />
                  <line x1="4" y1="13" x2="20" y2="13" />
                  <circle cx="8" cy="9" r="1.2" fill="currentColor" />
                  <circle cx="16" cy="9" r="1.2" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>

          {/* Speedometer Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-3">
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-wide">Speedometer Awal (KM)</label>
              <input
                type="number" required value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-4 text-base text-[#00206B] font-bold focus:outline-none transition-all"
                placeholder="67008"
              />
            </div>

            {/* Camera UI */}
            {showCamera ? (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden border-2 border-[#00206B] shadow-sm bg-black">
                  <video
                    key={videoKey}
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-64 object-cover ${currentFacing === 'user' ? 'scale-x-[-1]' : ''}`}
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    {currentFacing === 'environment' ? 'Kamera Belakang' : 'Kamera Depan'}
                  </div>
                  {isCameraLoading && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2">
                      <svg className="w-10 h-10 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-white text-xs font-bold">Memuat kamera...</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={switchCamera} disabled={isCameraLoading} className="py-3 px-2 rounded-xl font-bold flex flex-col items-center justify-center gap-1 border-2 border-slate-200 hover:bg-slate-50 transition-all text-xs cursor-pointer text-slate-600 disabled:opacity-50">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Switch
                  </button>
                  <button type="button" onClick={stopCamera} disabled={isCameraLoading} className="py-3 px-2 rounded-xl font-bold flex flex-col items-center justify-center gap-1 border-2 border-slate-200 hover:bg-slate-50 transition-all text-xs cursor-pointer text-slate-600 disabled:opacity-50">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Batal
                  </button>
                  <button type="button" onClick={capturePhoto} disabled={isCameraLoading} className="py-3 px-2 rounded-xl font-bold flex flex-col items-center justify-center gap-1 bg-[#00206B] hover:bg-[#00174E] text-white transition-all text-xs cursor-pointer disabled:opacity-50">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Ambil
                  </button>
                </div>
                {cameraError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3 rounded-lg text-center">{cameraError}</div>
                )}
              </div>
            ) : photoTaken && photoPreview ? (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden border-2 border-[#BCECD2] shadow-sm">
                  <img src={photoPreview} alt="Foto Speedometer" className="w-full h-48 object-cover" />
                  <div className="absolute top-2 left-2 bg-[#137333] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Foto Tersimpan
                  </div>
                </div>
                <button type="button" onClick={handleRetakePhoto} className="w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border-2 border-slate-200 hover:bg-slate-50 transition-all text-sm cursor-pointer text-slate-600">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Ambil Foto Ulang
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setShowCamera(true)} disabled={isCameraLoading} className="w-full py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:bg-slate-50 transition-all text-sm cursor-pointer text-[#00206B] disabled:opacity-50">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Ambil Foto Speedometer
              </button>
            )}

            {/* Proceed Button */}
            <button type="submit" disabled={!photoTaken} className="w-full bg-[#00206B] hover:bg-[#00174E] disabled:bg-slate-300 disabled:text-slate-500 text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer">
              <span>LANJUT KE INSPEKSI</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-4">
          <div className="bg-[#E6F7ED] border border-[#BCECD2] rounded-xl p-4 flex items-center gap-3 text-[#137333] shadow-sm">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-sm font-extrabold uppercase tracking-wide">GPS Tervalidasi</span>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h4 className="text-sm font-extrabold text-[#00206B] mb-3">Info Persiapan</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between"><span className="font-semibold">Waktu Mulai</span><span className="text-slate-400">06:00 WIB</span></div>
              <div className="flex justify-between"><span className="font-semibold">Lokasi</span><span className="text-slate-400">Dishub Mojokerto</span></div>
              <div className="flex justify-between"><span className="font-semibold">Status</span><span className="text-emerald-600 font-bold">Siap</span></div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h4 className="text-sm font-extrabold text-[#00206B] mb-3">Progress Inspeksi</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-slate-500">Komponen</span><span className="font-bold">0/9</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-[#00206B] h-2 rounded-full" style={{ width: '0%' }}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Persiapan;