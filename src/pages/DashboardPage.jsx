// ============================================================
// DashboardPage — Dashboard Visualisasi Data (Redesigned: Light SaaS)
// ============================================================

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  HiOutlineUsers, HiOutlineCheck, HiOutlineDocumentText,
  HiOutlineXCircle, HiOutlineRefresh, HiOutlineTrendingUp,
} from 'react-icons/hi';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend, ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import API from '../api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const font = "'Plus Jakarta Sans', sans-serif";

/* ── Shared Card ─────────────────────────────────────────── */
const Card = ({ children, className = '', style = {} }) => (
  <div
    className={`card ${className}`}
    style={{ ...style }}
  >
    {children}
  </div>
);

function DashboardPage() {
  const [qrToken, setQrToken] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [stats, setStats] = useState({ totalSiswa: 0, hadir: 0, izin: 0, alpa: 0 });
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [monthlyRecap, setMonthlyRecap] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [qrRes, attendanceRes, studentsRes, statsRes, recapRes] = await Promise.all([
        API.get('/api/attendance/qr-today'),
        API.get('/api/attendances'),
        API.get('/api/students'),
        API.get('/api/stats/dashboard'),
        API.get('/api/reports/summary/monthly'),
      ]);
      if (qrRes.data.success) {
        setQrToken(qrRes.data.data.qr_token);
        setTanggal(qrRes.data.data.tanggal);
      }
      const totalSiswa = studentsRes.data.data?.length || 0;
      const attendances = attendanceRes.data.data?.attendances || [];
      const hadir = attendances.filter((a) => a.status === 'hadir').length;
      const izin  = attendances.filter((a) => a.status === 'izin' || a.status === 'sakit').length;
      const alpa  = Math.max(0, totalSiswa - hadir - izin);
      setStats({ totalSiswa, hadir, izin, alpa });
      if (statsRes.data.success) setWeeklyStats(statsRes.data.data);
      if (recapRes.data.success) setMonthlyRecap(recapRes.data.data.summary || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (type) => {
    const baseUrl = API.defaults.baseURL || '';
    window.open(`${baseUrl}/api/reports/export/${type}`, '_blank');
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const hadirPct = stats.totalSiswa > 0 ? Math.round((stats.hadir / stats.totalSiswa) * 100) : 0;

  const statCards = [
    {
      label: 'Total Siswa',
      value: stats.totalSiswa,
      icon: HiOutlineUsers,
      accent: '#3B82F6',
      accentBg: 'rgba(59, 130, 246, 0.1)',
      badge: 'Terdaftar',
    },
    {
      label: 'Hadir Hari Ini',
      value: stats.hadir,
      icon: HiOutlineCheck,
      accent: '#10B981',
      accentBg: 'rgba(16, 185, 129, 0.1)',
      badge: `${hadirPct}%`,
    },
    {
      label: 'Izin / Sakit',
      value: stats.izin,
      icon: HiOutlineDocumentText,
      accent: '#F59E0B',
      accentBg: 'rgba(245, 158, 11, 0.1)',
      badge: 'Diajukan',
    },
    {
      label: 'Tidak Hadir',
      value: stats.alpa,
      icon: HiOutlineXCircle,
      accent: '#EF4444',
      accentBg: 'rgba(239, 68, 68, 0.1)',
      badge: 'Alpa',
    },
  ];

  /* ── Chart data ─────────────────────────────────────────── */
  const processWeekly = () => {
    const weeks = [...new Set(weeklyStats.map((i) => i.minggu))].sort();
    return {
      labels: weeks.map((w) => `Minggu ${w}`),
      datasets: [
        {
          label: 'Hadir',
          data: weeks.map((w) => {
            const item = weeklyStats.find((i) => i.minggu === w && i.status === 'hadir');
            return item ? item.total : 0;
          }),
          backgroundColor: '#10B981',
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: 'Izin/Sakit',
          data: weeks.map((w) => {
            const i = weeklyStats.find((x) => x.minggu === w && x.status === 'izin');
            const s = weeklyStats.find((x) => x.minggu === w && x.status === 'sakit');
            return (i ? i.total : 0) + (s ? s.total : 0);
          }),
          backgroundColor: '#F59E0B',
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    };
  };

  const barData = processWeekly();

  const doughnutData = {
    labels: ['Hadir', 'Izin / Sakit', 'Alpa'],
    datasets: [{
      data: [stats.hadir, stats.izin, stats.alpa],
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
      borderColor: ['#fff', '#fff', '#fff'],
      borderWidth: 3,
      hoverOffset: 4,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#94A3B8', font: { size: 12, family: font }, padding: 20, usePointStyle: true },
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#fff',
        bodyColor: '#CBD5E1',
        padding: 10,
        cornerRadius: 8,
        titleFont: { family: font },
        bodyFont: { family: font },
      },
    },
    scales: {
      x: {
        ticks: { color: '#94A3B8', font: { size: 11, family: font } },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: { color: '#94A3B8', font: { size: 11, family: font } },
        grid: { color: 'rgba(148, 163, 184, 0.1)', drawBorder: false },
        border: { display: false },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#94A3B8', font: { size: 12, family: font }, padding: 16, usePointStyle: true },
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#fff',
        bodyColor: '#CBD5E1',
        padding: 10,
        cornerRadius: 8,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-6 h-6 text-slate-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <p className="text-slate-400 text-sm" style={{ fontFamily: font }}>Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10" style={{ fontFamily: font }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary" style={{ letterSpacing: '-0.3px' }}>
            Dashboard
          </h1>
          <p className="text-text-muted text-sm mt-0.5">{formatTanggal(tanggal) || 'Selamat datang'}</p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface border border-border transition-all"
        >
          <HiOutlineRefresh className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-[#475569] font-semibold">Export Excel</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => handleExport('today')}
              className="px-4 py-2 rounded-lg bg-[#1E293B] text-white text-sm font-medium hover:bg-[#111827] transition"
            >
              Hari Ini
            </button>
            <button
              onClick={() => handleExport('weekly')}
              className="px-4 py-2 rounded-lg bg-[#1E293B] text-white text-sm font-medium hover:bg-[#111827] transition"
            >
              Mingguan
            </button>
            <button
              onClick={() => handleExport('monthly')}
              className="px-4 py-2 rounded-lg bg-[#1E293B] text-white text-sm font-medium hover:bg-[#111827] transition"
            >
              Bulanan
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: card.accentBg }}
              >
                <card.icon className="w-4.5 h-4.5" style={{ color: card.accent, width: '18px', height: '18px' }} />
              </div>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: card.accentBg, color: card.accent }}
              >
                {card.badge}
              </span>
            </div>
            <p className="text-3xl font-extrabold text-text-primary leading-none mb-1">
              {card.value}
            </p>
            <p className="text-text-secondary text-sm">{card.label}</p>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Bar Chart */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-800">Tren Kehadiran Mingguan</h2>
              <p className="text-slate-400 text-xs mt-0.5">Hadir vs izin/sakit per minggu</p>
            </div>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface"
            >
              <HiOutlineTrendingUp className="w-4 h-4 text-text-muted" />
            </div>
          </div>
          <div style={{ height: '260px' }}>
            <Bar data={barData} options={chartOptions} />
          </div>
        </Card>

        {/* Doughnut */}
        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-800">Rasio Hari Ini</h2>
            <p className="text-slate-400 text-xs mt-0.5">Distribusi kehadiran</p>
          </div>
          <div className="relative" style={{ height: '220px' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ paddingBottom: '40px' }}
            >
              <div className="text-center">
                <p className="text-3xl font-extrabold text-text-primary">{hadirPct}%</p>
                <p className="text-text-muted text-xs">Hadir</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Monthly Recap */}
      <Card className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-800">Rekap Bulanan</h2>
            <p className="text-slate-400 text-xs mt-0.5">Ringkasan total status siswa bulan ini</p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#E2E8F0] text-[#1E293B] text-xs font-semibold">
            {monthlyRecap.length} siswa tercatat
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#1E293B] text-white text-xs uppercase tracking-[0.12em]">
                {['No', 'Nama', 'Hadir', 'Izin', 'Sakit', 'Alpa', '% Kehadiran'].map((column) => (
                  <th key={column} className="px-4 py-3 text-left font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyRecap.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-slate-500">
                    Belum ada data rekap bulanan untuk ditampilkan.
                  </td>
                </tr>
              ) : (
                monthlyRecap.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white'}
                  >
                    <td className="px-4 py-3 text-sm text-[#475569]">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium text-[#0F172A]">{item.nama_lengkap}</td>
                    <td className="px-4 py-3 text-sm text-[#047857]">{item.hadir}</td>
                    <td className="px-4 py-3 text-sm text-[#B45309]">{item.izin}</td>
                    <td className="px-4 py-3 text-sm text-[#C2410C]">{item.sakit}</td>
                    <td className="px-4 py-3 text-sm text-[#B91C1C]">{item.alpa}</td>
                    <td className="px-4 py-3 text-sm text-[#0F172A]">{item.kehadiran_pct}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* QR Code */}
      <div className="flex justify-center">
        <Card className="p-8 w-full max-w-md" style={{ border: '1px solid #E2E8F0' }}>
          <div className="text-center mb-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-surface text-text-secondary"
            >
              Scan untuk Absen
            </span>
            <h2 className="text-lg font-bold text-text-primary">QR Code Absensi Hari Ini</h2>
            <p className="text-text-muted text-sm mt-1">Tampilkan di layar untuk siswa scan</p>
          </div>

          <div className="flex justify-center mb-6">
            <div
              className="p-4 rounded-2xl bg-white border border-border shadow-lg"
            >
              <QRCodeSVG
                value={qrToken || 'NO_TOKEN'}
                size={220}
                level="H"
                includeMargin={false}
                bgColor="#ffffff"
                fgColor="#1E293B"
              />
            </div>
          </div>

          <div className="text-center">
            <p className="text-text-primary font-semibold text-sm">{formatTanggal(tanggal)}</p>
            <div
              className="mt-3 p-3 rounded-lg text-left bg-surface border border-border"
            >
              <p className="text-xs text-text-muted mb-1 font-medium uppercase tracking-wider">Token Aktif</p>
              <p className="text-xs text-text-secondary font-mono break-all leading-relaxed">{qrToken}</p>
            </div>
            <p className="text-xs text-text-muted mt-3">🔄 Token berganti otomatis setiap hari</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;