// ============================================================
// StudentsPage — CRUD Data Siswa (Redesigned: Light SaaS)
// GET /api/students | POST /api/students
// PUT /api/students/:id | DELETE /api/students/:id
// ============================================================

import { useState, useEffect } from 'react';
import {
  HiOutlinePlus, HiOutlinePencil, HiOutlineTrash,
  HiOutlineX, HiOutlineSearch, HiOutlineAcademicCap,
} from 'react-icons/hi';
import API from '../api';

const font = "'Plus Jakarta Sans', sans-serif";

const getInitials = (name = '') =>
  name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

const avatarPalette = ['#3B82F6','#10B981','#F59E0B','#EF4444','#8B5CF6','#06B6D4'];
const getAvatarColor = (name = '') => avatarPalette[name.charCodeAt(0) % avatarPalette.length];

const Card = ({ children, className = '', style = {} }) => (
  <div
    className={`card ${className}`}
    style={{ ...style }}
  >
    {children}
  </div>
);

const InputField = ({ label, hint, ...props }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide">
      {label}
      {hint && <span className="ml-2 text-text-muted font-normal normal-case text-xs">{hint}</span>}
    </label>
    <input
      {...props}
      className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-surface-light border border-border text-text-primary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
    />
  </div>
);

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ nisn: '', password: '', nama_lengkap: '', kelas: '' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/students');
      if (res.data.success) setStudents(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setForm({ nisn: '', password: '', nama_lengkap: '', kelas: '' });
    setEditMode(false); setEditId(null); setFormError(''); setShowModal(true);
  };

  const openEditModal = (student) => {
    setForm({ nisn: student.nisn, password: '', nama_lengkap: student.nama_lengkap, kelas: student.kelas });
    setEditMode(true); setEditId(student.id); setFormError(''); setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(''); setFormLoading(true);
    try {
      if (editMode) {
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        await API.put(`/api/students/${editId}`, payload);
      } else {
        if (!form.password) { setFormError('Password wajib diisi untuk siswa baru'); setFormLoading(false); return; }
        await API.post('/api/students', form);
      }
      setShowModal(false);
      fetchStudents();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/students/${id}`);
      setDeleteTarget(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = students.filter(
    (s) =>
      s.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
      s.nisn.includes(search) ||
      s.kelas.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary" style={{ letterSpacing: '-0.3px' }}>
            Data Siswa
          </h1>
          <p className="text-text-muted text-sm mt-0.5 flex items-center gap-1.5">
            <HiOutlineAcademicCap className="w-4 h-4" />
            {students.length} siswa terdaftar
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-all active:scale-[0.99]"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Tambah Siswa
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <HiOutlineSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama, NISN, atau kelas..."
          className="w-full pl-10 pr-4 py-2 rounded-lg text-sm bg-surface-light border border-border text-text-primary outline-none focus:border-primary transition-all"
        />
        {search && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted"
          >
            {filtered.length} hasil
          </span>
        )}
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg className="animate-spin w-6 h-6 text-slate-300" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <p className="text-slate-400 text-sm">Memuat data siswa...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface border-b border-border">
                  {['No', 'Siswa', 'NISN', 'Kelas', 'Aksi'].map((h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted ${i === 4 ? 'text-center' : 'text-left'}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16">
                      <p className="text-slate-400 text-sm">
                        {search ? 'Tidak ada siswa yang sesuai pencarian' : 'Belum ada data siswa'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((student, i) => (
                    <tr
                      key={student.id}
                      className={`border-b border-border transition-colors ${i % 2 === 0 ? 'bg-surface-light' : 'bg-surface/30'}`}
                    >
                      <td className="px-5 py-3.5 text-sm text-text-muted">{i + 1}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: getAvatarColor(student.nama_lengkap) }}
                          >
                            {getInitials(student.nama_lengkap)}
                          </div>
                          <span className="text-sm font-semibold text-text-primary">{student.nama_lengkap}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-text-secondary font-mono">{student.nisn}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info/10 text-info"
                        >
                          {student.kelas}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => openEditModal(student)}
                            className="p-2 rounded-lg text-text-muted hover:text-warning hover:bg-warning/10 transition-all"
                            title="Edit"
                          >
                            <HiOutlinePencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(student)}
                            className="p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-all"
                            title="Hapus"
                          >
                            <HiOutlineTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {filtered.length > 0 && (
              <div
                className="px-5 py-3 flex items-center justify-between border-t border-border bg-surface/50"
              >
                <p className="text-xs text-text-muted">
                  Menampilkan <span className="font-medium text-text-primary">{filtered.length}</span> dari{' '}
                  <span className="font-medium text-text-primary">{students.length}</span> siswa
                </p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Modal: Tambah / Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-primary-dark/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div
            className="relative w-full max-w-md rounded-2xl bg-surface-light p-6 shadow-xl border border-border"
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-text-primary">
                  {editMode ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}
                </h3>
                <p className="text-text-muted text-xs mt-0.5">
                  {editMode ? 'Perbarui informasi siswa' : 'Isi data siswa di bawah ini'}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface transition-all"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 px-4 py-3 rounded-lg text-sm flex items-start gap-2 bg-danger/10 border border-danger/20 text-danger">
                <span className="font-bold flex-shrink-0">!</span>
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="NISN"
                type="text"
                value={form.nisn}
                onChange={(e) => setForm({ ...form, nisn: e.target.value })}
                placeholder="Nomor Induk Siswa Nasional"
                required
              />
              <InputField
                label="Password"
                hint={editMode ? '(kosongkan jika tidak diubah)' : undefined}
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required={!editMode}
              />
              <InputField
                label="Nama Lengkap"
                type="text"
                value={form.nama_lengkap}
                onChange={(e) => setForm({ ...form, nama_lengkap: e.target.value })}
                placeholder="Nama lengkap sesuai akta"
                required
              />
              <InputField
                label="Kelas"
                type="text"
                value={form.kelas}
                onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                placeholder="cth: XII-IPA-1"
                required
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface border border-border transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-all disabled:opacity-50"
                >
                  {formLoading ? 'Menyimpan...' : editMode ? 'Simpan Perubahan' : 'Tambah Siswa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Konfirmasi Hapus */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-primary-dark/40 backdrop-blur-sm"
            onClick={() => setDeleteTarget(null)}
          />
          <div
            className="relative w-full max-w-sm rounded-2xl bg-surface-light p-6 shadow-xl border border-border"
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-danger/10"
              >
                <HiOutlineTrash className="w-5 h-5 text-danger" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary">Hapus Siswa?</h3>
                <p className="text-text-muted text-xs">Tindakan ini tidak dapat dibatalkan</p>
              </div>
            </div>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              Anda akan menghapus{' '}
              <span className="font-semibold text-text-primary">{deleteTarget.nama_lengkap}</span>.
              Semua data absensi siswa ini juga akan terhapus permanen.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface border border-border transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteTarget.id)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white bg-danger hover:bg-danger/80 transition-all"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentsPage;