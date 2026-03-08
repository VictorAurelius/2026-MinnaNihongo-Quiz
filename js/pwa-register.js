/**
 * PWA Service Worker Registration
 */

if ('serviceWorker' in navigator) {
  let refreshing = false;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registered:', registration.scope);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute

        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('[PWA] New service worker installing...');

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker is ready to take over
              console.log('[PWA] New version available!');
              showUpdateNotification();
            }
          });
        });
      })
      .catch((error) => {
        console.log('[PWA] Service Worker registration failed:', error);
      });
  });

  // Handle service worker updates
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    console.log('[PWA] New service worker activated, reloading...');
    window.location.reload();
  });

  // Show update notification
  function showUpdateNotification() {
    // Create notification banner
    const banner = document.createElement('div');
    banner.id = 'update-banner';
    banner.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #0071e3, #5856d6);
        color: white;
        padding: 12px 16px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        animation: slideDown 0.3s ease;
      ">
        <div style="display: flex; align-items: center; justify-content: center; gap: 16px; max-width: 600px; margin: 0 auto;">
          <span style="flex: 1; font-size: 14px; font-weight: 500;">
            🎉 Có phiên bản mới! Nhấn để cập nhật ngay.
          </span>
          <button id="update-reload-btn" style="
            background: white;
            color: #0071e3;
            border: none;
            padding: 8px 20px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            font-size: 14px;
            white-space: nowrap;
          ">
            Cập nhật
          </button>
          <button id="update-dismiss-btn" style="
            background: transparent;
            color: white;
            border: 1px solid rgba(255,255,255,0.5);
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            font-size: 14px;
            white-space: nowrap;
          ">
            Để sau
          </button>
        </div>
      </div>
      <style>
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
      </style>
    `;

    document.body.appendChild(banner);

    // Reload button
    document.getElementById('update-reload-btn').addEventListener('click', () => {
      // Skip waiting and reload
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    });

    // Dismiss button
    document.getElementById('update-dismiss-btn').addEventListener('click', () => {
      banner.remove();
    });
  }
}

// Install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('[PWA] Install prompt available');
  // Prevent the default prompt
  e.preventDefault();
  // Store the event for later use
  deferredPrompt = e;

  // Show custom install button (if you create one)
  const installBtn = document.getElementById('install-btn');
  if (installBtn) {
    installBtn.classList.remove('hidden');
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;

      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for user response
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`[PWA] User choice: ${outcome}`);

      // Reset deferred prompt
      deferredPrompt = null;
      installBtn.classList.add('hidden');
    });
  }
});

// Log when app is installed
window.addEventListener('appinstalled', () => {
  console.log('[PWA] App installed successfully');
  deferredPrompt = null;
});
