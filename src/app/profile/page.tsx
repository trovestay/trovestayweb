'use client';

import { useState } from 'react';
import { usePWA } from '../../components/PWAProvider';
import { User, Download, LogOut, ChevronRight, Home, Smartphone, Apple, Compass, Heart, Share, PlusSquare, X, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import styles from './Profile.module.css';
export default function ProfilePage() {
  const { canInstall, installPWA } = usePWA();
  const isInstalled = false; // Mocked as true if window.matchMedia('(display-mode: standalone)').matches
  const [showIosGuide, setShowIosGuide] = useState(false);

  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  if (!loading && !user) {
    router.push('/login');
    return null;
  }

  const userMetadata = user?.user_metadata || {};
  const avatarUrl = userMetadata.avatar_url || userMetadata.picture;
  const fullName = userMetadata.full_name || userMetadata.name || (user?.email?.split('@')[0] || 'User');
  const handleDownloadClick = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIOS && !isInstalled) {
      setShowIosGuide(true);
    } else if (canInstall) {
      installPWA();
    } else if (isInstalled) {
      alert("Trovestay App is already installed!");
    } else {
      alert("App installation is not supported on this browser.");
    }
  };

  return (
    <div className={styles.profileContainer}>
      <header className={styles.profileHeader}>
        <Link href="/" className={styles.returnBtn}>
           <ArrowLeft size={20} color="#111" />
        </Link>
        <div className={styles.avatarContainerLarge}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="Profile" className={styles.avatarLarge} />
          ) : (
            <User size={48} color="#111" />
          )}
        </div>
        <h1 className={styles.userName}>{fullName}</h1>
        <p className={styles.userEmail}>{user?.email}</p>
      </header>

      <div className={styles.profileContent}>

      <section className={styles.pwaSection}>
        <div className={styles.pwaCard}>
          <div className={styles.pwaCardHeader}>
            <div className={styles.pwaIconBox}>
              <Smartphone size={24} color="#111" />
            </div>
            <div className={styles.pwaText}>
              <h3>Get the TroveStay App</h3>
              <p>Install our app for a faster, native experience.</p>
            </div>
          </div>
          <div className={styles.installBtnGroup}>
            <button className={styles.installBtn} onClick={handleDownloadClick}>
              <Download size={18} />
              <span>Download App</span>
            </button>
          </div>
        </div>
      </section>

      <main className={styles.menuList}>
        <Link href="/list-property" className={styles.menuItem}>
          <div className={styles.menuIcon}><Home size={20} color="#111" /></div>
          <span className={styles.menuText}>List Your Property</span>
          <ChevronRight size={20} color="#C7C7CC" />
        </Link>
        

        
        <button 
          className={styles.logoutBtn} 
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/login');
          }}
        >
          <LogOut size={20} color="#FF3B30" />
          <span>Log Out</span>
        </button>
      </main>
      </div>

      {/* iOS PWA Install Guide Modal */}
      {showIosGuide && (
        <div className={styles.iosModalOverlay} onClick={() => setShowIosGuide(false)}>
          <div className={styles.iosModalSheet} onClick={e => e.stopPropagation()}>
            <div className={styles.iosModalHeader}>
              <h3>Install on iOS</h3>
              <button className={styles.closeModalBtn} onClick={() => setShowIosGuide(false)}>
                <X size={18} color="#666" />
              </button>
            </div>
            <div className={styles.iosSteps}>
              <div className={styles.iosStep}>
                <div className={styles.iosStepIcon}>
                  <Share size={20} color="#007AFF" />
                </div>
                <p>1. Tap the <strong>Share</strong> button at the bottom of Safari.</p>
              </div>
              <div className={styles.iosStep}>
                <div className={styles.iosStepIcon}>
                  <PlusSquare size={20} color="#111" />
                </div>
                <p>2. Scroll down and tap <strong>Add to Home Screen</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
