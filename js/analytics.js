/* ==========================================
   ANALYTICS & MONITORING
   Track user interactions and performance
   ========================================== */

class Analytics {
  constructor() {
    this.events = [];
    this.sessionStart = Date.now();
    this.userId = this.generateUserId();
    this.isEnabled = Config.FEATURES.ANALYTICS;

    if (this.isEnabled) {
      this.initialize();
    }
  }

  initialize() {
    // Track page load
    this.trackEvent("page_load", {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    });

    // Track scroll depth
    this.initializeScrollTracking();

    // Track clicks on important elements
    this.initializeClickTracking();

    // Track form interactions
    this.initializeFormTracking();

    // Track performance metrics
    this.trackPerformance();
  }

  generateUserId() {
    const stored = localStorage.getItem("portfolio_user_id");
    if (stored) return stored;

    const newId = "user_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("portfolio_user_id", newId);
    return newId;
  }

  trackEvent(eventName, data = {}) {
    if (!this.isEnabled) return;

    const event = {
      event: eventName,
      userId: this.userId,
      timestamp: Date.now(),
      url: window.location.href,
      ...data,
    };

    this.events.push(event);

    // Log in development
    if (Environment.isDevelopment()) {
      Logger.info(`📊 Analytics: ${eventName}`, data);
    }

    // Send to analytics service (implement your preferred solution)
    this.sendToAnalytics(event);
  }

  initializeScrollTracking() {
    let maxScroll = 0;

    window.addEventListener("scroll", () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        // Track scroll milestones
        if (scrollPercent >= 25 && maxScroll < 25) {
          this.trackEvent("scroll_depth", { depth: "25%" });
        } else if (scrollPercent >= 50 && maxScroll < 50) {
          this.trackEvent("scroll_depth", { depth: "50%" });
        } else if (scrollPercent >= 75 && maxScroll < 75) {
          this.trackEvent("scroll_depth", { depth: "75%" });
        } else if (scrollPercent >= 90 && maxScroll < 90) {
          this.trackEvent("scroll_depth", { depth: "90%" });
        }
      }
    });
  }

  initializeClickTracking() {
    // Track navigation clicks
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        this.trackEvent("navigation_click", {
          section: e.target.textContent.trim(),
          href: e.target.getAttribute("href"),
        });
      });
    });

    // Track CTA button clicks
    document
      .querySelectorAll(".btn-primary, .btn-secondary")
      .forEach((button) => {
        button.addEventListener("click", (e) => {
          this.trackEvent("cta_click", {
            text: e.target.textContent.trim(),
            section: this.getSection(e.target),
          });
        });
      });

    // Track project links
    document.querySelectorAll(".project-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        this.trackEvent("project_link_click", {
          projectId: this.getProjectId(e.target),
          type: e.target.classList.contains("external") ? "external" : "modal",
        });
      });
    });

    // Track social links
    document.querySelectorAll(".social-links a").forEach((link) => {
      link.addEventListener("click", (e) => {
        this.trackEvent("social_click", {
          platform: this.getSocialPlatform(e.target.href),
        });
      });
    });
  }

  initializeFormTracking() {
    const contactForm = document.querySelector("#contact-form");
    if (contactForm) {
      // Track form start
      contactForm.addEventListener(
        "focusin",
        () => {
          this.trackEvent("form_start", { form: "contact" });
        },
        { once: true }
      );

      // Track form submission
      contactForm.addEventListener("submit", (e) => {
        this.trackEvent("form_submit", {
          form: "contact",
          success: true,
        });
      });
    }
  }

  trackPerformance() {
    // Track page load performance
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0];

        this.trackEvent("performance", {
          loadTime: perfData.loadEventEnd - perfData.loadEventStart,
          domContentLoaded:
            perfData.domContentLoadedEventEnd -
            perfData.domContentLoadedEventStart,
          firstPaint: this.getFirstPaint(),
          firstContentfulPaint: this.getFirstContentfulPaint(),
        });
      }, 1000);
    });
  }

  getFirstPaint() {
    const paintEntries = performance.getEntriesByType("paint");
    const firstPaint = paintEntries.find(
      (entry) => entry.name === "first-paint"
    );
    return firstPaint ? firstPaint.startTime : null;
  }

  getFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType("paint");
    const fcp = paintEntries.find(
      (entry) => entry.name === "first-contentful-paint"
    );
    return fcp ? fcp.startTime : null;
  }

  getSection(element) {
    const section = element.closest("section");
    return section ? section.id || section.className : "unknown";
  }

  getProjectId(element) {
    const projectCard = element.closest(".project-card");
    return projectCard ? projectCard.dataset.projectId : "unknown";
  }

  getSocialPlatform(href) {
    if (href.includes("github.com")) return "github";
    if (href.includes("linkedin.com")) return "linkedin";
    if (href.includes("twitter.com") || href.includes("x.com"))
      return "twitter";
    return "other";
  }

  sendToAnalytics(event) {
    // Implement your analytics service here
    // Examples: Google Analytics, Mixpanel, Plausible, etc.

    // For now, store locally in development
    if (Environment.isDevelopment()) {
      const storedEvents = JSON.parse(
        localStorage.getItem("portfolio_analytics") || "[]"
      );
      storedEvents.push(event);
      localStorage.setItem(
        "portfolio_analytics",
        JSON.stringify(storedEvents.slice(-100))
      ); // Keep last 100 events
    }
  }

  // Public methods for manual tracking
  trackTemplateDownload(templateId) {
    this.trackEvent("template_download", { templateId });
  }

  trackPresentationView(presentationId) {
    this.trackEvent("presentation_view", { presentationId });
  }

  trackContactSuccess() {
    this.trackEvent("contact_success");
  }

  trackError(error, context = {}) {
    this.trackEvent("error", {
      message: error.message,
      stack: error.stack,
      ...context,
    });
  }

  // Get analytics summary
  getSummary() {
    return {
      sessionDuration: Date.now() - this.sessionStart,
      eventsCount: this.events.length,
      userId: this.userId,
      events: this.events,
    };
  }
}

// Initialize analytics
const analytics = new Analytics();

// Global error tracking
window.addEventListener("error", (event) => {
  analytics.trackError(event.error, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  });
});

// Unhandled promise rejection tracking
window.addEventListener("unhandledrejection", (event) => {
  analytics.trackError(new Error(event.reason), {
    type: "unhandled_promise_rejection",
  });
});

// Export analytics instance
window.Analytics = analytics;

// Log analytics initialization
Logger.info("Analytics initialized", {
  enabled: analytics.isEnabled,
  userId: analytics.userId,
});
