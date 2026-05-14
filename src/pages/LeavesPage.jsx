// ============================================================
// LeavesPage — Manajemen Izin & Sakit (Redesigned: Light SaaS)
// GET /api/leaves | PATCH /api/leaves/approve/:id
// ============================================================

import { useState, useEffect } from 'react';
import {
  HiOutlineDocumentText, HiOutlineCheckCircle, HiOutlineXCircle,
  HiOutlineRefresh, HiOutlineClock, HiOutlineExternalLink,
} from 'react-icons/hi';
import API from '../api';

const font = "'Plus Jakarta Sans', sans-serif";

const typeConfig = {
  Sakit: { bg: 'rgba(249, 115, 22, 0.1)', color: '#F97316', border: 'rgba(249, 115, 22, 0.2)' },
  Izin:  { bg: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', border: 'rgba(245, 158, 11, 0.2)' },
};

const Card = ({ children, className = '', style = {} }) => (
  <div
    className={`card ${className}`}
    style={{ ...style }}
  >
    {children}
  </div>
);

const getInitials = (name = '') =>
  name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

function LeavesPage() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/leaves');
      if (res.data.success) setLeaves(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeaves(); }, []);

  const handleAction = async (id, status) => {
    setActionLoading(`${id}-${status}`);
    try {
      const res = await API.patch(`/api/leaves/approve/${id}`, { status });
      if (res.data.success) fetchLeaves();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengubah status');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary" style={{ letterSpacing: '-0.3px' }}>
            Pengajuan Izin &amp; Sakit
          </h1>
          <p className="text-text-muted text-sm mt-0.5 flex items-center gap-1.5">
            <HiOutlineClock className="w-4 h-4" />
            {leaves.length > 0
              ? `${leaves.length} pengajuan menunggu persetujuan`
              : 'Tidak ada pengajuan yang menunggu'}
          </p>
        </div>
        <button
          onClick={fetchLeaves}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface border border-border transition-all"
        >
          <HiOutlineRefresh className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {loading ? (
        <Card>
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg className="animate-spin w-6 h-6 text-slate-300" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <p className="text-slate-400 text-sm">Memuat pengajuan...</p>
          </div>
        </Card>
      ) : leaves.length === 0 ? (
        <Card className="py-16">
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-success/10"
            >
              <HiOutlineCheckCircle className="w-6 h-6 text-success" />
            </div>
            <div className="text-center">
              <p className="text-text-primary font-semibold">Semua Sudah Diproses!</p>
              <p className="text-text-muted text-sm mt-1">Tidak ada pengajuan izin/sakit yang menunggu</p>
            </div>
          </div>
        </Card>
      ) : (
        <>
          {/* Mobile: Card layout */}
          <div className="flex flex-col gap-3 lg:hidden">
            {leaves.map((leave) => {
              const typeCfg = typeConfig[leave.type] || typeConfig.Izin;
              return (
                <Card key={leave.id} className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 bg-primary"
                      >
                        {getInitials(leave.nama_lengkap)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{leave.nama_lengkap}</p>
                        <p className="text-xs text-text-muted">{leave.nisn} · {leave.kelas}</p>
                      </div>
                    </div>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold flex-shrink-0"
                      style={{ background: typeCfg.bg, color: typeCfg.color, border: `1px solid ${typeCfg.border}` }}
                    >
                      {leave.type}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mb-3 leading-relaxed">{leave.reason}</p>
                  {leave.file_path && (
                    <a
                      href={`http://localhost:3000/uploads/${leave.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium mb-3 text-info hover:underline"
                    >
                      <HiOutlineDocumentText className="w-4 h-4" />
                      Lihat File Bukti
                      <HiOutlineExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction(leave.id, 'Approved')}
                      disabled={!!actionLoading}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-success/10 text-success border border-success/20 transition-all disabled:opacity-50"
                    >
                      <HiOutlineCheckCircle className="w-4 h-4" />
                      Setujui
                    </button>
                    <button
                      onClick={() => handleAction(leave.id, 'Rejected')}
                      disabled={!!actionLoading}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-danger/10 text-danger border border-danger/20 transition-all disabled:opacity-50"
                    >
                      <HiOutlineXCircle className="w-4 h-4" />
                      Tolak
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Desktop: Table layout */}
          <Card className="overflow-hidden hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface border-b border-border">
                    {['Siswa', 'Tipe', 'Alasan', 'File Bukti', 'Aksi'].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave, i) => {
                    const typeCfg = typeConfig[leave.type] || typeConfig.Izin;
                    const isActing = actionLoading?.startsWith(leave.id);
                    return (
                      <tr
                        key={leave.id}
                        className={`border-b border-border transition-colors ${i % 2 === 0 ? 'bg-surface-light' : 'bg-surface/30'}`}
                      >
                        {/* Siswa */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 bg-primary"
                            >
                              {getInitials(leave.nama_lengkap)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-text-primary">{leave.nama_lengkap}</p>
                              <p className="text-xs text-text-muted">{leave.nisn} · {leave.kelas}</p>
                            </div>
                          </div>
                        </td>

                        {/* Tipe */}
                        <td className="px-5 py-4">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                            style={{ background: typeCfg.bg, color: typeCfg.color, border: `1px solid ${typeCfg.border}` }}
                          >
                            {leave.type}
                          </span>
                        </td>

                        {/* Alasan */}
                        <td className="px-5 py-4 text-sm text-text-secondary" style={{ maxWidth: '280px' }}>
                          <p className="line-clamp-2 leading-relaxed">{leave.reason}</p>
                        </td>

                        {/* File Bukti */}
                        <td className="px-5 py-4">
                          {leave.file_path ? (
                            <a
                              href={`http://localhost:3000/uploads/${leave.file_path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-info/10 text-info border border-info/20 hover:bg-info/20 transition-all"
                            >
                              <HiOutlineDocumentText className="w-3.5 h-3.5" />
                              Lihat File
                              <HiOutlineExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-slate-300 text-xs">Tidak ada</span>
                          )}
                        </td>

                        {/* Aksi */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAction(leave.id, 'Approved')}
                              disabled={isActing}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-success/10 text-success border border-success/20 hover:bg-success/20 transition-all disabled:opacity-50"
                            >
                              {actionLoading === `${leave.id}-Approved` ? (
                                <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                </svg>
                              ) : <HiOutlineCheckCircle className="w-3.5 h-3.5" />}
                              Setujui
                            </button>
                            <button
                              onClick={() => handleAction(leave.id, 'Rejected')}
                              disabled={isActing}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20 transition-all disabled:opacity-50"
                            >
                              {actionLoading === `${leave.id}-Rejected` ? (
                                <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                </svg>
                              ) : <HiOutlineXCircle className="w-3.5 h-3.5" />}
                              Tolak
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

export default LeavesPage;