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

const Spinner = () => (
  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4C5.373 4 0 9.373 0 16h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);


// ==================== LOGIN PAGE COMPONENT ====================
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  
  const errorRef = useRef(null);

  // Auto-hide error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Clear error when user types
  useEffect(() => {
    if (username || password) setError('');
  }, [username, password]);

  const handleSubmit = async () => {
    if (!username.trim() || !password) {
      setError('Username dan password harus diisi');
      if (errorRef.current) {
        errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
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
        const userData = { 
          username, 
          token: 'dummy-jwt-token-' + Date.now() 
        };
        
        setLoggedInUser(userData);
        setIsLoggedIn(true);
        
        if (onLogin) {
          onLogin(userData);
        }
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-900 px-4"
        style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
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
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ 
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-soft-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-soft-pulse-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/25 mb-5 hover:shadow-blue-500/40 transition-shadow duration-300">
            <IconShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
            Sistem<span className="text-blue-400">Absensi</span>
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Admin Panel • Manajemen Data
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl shadow-2xl p-8 hover:border-white/[0.12] transition-all duration-300">
          
          {/* Card Header */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Selamat Datang Kembali
            </h2>
            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
              Masuk untuk mengelola data absensi siswa
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div 
              ref={errorRef}
              className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-6 animate-shake"
            >
              <div className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
              </div>
              <p className="text-sm text-red-300 leading-relaxed">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            {/* Username Input */}
            <div className="group">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 ml-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <IconUser className="w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="admin@sekolah.id"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-12 pr-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-2xl text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <IconLock className="w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-12 pr-12 py-3 bg-white/[0.05] border border-white/[0.08] rounded-2xl text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <IconEyeOff className="w-5 h-5" />
                  ) : (
                    <IconEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="mt-3 text-right">
            <button 
              onClick={() => alert('Fitur reset password: hubungi administrator sekolah.\n\nDemo: username: admin / password: admin123')}
              className="text-xs text-slate-500 hover:text-blue-400 transition-colors font-medium"
            >
              Lupa password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !username || !password}
            className="w-full mt-6 flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-2xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0 disabled:hover:shadow-blue-500/25"
          >
            {loading ? (
              <>
                <Spinner />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <IconSparkles className="w-5 h-5" />
                <span>Masuk ke Dashboard</span>
              </>
            )}
          </button>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <div className="w-1 h-1 bg-blue-500/50 rounded-full" />
              <span>Sistem Manajemen Absensi</span>
              <div className="w-1 h-1 bg-blue-500/50 rounded-full" />
              <span>v2.0</span>
            </div>
          </div>
        </div>

        {/* Feature Strip */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-center">
          <div className="flex flex-col items-center">
            <div className="text-blue-400 font-bold text-sm tracking-wide">100%</div>
            <div className="text-[11px] text-slate-500 font-medium">Akurasi Data</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-blue-400 font-bold text-sm tracking-wide">Real-time</div>
            <div className="text-[11px] text-slate-500 font-medium">Pembaruan</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-blue-400 font-bold text-sm tracking-wide">Aman</div>
            <div className="text-[11px] text-slate-500 font-medium">Terenkripsi</div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-slate-600 mt-6">
          © 2024 Presensi Ku - Sistem Absensi Sekolah
        </p>
      </div>

      {/* Inline Animations */}
      <style>{`
        @keyframes softPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-soft-pulse {
          animation: softPulse 6s infinite ease-in-out;
        }
        .animate-soft-pulse-delayed {
          animation: softPulse 6s infinite ease-in-out 2s;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }
        .animate-shake {
          animation: shake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
    </div>
  );
}

export default LoginPage;