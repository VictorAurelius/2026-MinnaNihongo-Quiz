/**
 * PWA Service Worker Registration
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registered:', registration.scope);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
      })
      .catch((error) => {
        console.log('[PWA] Service Worker registration failed:', error);
      });
  });

  // Handle service worker updates
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('[PWA] New service worker activated, reloading...');
    window.location.reload();
  });
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
