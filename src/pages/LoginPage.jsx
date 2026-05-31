import { useState } from 'react';
import { 
  HiOutlineUser, 
  HiOutlineLockClosed, 
  HiOutlineEye, 
  HiOutlineEyeOff,
  HiOutlineShieldCheck,
  HiOutlineSparkles
} from 'react-icons/hi';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      // Uncomment dan sesuaikan dengan API Anda
      // const res = await API.post('/api/auth/admin/login', { username, password });
      // if (res.data.success) {
      //   onLogin(res.data.data);
      // }
      
      // Simulasi login untuk testing
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin({ username, token: 'dummy-token' });
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal terhubung ke server. Pastikan backend di Railway sudah Active.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
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
            <HiOutlineShieldCheck className="w-8 h-8 text-white" />
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
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-6 animate-shake">
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
                  <HiOutlineUser className="w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
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
                  <HiOutlineLockClosed className="w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
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
                    <HiOutlineEyeOff className="w-5 h-5" />
                  ) : (
                    <HiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="mt-3 text-right">
            <button className="text-xs text-slate-500 hover:text-blue-400 transition-colors font-medium">
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
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4C5.373 4 0 9.373 0 16h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <HiOutlineSparkles className="w-5 h-5" />
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

        {/* Bottom Text */}
        <p className="text-center text-xs text-slate-600 mt-6">
          © 2024 SistemAbsensi • All rights reserved
        </p>
      </div>

      {/* Inline Animation Styles */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}

export default LoginPage;