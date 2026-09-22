import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  ShieldAlert, 
  PlusCircle, 
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Logo } from '../components/ui/Logo.tsx';
import { Button } from '../components/ui/Button.tsx';
import { authService, notificationService } from '../services/store.ts';
import { User, AppNotification } from '../types.ts';

export const AdminLayout: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(authService.getCurrentUser());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(notificationService.getAll());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      navigate('/login?role=admin', { replace: true });
    }
    setCurrentUser(user);

    const updateHandler = () => {
      setCurrentUser(authService.getCurrentUser());
      setNotifications(notificationService.getAll());
    };
    window.addEventListener('bodyhub_storage_updated', updateHandler);
    return () => window.removeEventListener('bodyhub_storage_updated', updateHandler);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login?role=admin');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Members', path: '/admin/members', icon: Users },
    { name: 'Memberships', path: '/admin/memberships', icon: ShieldAlert },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Feedback', path: '/admin/feedback', icon: MessageSquare },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex bg-[#080A0A] text-[#F4F6F3]">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar (260px) */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#111414] border-r border-white/10 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
          <Logo to="/admin/dashboard" showTagline={false} size="md" />
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-[#9CA39D] hover:text-[#F4F6F3] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Role Pill */}
        <div className="px-6 py-3 border-b border-white/5 bg-[#181C1C]/50 flex items-center justify-between text-xs">
          <span className="font-semibold text-[#B7FF3C] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C] animate-pulse" />
            Admin Portal
          </span>
          <span className="text-[#9CA39D] text-[11px]">v1.0 (Live)</span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#181C1C] text-[#B7FF3C] border border-[#B7FF3C]/30 shadow-sm'
                    : 'text-[#9CA39D] hover:text-[#F4F6F3] hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#B7FF3C]' : 'text-[#9CA39D]'}`} />
                <span>{item.name}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />}
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Public Website Link */}
        <div className="px-4 py-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#9CA39D] hover:text-[#F4F6F3] bg-[#181C1C] rounded-lg border border-white/5 hover:border-white/10 transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Sidebar Footer: Admin Profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-[#181C1C]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#B7FF3C]/10 border border-[#B7FF3C]/30 flex items-center justify-center font-bold text-[#B7FF3C] text-sm shrink-0">
                AD
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#F4F6F3] truncate">Admin User</p>
                <p className="text-[11px] text-[#9CA39D] truncate">admin@bodyhub.in</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-[#9CA39D] hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-[#111414] border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-[#9CA39D] hover:text-[#F4F6F3] rounded-lg border border-white/10"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#9CA39D]">
              <span className="font-semibold text-[#F4F6F3]">BODY HUB ADMIN</span>
              <span>/</span>
              <span className="capitalize">{location.pathname.split('/')[2] || 'Dashboard'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/admin/members/new">
              <Button variant="primary" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
                <span className="hidden sm:inline">Add Member</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </Link>

            {/* Notifications Popover Toggle */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-[#9CA39D] hover:text-[#F4F6F3] bg-[#181C1C] border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B7FF3C] text-[#080A0A] font-extrabold text-[9px] flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#181C1C] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h4 className="text-sm font-bold text-[#F4F6F3]">Activity Notifications</h4>
                    <span className="text-xs text-[#9CA39D]">{unreadCount} unread</span>
                  </div>
                  <div className="py-2 max-h-72 overflow-y-auto space-y-2">
                    {notifications.slice(0, 6).map(n => (
                      <div 
                        key={n.id}
                        className={`p-2.5 rounded-lg text-xs border ${
                          n.read ? 'bg-[#111414] border-transparent text-[#9CA39D]' : 'bg-[#202525] border-white/5 text-[#F4F6F3]'
                        }`}
                      >
                        <div className="font-semibold text-[#F4F6F3] flex items-center justify-between">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-[#9CA39D]">{n.createdAt.split('T')[0]}</span>
                        </div>
                        <p className="mt-1 text-[#9CA39D] leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
