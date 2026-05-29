'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Heart, User, Search, SlidersHorizontal, ChevronDown, Bell, MapPin, Bookmark, Globe } from 'lucide-react';
import styles from './Navigation.module.css';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import type { Currency } from '../context/AppContext';
import type { Language } from '../i18n/translations';

const Navigation = () => {
  const pathname = usePathname();
  const { language, setLanguage, currency, setCurrency, t } = useAppContext();
  const { user } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className={styles.navContainer}>
      
      {/* Mobile Top App Bar removed per user request for sub-pages */}

      {/* Desktop Sticky Header with Central Search Pill */}
      <header className={`${styles.desktopHeader} ${isScrolled ? styles.desktopHeaderScrolled : ''}`}>
        <div className={`container ${styles.desktopInner}`}>
          <div className={styles.headerLeftDesktop}>
             {user ? (
               <Link href="/profile" className={styles.avatarLink}>
                 <div className={styles.topAvatarDesktopContainer}>
                   <User size={20} color="#111" />
                 </div>
               </Link>
             ) : (
               <Link href="/login" className={styles.avatarLink}>
                 <div className={styles.topAvatarDesktopContainer}>
                   <User size={20} color="#111" />
                 </div>
               </Link>
             )}
             <div className={styles.greetingBlockDesktop}>
                <h2 className={styles.greetingTitleDesktop}>{mounted ? getGreeting() : 'Welcome'}, {user ? user.email?.split('@')[0] || 'User' : 'Guest'}</h2>
                {pathname === '/' && (
                  <div className={styles.locationPillDarkDesktop}>
                      <MapPin size={12} color="#D4F721" />
                      <span>Bali, Indonesia</span>
                  </div>
                )}
             </div>
          </div>
          
          <div className={styles.searchPill}>
             <div className={styles.searchCategory} style={{ position: 'relative' }}>
                <select className={styles.dropdown} defaultValue="monthly" style={{ fontSize: '0.9rem', fontWeight: 600, paddingRight: '1rem' }}>
                   <option value="monthly">Monthly</option>
                   <option value="yearly">Yearly</option>
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: 0, pointerEvents: 'none' }} />
             </div>
             <input type="text" placeholder="Search spaces..." className={styles.searchInput} style={{marginLeft: '1rem'}} />
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginRight: '0.75rem' }}>
               <Link href="/locations" title="View Map" className={styles.iconActionBtn}>
                 <MapPin size={20} strokeWidth={2.25} />
               </Link>
               <Link href="/saved" title="Saved Properties" className={styles.iconActionBtn}>
                 <Bookmark size={20} strokeWidth={2.25} />
               </Link>
             </div>

             <button className={styles.filterBtn}>
                <Search size={20} strokeWidth={2.5} color="#111" />
             </button>
          </div>

          <div className={styles.desktopActions}>
             <Link href="/contact" className={styles.darkBtn}>{t('listProperty')}</Link>
             {pathname === '/' && (
               <div className={styles.selectorsWrapper}>
                 <div className={styles.selector}>
                   <Globe size={16} color="#111" />
                   <select className={styles.dropdown} value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
                     <option value="en">English</option>
                     <option value="id">Indonesian</option>
                     <option value="fr">French</option>
                     <option value="ru">Russian</option>
                     <option value="es">Spanish</option>
                   </select>
                 </div>
                 <div className={styles.selector}>
                   <select className={styles.dropdown} value={currency} onChange={(e) => setCurrency(e.target.value as Currency)}>
                     <option value="IDR">IDR</option>
                     <option value="USD">USD</option>
                     <option value="EUR">EUR</option>
                     <option value="GBP">GBP</option>
                   </select>
                 </div>
               </div>
             )}
          </div>
        </div>
      </header>

      {/* Mobile Floating Dock (Hidden on Property Details to prevent overlap) */}
      {!pathname.startsWith('/properties') && (
        <div className={styles.mobileDockWrapper}>
          <nav className={styles.mobileDock}>
          <Link href="/" className={`${styles.navItem} ${pathname === '/' ? styles.navItemActive : ''}`}>
             <div className={styles.iconWrapper}>
               <Home size={22} color={pathname === '/' ? "var(--color-primary)" : "#A0A0A5"} strokeWidth={pathname === '/' ? 2.5 : 2} />
             </div>
          </Link>
          <Link href="/locations" className={`${styles.navItem} ${pathname === '/locations' ? styles.navItemActive : ''}`}>
             <div className={styles.iconWrapper}>
               <Compass size={22} color={pathname === '/locations' ? "var(--color-primary)" : "#A0A0A5"} strokeWidth={pathname === '/locations' ? 2.5 : 2} />
             </div>
          </Link>
          <button 
            type="button"
            className={styles.searchDockBtn} 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.dispatchEvent(new Event('openAdvancedFilters'));
            }}
          >
             <Search size={24} color="var(--color-primary)" />
          </button>
          <Link href="/saved" className={`${styles.navItem} ${pathname === '/saved' ? styles.navItemActive : ''}`}>
             <div className={styles.iconWrapper}>
               <Bookmark size={22} color={pathname === '/saved' ? "var(--color-primary)" : "#A0A0A5"} strokeWidth={pathname === '/saved' ? 2.5 : 2} />
             </div>
          </Link>
          <Link href="/profile" className={`${styles.navItem} ${pathname === '/profile' ? styles.navItemActive : ''}`}>
             <div className={styles.iconWrapper}>
               <User size={22} color={pathname === '/profile' ? "var(--color-primary)" : "#A0A0A5"} strokeWidth={pathname === '/profile' ? 2.5 : 2} />
             </div>
          </Link>
        </nav>
      </div>
      )}
    </div>
  );
};

export default Navigation;
