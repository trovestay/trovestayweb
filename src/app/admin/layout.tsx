'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  ChevronRight,
  Search,
  FileText,
} from 'lucide-react';
import styles from './admin.module.css';

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/properties', label: 'Properties', icon: Building2 },
  { href: '/admin/blogs', label: 'Blog', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/admin/properties?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className={styles.adminRoot}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarInner}>
          {/* Logo */}
          <div className={styles.sidebarLogo}>
            <div className={styles.logoMark}>T</div>
            <span className={styles.logoText}>TROVE STAY</span>
            <button
              className={styles.closeSidebarBtn}
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className={styles.sidebarNav}>
            <span className={styles.navLabel}>Main Menu</span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  {active && <ChevronRight size={16} className={styles.navChevron} />}
                </Link>
              );
            })}
          </nav>

          {/* Bottom user section */}
          <div className={styles.sidebarFooter}>
            <div className={styles.userCard}>
              <img
                src="/placeholder.jpg"
                alt="Admin"
                className={styles.userAvatar}
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>Alex Admin</span>
                <span className={styles.userRole}>Property Manager</span>
              </div>
            </div>
            <Link href="/" className={styles.logoutBtn}>
              <LogOut size={18} />
              <span>Exit Admin</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className={styles.mainArea}>
        {/* Top header bar */}
        <header className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <button
              className={styles.hamburgerBtn}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className={styles.topSearchWrapper}>
              <Search size={16} className={styles.topSearchIcon} />
              <input
                type="text"
                placeholder="Search anything..."
                className={styles.topSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          <div className={styles.topBarRight}>
            <button className={styles.topNotifBtn}>
              <Bell size={20} />
              <span className={styles.topNotifDot} />
            </button>
            <img
              src="/placeholder.jpg"
              alt="Admin"
              className={styles.topAvatar}
            />
          </div>
        </header>

        {/* Page content */}
        <div className={styles.pageContent}>{children}</div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className={styles.mobileBottomNav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.bottomNavItem} ${active ? styles.bottomNavItemActive : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
