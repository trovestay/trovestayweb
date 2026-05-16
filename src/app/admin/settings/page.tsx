'use client';

import { useState, useEffect } from 'react';
import { Download, MonitorSmartphone, Bell, Shield } from 'lucide-react';
import styles from './settings.module.css';

export default function AdminSettings() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const [pushEnabled, setPushEnabled] = useState(false);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setIsInstallable(false);
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Settings</h1>
      </div>

      <div className={styles.settingsGroup}>
        <h2 className={styles.groupTitle}>APPLICATION</h2>
        <div className={styles.groupCard}>
          
          <div className={styles.settingRow}>
            <div className={styles.settingIcon} style={{ background: '#007AFF' }}>
              <MonitorSmartphone size={18} color="#fff" />
            </div>
            <div className={styles.settingInfo}>
              <h3>Install App (PWA)</h3>
            </div>
            <button 
              className={styles.textBtn} 
              onClick={handleInstallClick}
              disabled={!isInstallable}
            >
              {isInstallable ? 'Install' : 'Installed'}
            </button>
          </div>

          <div className={styles.settingRow}>
            <div className={styles.settingIcon} style={{ background: '#FF3B30' }}>
              <Bell size={18} color="#fff" />
            </div>
            <div className={styles.settingInfo}>
              <h3>Push Notifications</h3>
            </div>
            <label className={styles.toggleSwitch}>
              <input 
                type="checkbox" 
                checked={pushEnabled} 
                onChange={(e) => setPushEnabled(e.target.checked)} 
              />
              <span className={styles.slider}></span>
            </label>
          </div>

        </div>
      </div>

      <div className={styles.settingsGroup}>
        <h2 className={styles.groupTitle}>SECURITY</h2>
        <div className={styles.groupCard}>
          
          <div className={styles.settingRow}>
            <div className={styles.settingIcon} style={{ background: '#8E8E93' }}>
              <Shield size={18} color="#fff" />
            </div>
            <div className={styles.settingInfo}>
              <h3>Password</h3>
            </div>
            <button className={styles.textBtn}>Change</button>
          </div>

        </div>
      </div>
    </div>
  );
}
