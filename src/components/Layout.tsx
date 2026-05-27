import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { currentUser } from '@/data/mockData';

const navItems = [
  { path: '/', label: 'Главная', icon: 'LayoutDashboard' },
  { path: '/accounts', label: 'Счета', icon: 'Wallet' },
  { path: '/cards', label: 'Карты', icon: 'CreditCard' },
  { path: '/transfers', label: 'Переводы', icon: 'ArrowLeftRight' },
  { path: '/history', label: 'История', icon: 'History' },
  { path: '/support', label: 'Поддержка', icon: 'MessageCircle' },
  { path: '/profile', label: 'Профиль', icon: 'Settings' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-mesh flex">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-border fixed h-full z-20">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
          <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center">
            <span className="text-white font-bold text-sm">А4</span>
          </div>
          <div>
            <p className="font-bold text-foreground leading-none">Банк Ари 4</p>
            <p className="text-xs text-muted-foreground mt-0.5">Интернет-банк</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'active text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* User */}
        <NavLink
          to="/profile"
          className="flex items-center gap-3 px-4 py-4 border-t border-border hover:bg-secondary transition-colors"
        >
          <div className="w-9 h-9 rounded-full btn-gradient flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {currentUser.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground">{currentUser.status}</p>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse-glow flex-shrink-0" />
        </NavLink>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-sidebar border-b border-border px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
            <span className="text-white font-bold text-xs">А4</span>
          </div>
          <span className="font-bold text-foreground">Банк Ари 4</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} />
        </button>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-border flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
              <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">А4</span>
              </div>
              <div>
                <p className="font-bold text-foreground leading-none">Банк Ари 4</p>
                <p className="text-xs text-muted-foreground mt-0.5">Интернет-банк</p>
              </div>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'active text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={item.icon} size={18} />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8 max-w-6xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
