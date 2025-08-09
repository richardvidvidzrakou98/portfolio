/* ==========================================
   ANALYTICS & MONITORING
   Track user interactions and performance
   ========================================== */

class Analytics {
  constructor() {
    this.events = [];
    this.sessionStart = Date.now();
    this.userId = this.generateUserId();
    this.sessionId = this.generateSessionId();
    this.isEnabled = true;

    if (this.isEnabled) {
      this.initialize();
    }
  }

  initialize() {
    // Track page load
    this.trackEvent("page_load", {
      page: window.location.pathname,
      title: document.title,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
    });

    // Setup event listeners
    this.setupEventListeners();

    // Track session duration
    this.trackSessionDuration();
  }

  generateUserId() {
    let userId = localStorage.getItem("portfolio_user_id");
    if (!userId) {
      userId =
        "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("portfolio_user_id", userId);
    }
    return userId;
  }

  generateSessionId() {
    return (
      "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  }

  trackEvent(eventType, data) {
    const event = {
      session_id: this.sessionId,
      user_id: this.userId,
      event_type: eventType,
      event_data: data,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    // Store locally
    this.events.push(event);

    // Send to server (if available)
    this.sendToServer(event);
  }

  async sendToServer(event) {
    try {
      const response = await fetch("/admin-dashboard/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...event,
          ip_address: null,
        }),
      });

      if (response.ok) {
        console.log("Analytics event sent successfully");
      }
    } catch (error) {
      console.log("Analytics tracking offline");
    }
  }

  trackProjectView(projectId) {
    this.trackEvent("project_view", {
      project_id: projectId,
      page: window.location.pathname,
    });
  }

  setupEventListeners() {
    // Track external links
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link && link.href) {
        const isExternal = link.hostname !== window.location.hostname;
        if (isExternal) {
          this.trackEvent("external_link_click", {
            url: link.href,
            text: link.textContent,
            page: window.location.pathname,
          });
        }
      }
    });

    // Track form submissions
    document.addEventListener("submit", (e) => {
      const form = e.target;
      if (form.tagName === "FORM") {
        this.trackEvent("form_submit", {
          form_id: form.id,
          form_name: form.name,
          page: window.location.pathname,
        });
      }
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener("scroll", () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        if (scrollPercent >= 25 && maxScroll < 25) {
          this.trackEvent("scroll_depth", { depth: "25%" });
        } else if (scrollPercent >= 50 && maxScroll < 50) {
          this.trackEvent("scroll_depth", { depth: "50%" });
        } else if (scrollPercent >= 75 && maxScroll < 75) {
          this.trackEvent("scroll_depth", { depth: "75%" });
        } else if (scrollPercent >= 100 && maxScroll < 100) {
          this.trackEvent("scroll_depth", { depth: "100%" });
        }
      }
    });
  }

  trackSessionDuration() {
    // Track session duration on page unload
    window.addEventListener("beforeunload", () => {
      const duration = Date.now() - this.sessionStart;
      this.trackEvent("session_duration", {
        duration: duration,
        page: window.location.pathname,
      });
    });

    // Track session duration periodically
    setInterval(() => {
      const duration = Date.now() - this.sessionStart;
      this.trackEvent("session_heartbeat", {
        duration: duration,
        page: window.location.pathname,
      });
    }, 30000);
  }

  track(eventType, data) {
    this.trackEvent(eventType, data);
  }
}

// Initialize analytics
const analytics = new Analytics();

// Make analytics available globally
window.analytics = analytics;

// Override openProjectModal to track project views
document.addEventListener("DOMContentLoaded", function () {
  if (typeof window.openProjectModal === "function") {
    const originalOpenProjectModal = window.openProjectModal;
    window.openProjectModal = function (projectId) {
      analytics.trackProjectView(projectId);
      return originalOpenProjectModal.apply(this, arguments);
    };
  }
});
