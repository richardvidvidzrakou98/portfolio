/* ==========================================
   SERVICE WORKER
   Caches static assets for better performance
   ========================================== */

const CACHE_NAME = "portfolio-v2.0.0";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/css/main.css",
  "/css/components.css",
  "/css/animations.css",
  "/js/config.js",
  "/js/main.js",
  "/js/templates.js",
  "/js/projects.js",
  "/js/animations.js",
  "/pages/presentations.html",
  "/Richard Vidzrakou.jpg",
  "/images/software_development_image.jpg",
  "/images/PI_Dashbord1.png",
  "/images/DoyenApp.png",
  "/images/iPad-Air-4-globaleesolutions.com.png",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  "https://unpkg.com/aos@2.3.1/dist/aos.css",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error("Failed to cache assets:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip API requests
  if (event.request.url.includes("/api/")) {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // Fallback for navigation requests
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }
      })
  );
});
