import { NavLink } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineClipboardList,
  HiOutlineLogout,
  HiOutlineSpeakerphone,
  HiOutlineDocumentText,
  HiOutlineSun,
  HiOutlineMoon,
} from 'react-icons/hi';

const menuItems = [
  { to: '/',              icon: HiOutlineHome,          label: 'Dashboard' },
  { to: '/students',      icon: HiOutlineUsers,         label: 'Data Siswa' },
  { to: '/attendance',    icon: HiOutlineClipboardList, label: 'Rekap Absensi' },
  { to: '/leaves',        icon: HiOutlineDocumentText,  label: 'Pengajuan Izin' },
  { to: '/announcements', icon: HiOutlineSpeakerphone,  label: 'Pengumuman' },
];

function Sidebar({ admin, onLogout, isDarkMode, toggleDarkMode }) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-60 flex flex-col z-50 bg-surface-light border-r border-border transition-colors duration-300"
    >
      {/* Brand */}
      <div className="px-5 py-5 border-b border-border-subtle">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-base flex-shrink-0 bg-primary"
            >
              P
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary leading-tight">
                Presensi Ku
              </p>
              <p className="text-xs text-text-muted">
                Admin Panel
              </p>
            </div>
          </div>
          
          {/* Toggle Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-surface hover:bg-border-subtle text-text-secondary transition-all"
            title={isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
          >
            {isDarkMode ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
          Menu
        </p>
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`
            }
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-border-subtle pt-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-2 bg-surface">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 bg-primary-light">
            {admin?.username?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate leading-tight">
              {admin?.username || 'Admin'}
            </p>
            <p className="text-xs text-text-muted leading-tight">
              Administrator
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-danger hover:bg-danger/10 transition-all duration-150"
        >
          <HiOutlineLogout className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;