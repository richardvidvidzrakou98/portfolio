/* ==========================================
   CONFIGURATION MANAGER
   Handles environment-specific settings
   ========================================== */

// Configuration object
const Config = {
  // API Configuration
  API: {
    BASE_URL:
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
        ? "http://localhost:5000/api" // Local development
        : "https://portfolio-api-j1k2.onrender.com/api", // Production (update with your Render URL)

    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
  },

  // Application Settings
  APP: {
    NAME: "Richard Vidzrakou Portfolio",
    VERSION: "2.0.0",
    AUTHOR: "Richard Vidzrakou",
    EMAIL: "richardvidzrakou98@gmail.com",
  },

  // UI Settings
  UI: {
    ANIMATION_DURATION: 300,
    NOTIFICATION_DURATION: 5000,
    LOADING_MIN_TIME: 1000,
  },

  // Feature Flags
  FEATURES: {
    TEMPLATES_UPLOAD: true,
    PRESENTATIONS_UPLOAD: true,
    CONTACT_FORM: true,
    ANALYTICS: false,
    DARK_MODE: true,
  },

  // External Links
  SOCIAL: {
    GITHUB: "https://github.com/richardvidvidzrakou98",
    LINKEDIN: "https://www.linkedin.com/in/richard-vidzrakou-53aa0422b/",
    TWITTER: "https://x.com/RichardVid36291",
  },
};

// Environment detection
const Environment = {
  isDevelopment: () =>
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1",
  isProduction: () => !Environment.isDevelopment(),
  getApiUrl: () => Config.API.BASE_URL,
};

// API Helper
const ApiHelper = {
  // Base fetch function with error handling
  async fetch(endpoint, options = {}) {
    const url = `${Environment.getApiUrl()}${endpoint}`;

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      timeout: Config.API.TIMEOUT,
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);

      // Return fallback data in development
      if (Environment.isDevelopment()) {
        return {
          success: false,
          message: "API not available in development mode",
          error: error.message,
        };
      }

      throw error;
    }
  },

  // Specific API methods
  templates: {
    getAll: (category = "all") =>
      ApiHelper.fetch(`/templates?category=${category}`),
    getById: (id) => ApiHelper.fetch(`/templates/${id}`),
    upload: (formData) =>
      ApiHelper.fetch("/templates/upload", { method: "POST", body: formData }),
    download: (id) => ApiHelper.fetch(`/templates/${id}/download`),
  },

  presentations: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return ApiHelper.fetch(`/presentations${query ? "?" + query : ""}`);
    },
    getById: (id) => ApiHelper.fetch(`/presentations/${id}`),
    upload: (formData) =>
      ApiHelper.fetch("/presentations/upload", {
        method: "POST",
        body: formData,
      }),
    download: (id) => ApiHelper.fetch(`/presentations/${id}/download`),
  },

  contact: {
    send: (data) =>
      ApiHelper.fetch("/contact", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    getInfo: () => ApiHelper.fetch("/contact/info"),
  },
};

// Logger utility
const Logger = {
  info: (message, data = null) => {
    if (Environment.isDevelopment()) {
      console.log(`ℹ️ ${message}`, data);
    }
  },

  warn: (message, data = null) => {
    console.warn(`⚠️ ${message}`, data);
  },

  error: (message, error = null) => {
    console.error(`❌ ${message}`, error);
  },

  debug: (message, data = null) => {
    if (Environment.isDevelopment()) {
      console.debug(`🐛 ${message}`, data);
    }
  },
};

// Performance monitoring
const Performance = {
  startTime: performance.now(),

  mark: (name) => {
    if (Environment.isDevelopment()) {
      performance.mark(name);
    }
  },

  measure: (name, startMark, endMark) => {
    if (Environment.isDevelopment()) {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name)[0];
        Logger.info(`⏱️ ${name}: ${measure.duration.toFixed(2)}ms`);
      } catch (error) {
        Logger.warn("Performance measurement failed", error);
      }
    }
  },

  getLoadTime: () => {
    return (performance.now() - Performance.startTime).toFixed(2);
  },
};

// Initialize performance monitoring
Performance.mark("app-start");

// Export to global scope
window.Config = Config;
window.Environment = Environment;
window.ApiHelper = ApiHelper;
window.Logger = Logger;
window.Performance = Performance;

// Log initialization in development
if (Environment.isDevelopment()) {
  Logger.info("Configuration loaded", {
    environment: "development",
    apiUrl: Environment.getApiUrl(),
    features: Config.FEATURES,
  });
}
