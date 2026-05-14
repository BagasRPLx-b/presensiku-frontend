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
      // Endpoint ini akan digabung dengan baseURL dari api.js
      const res = await API.post('/api/auth/admin/login', { username, password });
      if (res.data.success) {
        onLogin(res.data.data);
      }
    } catch (err) {
      // Menangkap pesan error spesifik jika CORS atau koneksi gagal
      setError(err.response?.data?.message || 'Gagal terhubung ke server. Pastikan backend di Railway sudah Active.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-center">Selamat datang kembali</h1>
        
        {error && (
          <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-slate-400"
            >
              {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </button>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Masuk ke Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;