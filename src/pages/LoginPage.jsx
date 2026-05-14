import { useState } from 'react';
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import API from '../api';

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
      const res = await API.post('/api/auth/admin/login', { username, password });
      if (res.data.success) onLogin(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-surface transition-colors duration-300">
      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-[48%] p-14 bg-primary-dark">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-primary-dark text-base bg-white">
            P
          </div>
          <span className="text-white font-bold text-base tracking-tight">Presensi Ku</span>
        </div>

        {/* Main copy */}
        <div className="space-y-6">
          <div>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-3" style={{ letterSpacing: '-0.5px' }}>
              Kelola kehadiran
              <br />
              <span className="text-slate-400">siswa dengan mudah.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed" style={{ maxWidth: '320px' }}>
              Dashboard terpadu untuk absensi, izin, dan pengumuman seluruh siswa secara real-time.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-3">
            {[
              'Absensi QR Code harian otomatis',
              'Laporan Excel satu klik',
              'Manajemen pengajuan izin & sakit',
              'Push notification ke perangkat siswa',
            ].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-white/10">
                  <svg className="w-3 h-3 text-slate-300" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-slate-400 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat row */}
        <div className="flex gap-8 border-t border-white/10 pt-6">
          {[{ v: '100%', l: 'Akurasi Data' }, { v: 'Real-time', l: 'Pembaruan' }, { v: 'Aman', l: 'Terenkripsi' }].map((s) => (
            <div key={s.l}>
              <p className="text-xl font-bold text-white">{s.v}</p>
              <p className="text-slate-500 text-xs mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface-light">
        <div className="w-full max-w-sm space-y-7">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-base bg-primary">
              P
            </div>
            <span className="font-bold text-text-primary">Presensi Ku</span>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-text-primary mb-1" style={{ letterSpacing: '-0.3px' }}>
              Selamat datang kembali
            </h1>
            <p className="text-text-secondary text-sm">Masuk ke panel admin untuk melanjutkan</p>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 rounded-lg text-sm flex items-start gap-2 bg-danger/10 border border-danger/20 text-danger">
              <span className="font-bold flex-shrink-0">!</span>
              {error}
            </div>
          )}

          {/* Form card */}
          <div className="rounded-xl p-6 space-y-5 border border-border bg-surface">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide">
                Username
              </label>
              <div className="relative">
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm bg-surface-light border border-border text-text-primary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg text-sm bg-surface-light border border-border text-text-primary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? <HiOutlineEyeOff className="w-4 h-4" /> : <HiOutlineEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !username || !password}
              className="w-full py-3 rounded-lg font-semibold text-white text-sm bg-primary hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Memproses...
                </span>
              ) : (
                'Masuk ke Dashboard'
              )}
            </button>
          </div>

          <p className="text-center text-text-muted text-xs">
            © 2024 Presensi Ku · Sistem Absensi Sekolah
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;