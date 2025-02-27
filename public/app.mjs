const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };
  
  // …
  
  registerServiceWorker();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/");
  }

  const cacheName = "js13kPWA-v1";
  const appShellFiles = [];
  const gamesImages = [];
  for (let i = 0; i < games.length; i++) {
    gamesImages.push(`data/img/${games[i].slug}.jpg`);
  }
  const contentToCache = appShellFiles.concat(gamesImages);

  self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil(
      (async () => {
        const cache = await caches.open(cacheName);
        console.log("[Service Worker] Caching all: app shell and content");
        await cache.addAll(contentToCache);
      })(),
    );
  });