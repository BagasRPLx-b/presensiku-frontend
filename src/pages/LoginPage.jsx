import { useState, useEffect, useRef } from 'react';

// ==================== SVG ICON COMPONENTS ====================
const IconUser = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconLock = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const IconEye = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const IconEyeOff = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const IconShieldCheck = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconSparkles = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconCheck = ({ className = "w-10 h-10" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

const IconRefresh = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const IconQrCode = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
);

const IconBell = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4C5.373 4 0 9.373 0 16h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

// ==================== FEATURE ITEM ====================
function FeatureItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="text-sm text-slate-300">{text}</span>
    </div>
  );
}

// ==================== LOGIN PAGE ====================
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const errorRef = useRef(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (username || password) setError('');
  }, [username, password]);

  const handleSubmit = async () => {
    if (!username.trim() || !password) {
      setError('Username dan password harus diisi');
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setError('');
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (
        (username === 'admin' || username === 'admin@sekolah.id') &&
        password === 'admin123'
      ) {
        const userData = { username, token: 'dummy-jwt-token-' + Date.now() };
        setLoggedInUser(userData);
        setIsLoggedIn(true);
        if (onLogin) onLogin(userData);
      } else {
        throw new Error('Username atau password salah. Gunakan admin / admin123 untuk demo.');
      }
    } catch (err) {
      setError(err.message || 'Gagal terhubung ke server. Pastikan backend aktif.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleReset = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setUsername('');
    setPassword('');
    setError('');
  };

  // ==================== SUCCESS VIEW ====================
  if (isLoggedIn && loggedInUser) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-900 px-4"
        style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
      >
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <IconCheck className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Login Berhasil!</h2>
          <p className="text-slate-300 mb-6">
            Selamat datang,{' '}
            <span className="font-semibold text-white">{loggedInUser.username}</span>.
            Anda diarahkan ke dashboard utama.
          </p>
          <div className="bg-white/5 rounded-xl p-4 text-left space-y-2 mb-6">
            <p className="text-sm text-slate-300 flex items-center gap-2">
              <span className="text-blue-400 font-mono">✓</span> Akses realtime absensi
            </p>
            <p className="text-sm text-slate-300 flex items-center gap-2">
              <span className="text-blue-400 font-mono">✓</span> QR Code management
            </p>
            <p className="text-sm text-slate-300 flex items-center gap-2">
              <span className="text-blue-400 font-mono">✓</span> Laporan Excel & Izin siswa
            </p>
          </div>
          <button
            onClick={handleReset}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <IconRefresh className="w-5 h-5" />
            Kembali ke Halaman Login
          </button>
          <p className="text-xs text-slate-500 mt-4">
            © 2024 Presensi Ku - Sistem Absensi Sekolah
          </p>
        </div>
      </div>
    );
  }

  // ==================== LOGIN FORM VIEW ====================
  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
    >
      {/* ===== LEFT PANEL ===== */}
      <div
        className="hidden lg:flex lg:w-[58%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: '#0b1120' }}
      >
        {/* Background glows */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-white font-semibold text-base tracking-tight">Presensi Ku</span>
        </div>

        {/* Hero text */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-10">
          <h1 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Kelola kehadiran<br />
            <span className="text-blue-400">siswa dengan mudah.</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
            Dashboard terpadu untuk absensi, izin, dan pengumuman seluruh siswa secara real-time.
          </p>
          <div className="space-y-3">
            <FeatureItem
              icon={<IconQrCode className="w-3.5 h-3.5 text-blue-400" />}
              text="Absensi QR Code harian otomatis"
            />
            <FeatureItem
              icon={<svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
              text="Laporan Excel satu klik"
            />
            <FeatureItem
              icon={<svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
              text="Manajemen pengajuan izin & sakit"
            />
            <FeatureItem
              icon={<IconBell className="w-3.5 h-3.5 text-blue-400" />}
              text="Push notification ke perangkat siswa"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-8 pt-6 border-t border-white/10">
          {[
            { val: '100%', label: 'Akurasi Data' },
            { val: 'Real-time', label: 'Pembaruan' },
            { val: 'Aman', label: 'Terenkripsi' },
          ].map(({ val, label }) => (
            <div key={label}>
              <div className="text-blue-400 font-bold text-sm">{val}</div>
              <div className="text-slate-500 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Mobile brand (only on small screens) */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="font-semibold text-gray-900">Presensi Ku</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
            Selamat datang kembali
          </h2>
          <p className="text-sm text-gray-500 mb-8">Masuk ke panel admin untuk melanjutkan</p>

          {/* Error */}
          {error && (
            <div
              ref={errorRef}
              className="flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 rounded-xl mb-5 animate-shake"
            >
              <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full block" />
              </div>
              <p className="text-sm text-red-600 leading-relaxed">{error}</p>
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label className="block text-[10.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <IconUser className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-[10.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <IconLock className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="text-right mb-6">
            <button
              onClick={() => alert('Fitur reset password: hubungi administrator sekolah.\n\nDemo: username: admin / password: admin123')}
              className="text-xs text-blue-500 hover:text-blue-700 transition-colors font-medium"
            >
              Lupa password?
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading || !username || !password}
            className="w-full flex items-center justify-center gap-2.5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Spinner />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <IconSparkles className="w-4 h-4" />
                <span>Masuk ke Dashboard</span>
              </>
            )}
          </button>

          {/* Hint */}
          <div className="mt-5 p-3.5 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2.5">
            <IconShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-600 leading-relaxed">
              Demo: gunakan <strong>admin</strong> / <strong>admin123</strong> untuk masuk ke sistem.
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            © 2024 Presensi Ku · Sistem Absensi Sekolah
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }
        .animate-shake { animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both; }
      `}</style>
    </div>
  );
}

export default LoginPage;