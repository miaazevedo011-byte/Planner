import { useState, useEffect, useCallback } from 'react';
import { APP_VERSION } from '../constants/version';

const STORAGE_KEY_VERSION = 'personal_finance_app_version';
const STORAGE_KEY_SHOW_WHATS_NEW = 'personal_finance_show_whats_new';

export function useAppUpdate() {
  const [hasUpdate, setHasUpdate] = useState<boolean>(false);
  const [availableVersion, setAvailableVersion] = useState<string>(APP_VERSION);
  const [isWhatsNewOpen, setIsWhatsNewOpen] = useState<boolean>(false);

  // Check on mount if user just updated and needs to see the "Novidades" modal
  useEffect(() => {
    try {
      const showWhatsNew = localStorage.getItem(STORAGE_KEY_SHOW_WHATS_NEW);
      if (showWhatsNew === 'true') {
        localStorage.removeItem(STORAGE_KEY_SHOW_WHATS_NEW);
        setIsWhatsNewOpen(true);
      }

      const storedVersion = localStorage.getItem(STORAGE_KEY_VERSION);
      // If no version is stored yet, or stored version differs from current APP_VERSION,
      // trigger the update notification so the user can experience the update flow!
      if (!storedVersion || storedVersion !== APP_VERSION) {
        setHasUpdate(true);
        setAvailableVersion(APP_VERSION);
      }
    } catch (e) {
      console.error('Error checking stored version:', e);
    }
  }, []);

  // Poll server for updates periodically and on window focus
  const checkServerVersion = useCallback(async () => {
    try {
      const res = await fetch(`/api/version?_t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        const serverVer = data.version;
        const storedVersion = localStorage.getItem(STORAGE_KEY_VERSION);

        // If server version is different from stored version or if stored version is older
        if (serverVer && storedVersion && storedVersion !== serverVer) {
          setAvailableVersion(serverVer);
          setHasUpdate(true);
        }
      }
    } catch (e) {
      // Offline or network error; keep current state
    }
  }, []);

  useEffect(() => {
    // Check every 60 seconds
    const interval = setInterval(checkServerVersion, 60000);

    // Check when user returns to tab
    const handleFocus = () => {
      checkServerVersion();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [checkServerVersion]);

  // Perform the update: save current version, set flag for whats new, and reload page
  const applyUpdate = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VERSION, availableVersion || APP_VERSION);
      localStorage.setItem(STORAGE_KEY_SHOW_WHATS_NEW, 'true');
    } catch (e) {
      console.error('Error setting update flags in localStorage:', e);
    }

    // Force page reload to apply latest changes and show new features on the spot
    window.location.reload();
  }, [availableVersion]);

  // Simulate an update for testing
  const simulateUpdateNotification = useCallback(() => {
    setHasUpdate(true);
    setAvailableVersion(APP_VERSION);
  }, []);

  return {
    hasUpdate,
    availableVersion,
    isWhatsNewOpen,
    setIsWhatsNewOpen,
    applyUpdate,
    dismissUpdate: () => setHasUpdate(false),
    simulateUpdateNotification,
  };
}
