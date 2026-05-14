// ============================================================
// AttendancePage — Rekap Absensi Hari Ini (Redesigned: Light SaaS)
// GET /api/attendances
// ============================================================

import { useState, useEffect } from 'react';
import {
  HiOutlineRefresh, HiOutlineCalendar, HiOutlineDownload,
  HiOutlineCheck, HiOutlineDocumentText, HiOutlineXCircle,
  HiOutlineUsers,
} from 'react-icons/hi';
import API from '../api';

const font = "'Plus Jakarta Sans', sans-serif";

const statusConfig = {
  hadir: { label: 'Hadir',  bg: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: 'rgba(16, 185, 129, 0.2)', dot: '#10B981' },
  izin:  { label: 'Izin',   bg: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', border: 'rgba(245, 158, 11, 0.2)', dot: '#F59E0B' },
  sakit: { label: 'Sakit',  bg: 'rgba(249, 115, 22, 0.1)', color: '#F97316', border: 'rgba(249, 115, 22, 0.2)', dot: '#F97316' },
  alpha: { label: 'Alpha',  bg: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: 'rgba(239, 68, 68, 0.2)', dot: '#EF4444' },
};

const timeStatusConfig = {
  'Tepat Waktu': { label: 'Tepat Waktu', bg: 'rgba(16, 185, 129, 0.12)', color: '#047857' },
  'Hampir Terlambat': { label: 'Hampir Terlambat', bg: 'rgba(245, 158, 11, 0.12)', color: '#B45309' },
  Terlambat: { label: 'Terlambat', bg: 'rgba(239, 68, 68, 0.12)', color: '#B91C1C' },
};

const returnStatusConfig = {
  'Masih di Sekolah': { label: 'Masih di Sekolah', bg: 'rgba(59, 130, 246, 0.12)', color: '#1D4ED8' },
  'Sudah Pulang': { label: 'Sudah Pulang', bg: 'rgba(34, 197, 94, 0.12)', color: '#166534' },
};

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.hadir;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, fontFamily: font }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
};

const TimeStatusBadge = ({ statusWaktu }) => {
  const cfg = timeStatusConfig[statusWaktu] || { label: statusWaktu || 'Belum diatur', bg: 'rgba(148, 163, 184, 0.12)', color: '#475569' };
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: cfg.bg, color: cfg.color, fontFamily: font }}
    >
      {cfg.label}
    </span>
  );
};

const ReturnStatusBadge = ({ statusPulang }) => {
  const cfg = returnStatusConfig[statusPulang] || { label: statusPulang || 'Belum diatur', bg: 'rgba(148, 163, 184, 0.12)', color: '#475569' };
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: cfg.bg, color: cfg.color, fontFamily: font }}
    >
      {cfg.label}
    </span>
  );
};

const Card = ({ children, className = '', style = {} }) => (
  <div
    className={`card ${className}`}
    style={{ ...style }}
  >
    {children}
  </div>
);

function AttendancePage() {
  const [attendances, setAttendances] = useState([]);
  const [tanggal, setTanggal] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => { fetchAttendances(); }, []);

  const fetchAttendances = async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/attendances');
      if (res.data.success) {
        setAttendances(res.data.data.attendances);
        setTanggal(res.data.data.tanggal);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    window.open('http://localhost:3000/api/reports/export', '_blank');
  };

  const handleMarkPulang = async (attendanceId) => {
    setActionLoading(attendanceId);
    try {
      await API.patch(`/attendance/${attendanceId}/pulang`);
      await fetchAttendances();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Gagal memperbarui status pulang');
    } finally {
      setActionLoading(null);
    }
  };

  const formatTanggal = (d) => {
    if (!d) return '';
    return new Date(d + 'T00:00:00').toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const count = (s) => attendances.filter((a) => a.status === s).length;
  const hadir = count('hadir');
  const izin  = count('izin');
  const sakit = count('sakit');
  const alpha = count('alpha');

  const summaryItems = [
    { label: 'Total Absen',  value: attendances.length, icon: HiOutlineUsers,       accent: '#3B82F6', accentBg: '#EFF6FF' },
    { label: 'Hadir',        value: hadir,              icon: HiOutlineCheck,        accent: '#10B981', accentBg: '#ECFDF5' },
    { label: 'Izin / Sakit', value: izin + sakit,       icon: HiOutlineDocumentText, accent: '#F59E0B', accentBg: '#FFFBEB' },
    { label: 'Alpha',        value: alpha,              icon: HiOutlineXCircle,      accent: '#EF4444', accentBg: '#FEF2F2' },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary" style={{ letterSpacing: '-0.3px' }}>
            Rekap Absensi
          </h1>
          <div className="flex items-center gap-2 mt-1 text-text-muted text-sm">
            <HiOutlineCalendar className="w-4 h-4" />
            <span>{formatTanggal(tanggal) || 'Memuat tanggal...'}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-success/10 text-success border border-success/20 hover:bg-success/20 transition-all"
          >
            <HiOutlineDownload className="w-4 h-4" />
            Unduh Excel
          </button>
          <button
            onClick={fetchAttendances}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface border border-border transition-all"
          >
            <HiOutlineRefresh className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryItems.map((item, i) => (
          <Card key={i} className="p-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 bg-surface"
            >
              <item.icon style={{ width: '16px', height: '16px', color: item.accent }} />
            </div>
            <p className="text-2xl font-extrabold text-text-primary leading-none">{item.value}</p>
            <p className="text-text-muted text-xs mt-1">{item.label}</p>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg className="animate-spin w-6 h-6 text-slate-300" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <p className="text-slate-400 text-sm">Memuat data absensi...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface border-b border-border">
                  {['No', 'NISN', 'Nama Lengkap', 'Kelas', 'Jam Masuk', 'Status', 'Status Waktu', 'Status Pulang'].map((h) => (
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
                {attendances.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16">
                      <div className="flex flex-col items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-surface"
                        >
                          <HiOutlineCalendar className="w-5 h-5 text-text-muted" />
                        </div>
                        <p className="text-text-muted text-sm">Belum ada siswa yang absen hari ini</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  attendances.map((att, i) => (
                    <tr
                      key={att.id}
                      className={`border-b border-border transition-colors ${i % 2 === 0 ? 'bg-surface-light' : 'bg-surface/30'}`}
                    >
                      <td className="px-5 py-3.5 text-sm text-text-muted">{i + 1}</td>
                      <td className="px-5 py-3.5 text-sm text-text-secondary font-mono">{att.nisn}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-text-primary">{att.nama_lengkap}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold bg-info/10 text-info"
                        >
                          {att.kelas}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-text-secondary font-mono">{att.jam_masuk}</td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={att.status} />
                      </td>
                      <td className="px-5 py-3.5">
                        <TimeStatusBadge statusWaktu={att.status_waktu} />
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col gap-2">
                          <ReturnStatusBadge statusPulang={att.status_pulang} />
                          {att.status_pulang === 'Masih di Sekolah' && (
                            <button
                              type="button"
                              className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
                              disabled={actionLoading === att.id}
                              onClick={() => handleMarkPulang(att.id)}
                            >
                              {actionLoading === att.id ? 'Memproses...' : 'Tandai Pulang'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {attendances.length > 0 && (
              <div
                className="px-5 py-3 flex items-center justify-between border-t border-border bg-surface/50"
              >
                <p className="text-xs text-text-muted">
                  Menampilkan <span className="font-medium text-text-primary">{attendances.length}</span> catatan
                </p>
                <p className="text-xs text-text-muted">
                  Diperbarui:{' '}
                  <span className="font-medium text-text-primary">
                    {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

export default AttendancePage;