/* ==========================================
   RICHARD VIDZRAKOU PORTFOLIO - MAIN JS
   Modern Interactive Features
   ========================================== */

// Global variables
let scrollProgress = 0;
let isScrolling = false;

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  initializePortfolio();
});

function initializePortfolio() {
  // Register service worker for caching
  registerServiceWorker();

  // Initialize AOS
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // Initialize all components
  initializeNavigation();
  initializeScrollEffects();
  initializeSkillBars();
  initializeProjects();
  initializeContact();
  initializeTheme();
  initializeLoadingScreen();
  initializeParticles();

  // Start animations after load
  setTimeout(() => {
    animateHeroStats();
    initializeTypingAnimation();
  }, 1000);
}

// ==========================================
// SERVICE WORKER REGISTRATION
// ==========================================

function registerServiceWorker() {
  if ("serviceWorker" in navigator && Environment.isProduction()) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/sw.js")
        .then(function (registration) {
          Logger.info(
            "Service Worker registered successfully",
            registration.scope
          );
        })
        .catch(function (error) {
          Logger.warn("Service Worker registration failed", error);
        });
    });
  }
}

// ==========================================
// LOADING SCREEN
// ==========================================

function initializeLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 1500);
  });
}

// ==========================================
// NAVIGATION
// ==========================================

function initializeNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    updateScrollProgress();
    updateActiveNavLink();
  });

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");

      if (targetId.startsWith("#")) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else {
        window.location.href = targetId;
      }
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";
  const scrollPosition = window.scrollY + 200;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// ==========================================
// SCROLL EFFECTS
// ==========================================

function initializeScrollEffects() {
  // Create scroll progress bar
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  // Parallax elements
  const parallaxElements = document.querySelectorAll(".parallax-element");

  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      requestAnimationFrame(() => {
        updateParallax(parallaxElements);
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
}

function updateScrollProgress() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  const progressBar = document.querySelector(".scroll-progress");
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }
}

function updateParallax(elements) {
  const scrollTop = window.pageYOffset;

  elements.forEach((element) => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(scrollTop * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
}

// ==========================================
// HERO ANIMATIONS
// ==========================================

function animateHeroStats() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const finalValue = stat.textContent;
    const numericValue = parseInt(finalValue.replace(/\D/g, ""));
    const suffix = finalValue.replace(/\d/g, "");

    animateCounter(stat, 0, numericValue, 2000, suffix);
  });
}

function animateCounter(element, start, end, duration, suffix = "") {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
  }, 16);
}

function initializeTypingAnimation() {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    heroTitle.classList.add("typing-animation");

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        heroTitle.classList.remove("typing-animation");
      }
    };

    setTimeout(typeWriter, 500);
  }
}

// ==========================================
// SKILLS SECTION
// ==========================================

function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.dataset.width;

          setTimeout(() => {
            progressBar.style.width = width;
          }, 200);

          observer.unobserve(progressBar);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

// ==========================================
// PROJECTS SECTION
// ==========================================

function initializeProjects() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter projects
      filterProjects(projectCards, filter);
    });
  });
}

function filterProjects(cards, filter) {
  cards.forEach((card) => {
    const category = card.dataset.category;

    if (filter === "all" || category === filter) {
      card.style.display = "block";
      card.style.animation = "fadeIn 0.5s ease forwards";
    } else {
      card.style.animation = "fadeOut 0.3s ease forwards";
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });
}

function openProjectModal(projectId) {
  // Implementation for project modal
  console.log(`Opening project modal for: ${projectId}`);
  // You can implement a detailed project modal here
}

// ==========================================
// CONTACT FORM
// ==========================================

function initializeContact() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);

    // Form validation
    const inputs = contactForm.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField);
      input.addEventListener("input", clearValidationError);
    });
  }
}

function handleContactSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');

  // Validate form
  if (!validateForm(form)) {
    return;
  }

  // Show loading state
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitButton.disabled = true;

  // Submit form
  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        showNotification("Message sent successfully!", "success");
        form.reset();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      showNotification("Error sending message. Please try again.", "error");
      console.error("Error:", error);
    })
    .finally(() => {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    });
}

function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!validateField({ target: input })) {
      isValid = false;
    }
  });

  return isValid;
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  let isValid = true;

  // Remove existing error
  clearValidationError(e);

  // Check required fields
  if (field.required && !value) {
    showFieldError(field, "This field is required");
    isValid = false;
  }

  // Email validation
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showFieldError(field, "Please enter a valid email address");
      isValid = false;
    }
  }

  return isValid;
}

function showFieldError(field, message) {
  field.classList.add("error");

  let errorElement = field.parentNode.querySelector(".field-error");
  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "field-error";
    field.parentNode.appendChild(errorElement);
  }

  errorElement.textContent = message;
}

function clearValidationError(e) {
  const field = e.target;
  field.classList.remove("error");

  const errorElement = field.parentNode.querySelector(".field-error");
  if (errorElement) {
    errorElement.remove();
  }
}

// ==========================================
// THEME TOGGLE
// ==========================================

function initializeTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";

  // Set initial theme
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("theme-toggle");
  const icon = themeToggle.querySelector("i");

  if (theme === "dark") {
    icon.className = "fas fa-sun";
  } else {
    icon.className = "fas fa-moon";
  }
}

// ==========================================
// PARTICLES SYSTEM
// ==========================================

function initializeParticles() {
  const heroSection = document.querySelector(".hero");
  const particlesContainer = heroSection.querySelector(".hero-particles");

  if (particlesContainer) {
    createParticles(particlesContainer, 50);
  }
}

function createParticles(container, count) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random positioning and timing
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 15 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";

    container.appendChild(particle);
  }
}

// ==========================================
// MODALS
// ==========================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Close on background click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modalId);
      }
    });
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ==========================================
// NOTIFICATIONS
// ==========================================

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  // Add to DOM
  document.body.appendChild(notification);

  // Show with animation
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.classList.remove("show");
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Optimize scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    updateScrollProgress();
  }, 10)
);

// Optimize resize events
window.addEventListener(
  "resize",
  debounce(() => {
    // Recalculate any size-dependent features
    AOS.refresh();
  }, 250)
);

// ==========================================
// ACCESSIBILITY
// ==========================================

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close any open modals
    const activeModals = document.querySelectorAll(".modal.active");
    activeModals.forEach((modal) => {
      modal.classList.remove("active");
    });
    document.body.style.overflow = "";
  }
});

// Focus management for modals
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// ==========================================
// ERROR HANDLING
// ==========================================

window.addEventListener("error", (e) => {
  console.error("Portfolio Error:", e.error);
  // Optionally show user-friendly error message
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Portfolio Promise Rejection:", e.reason);
  e.preventDefault();
});

// ==========================================
// EXPORT FOR TESTING
// ==========================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    openModal,
    closeModal,
    showNotification,
    validateField,
    debounce,
    throttle,
  };
}
