// PWA Installation & Management Logic for [Your Gym]

let deferredPrompt;
let isInstalled = false;

// Check if the app is already installed
window.addEventListener('load', () => {
  // Check if running as standalone (installed app)
  if (window.navigator.standalone === true) {
    isInstalled = true;
    console.log('[PWA] App is running as installed standalone app');
  }

  // Check if display mode is standalone
  if (window.matchMedia('(display-mode: standalone)').matches) {
    isInstalled = true;
    console.log('[PWA] Display mode is standalone');
  }

  updateInstallButtonUI();
  registerServiceWorker();
});

// Capture the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  console.log('[PWA] beforeinstallprompt captured');
  updateInstallButtonUI();
});

// Handle app installed event
window.addEventListener('appinstalled', () => {
  isInstalled = true;
  deferredPrompt = null;
  console.log('[PWA] App installed successfully');
  updateInstallButtonUI();
  showInstallSuccess();
});

// Register Service Worker
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registered successfully:', registration);

        // Check for updates periodically
        setInterval(() => {
          registration.update().catch((error) => {
            console.warn('[PWA] Service Worker update check failed:', error);
          });
        }, 60000); // Check every minute

        // Listen for new service worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] New service worker available');
              // Prompt user about update
              showUpdateNotification(registration);
            }
          });
        });
      })
      .catch((error) => {
        console.error('[PWA] Service Worker registration failed:', error);
      });
  }
}

// Update install button visibility and state
function updateInstallButtonUI() {
  const installBtn = document.getElementById('pwa-install-btn');
  
  if (!installBtn) return;

  if (isInstalled) {
    // Hide button if app is installed
    installBtn.style.display = 'none';
    console.log('[PWA] Install button hidden - app already installed');
  } else if (deferredPrompt) {
    // Show button if can install
    installBtn.style.display = 'block';
    installBtn.disabled = false;
    console.log('[PWA] Install button shown - ready to install');
  } else {
    // Hide button if can't install (browser doesn't support or already installed)
    installBtn.style.display = 'none';
  }
}

// Handle install button click
window.installApp = function() {
  console.log('[PWA] Install button clicked');

  if (!deferredPrompt) {
    showNotification('App Installation', 'Installation is not available. Please try again later.', 'warning');
    return;
  }

  // Show install prompt
  deferredPrompt.prompt();
  
  // Wait for user choice
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('[PWA] User accepted install prompt');
      showNotification('Success', 'App installation initiated. Check your home screen!', 'success');
      isInstalled = true;
    } else {
      console.log('[PWA] User dismissed install prompt');
      showNotification('Cancelled', 'App installation cancelled.', 'info');
    }
    deferredPrompt = null;
    updateInstallButtonUI();
  });
};

// Show installation success notification
function showInstallSuccess() {
  showNotification('App Installed', '[Your Gym] is now available offline! You can access it anytime.', 'success');
  console.log('[PWA] Installation success notification shown');
}

// Show update notification
function showUpdateNotification(registration) {
  showNotification(
    'App Update Available',
    'A new version of [Your Gym] is available. Refresh the page to update.',
    'info',
    true,
    () => {
      registration.installing.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  );
}

// Unified notification system using Toastify
function showNotification(title, message, type = 'info', showAction = false, actionCallback = null) {
  if (typeof Toastify !== 'undefined') {
    const bgColor = {
      success: 'linear-gradient(135deg, #25d366 0%, #20ba5a 100%)',
      error: 'linear-gradient(135deg, #ff006e 0%, #fb5607 100%)',
      info: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
      warning: 'linear-gradient(135deg, #ffb800 0%, #ff9500 100%)'
    };

    const toastMessage = `<strong>${title}</strong><br>${message}`;

    const toastConfig = {
      text: toastMessage,
      duration: 5000,
      gravity: 'top',
      position: 'center',
      backgroundColor: bgColor[type] || bgColor.info,
      className: 'pwa-notification',
      stopOnFocus: true,
      close: true,
      escapeMarkup: false
    };

    if (showAction && actionCallback) {
      toastConfig.onClick = actionCallback;
    }

    Toastify(toastConfig).showToast();
  } else {
    // Fallback to alert
    alert(`${title}\n${message}`);
  }
}

// Check if running on HTTPS (required for PWA)
window.addEventListener('load', () => {
  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
    console.warn('[PWA] PWA requires HTTPS. Current protocol:', window.location.protocol);
  }
});

// Handle connectivity changes
window.addEventListener('online', () => {
  console.log('[PWA] App is online');
  showNotification('Connection', 'You are back online!', 'success');
});

window.addEventListener('offline', () => {
  console.log('[PWA] App is offline');
  showNotification('Offline Mode', 'You are offline. Cached content is available.', 'warning');
});

// Check online status on load
window.addEventListener('load', () => {
  if (!navigator.onLine) {
    console.log('[PWA] Starting in offline mode');
    showNotification('Offline Mode', 'You are currently offline. Viewing cached content.', 'warning');
  }
});

// API to check if app is installed
window.isPWAInstalled = function() {
  return isInstalled;
};

// API to check if installation is available
window.canInstallPWA = function() {
  return !!deferredPrompt;
};

console.log('[PWA] Installation script loaded successfully');
