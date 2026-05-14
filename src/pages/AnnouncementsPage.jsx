// ============================================================
// AnnouncementsPage — Buat Pengumuman (Redesigned: Light SaaS)
// POST /api/announcements
// ============================================================

import { useState } from 'react';
import {
  HiOutlineSpeakerphone, HiOutlineCheck,
  HiOutlineEye, HiOutlineEyeOff, HiOutlineBell,
} from 'react-icons/hi';
import API from '../api';

const font = "'Plus Jakarta Sans', sans-serif";
const MAX_CONTENT = 500;

function AnnouncementsPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const contentLeft = MAX_CONTENT - content.length;
  const contentPct = Math.min((content.length / MAX_CONTENT) * 100, 100);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const res = await API.post('/api/announcements', { title, content });
      if (res.data.success) {
        setSuccessMsg('Pengumuman berhasil dikirim ke seluruh perangkat siswa!');
        setTitle('');
        setContent('');
        setPreview(false);
      } else {
        setErrorMsg(res.data.message || 'Gagal mengirim pengumuman');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Terjadi kesalahan server');
    } finally {
      setLoading(false);
    }
  };

  const progressColor =
    contentLeft < 50 ? '#EF4444' : contentLeft < 100 ? '#F59E0B' : 'var(--color-primary)';

  return (
    <div className="space-y-6 pb-10" style={{ maxWidth: '680px' }}>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary" style={{ letterSpacing: '-0.3px' }}>
          Buat Pengumuman
        </h1>
        <p className="text-text-muted text-sm mt-0.5 flex items-center gap-1.5">
          <HiOutlineBell className="w-4 h-4" />
          Akan dikirim sebagai Push Notification ke seluruh perangkat siswa
        </p>
      </div>

      {/* Success */}
      {successMsg && (
        <div
          className="flex items-start gap-3 p-4 rounded-xl bg-success/10 border border-success/20"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-success/20"
          >
            <HiOutlineCheck className="w-4 h-4 text-success" />
          </div>
          <div>
            <p className="font-semibold text-sm text-success">Berhasil Dikirim!</p>
            <p className="text-xs mt-0.5 text-success/80">{successMsg}</p>
          </div>
        </div>
      )}

      {/* Error */}
      {errorMsg && (
        <div
          className="flex items-start gap-3 p-4 rounded-xl bg-danger/10 border border-danger/20"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-danger/20"
          >
            <span className="font-bold text-sm text-danger">!</span>
          </div>
          <div>
            <p className="font-semibold text-sm text-danger">Gagal Mengirim</p>
            <p className="text-xs mt-0.5 text-danger/80">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div
        className="card overflow-hidden"
      >
        {/* Card Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b border-border-subtle"
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary"
            >
              <HiOutlineSpeakerphone className="w-4 h-4 text-white" />
            </div>
            <span className="text-text-primary font-semibold text-sm">Kompos Pengumuman</span>
          </div>
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            disabled={!title && !content}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-30 border border-border ${preview ? 'bg-surface text-text-primary' : 'bg-surface-light text-text-muted hover:bg-surface'}`}
          >
            {preview
              ? <HiOutlineEyeOff className="w-3.5 h-3.5" />
              : <HiOutlineEye className="w-3.5 h-3.5" />}
            {preview ? 'Edit' : 'Preview'}
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {preview ? (
            /* Preview Mode */
            <div className="flex justify-center">
              <div
                className="w-full max-w-xs rounded-2xl p-4 bg-surface border border-border"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm bg-primary"
                  >
                    P
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-text-primary text-xs font-bold">Presensi Ku</span>
                      <span className="text-text-muted text-xs">Sekarang</span>
                    </div>
                    <p className="text-text-primary text-sm font-semibold leading-tight mb-1">
                      {title || <span className="text-text-muted italic font-normal">Judul pengumuman...</span>}
                    </p>
                    <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
                      {content || <span className="text-text-muted italic">Isi pesan pengumuman...</span>}
                    </p>
                  </div>
                </div>
                <div
                  className="mt-3 pt-3 text-center border-t border-border"
                >
                  <p className="text-text-muted text-xs">Simulasi tampilan notifikasi</p>
                </div>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide">
                  Judul Pengumuman
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="cth: Libur Nasional Hari Kemerdekaan"
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-surface-light border border-border text-text-primary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Isi Pesan
                  </label>
                  <span
                    className="text-xs font-medium"
                    style={{
                      color: contentLeft < 50 ? '#EF4444' : contentLeft < 100 ? '#F59E0B' : 'var(--color-text-muted)',
                    }}
                  >
                    {contentLeft} karakter tersisa
                  </span>
                </div>
                <textarea
                  rows={6}
                  maxLength={MAX_CONTENT}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan detail pengumuman di sini. Pastikan informasi jelas dan mudah dipahami siswa."
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-surface-light border border-border text-text-primary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                />
                {/* Progress bar */}
                <div
                  className="w-full h-1 rounded-full overflow-hidden bg-border"
                >
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${contentPct}%`, background: progressColor }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-5 py-4 flex items-center justify-between gap-4 border-t border-border-subtle bg-surface/50"
        >
          <div className="flex items-center gap-2 text-text-muted text-xs">
            <HiOutlineBell className="w-4 h-4" />
            <span>Terkirim ke semua perangkat siswa aktif</span>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !title.trim() || !content.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white text-sm bg-primary hover:bg-primary-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Mengirim...
              </>
            ) : (
              <>
                <HiOutlineSpeakerphone className="w-4 h-4" />
                Kirim Sekarang
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tips */}
      <div
        className="rounded-xl px-4 py-3.5 bg-surface border border-border"
      >
        <p className="text-text-secondary text-xs leading-relaxed">
          <span className="font-semibold text-text-primary">Tips:</span>{' '}
          Gunakan judul yang singkat dan informatif (maks. 50 karakter) agar terbaca penuh di notifikasi.
          Isi pesan sebaiknya menjelaskan waktu, tempat, dan instruksi dengan jelas.
        </p>
      </div>
    </div>
  );
}

export default AnnouncementsPage;