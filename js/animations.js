/* ==========================================
   ANIMATIONS JAVASCRIPT
   Interactive animations and effects
   ========================================== */

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

class ScrollAnimations {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollTriggers();
    this.setupParallaxElements();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.triggerAnimation(entry.target);
        }
      });
    }, options);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
      ".animate-on-scroll, .fade-in, .slide-up, .slide-in-left, .slide-in-right, .zoom-in"
    );

    animatedElements.forEach((el) => {
      this.observer.observe(el);
    });
  }

  triggerAnimation(element) {
    element.classList.add("animated");

    // Trigger specific animations based on classes
    if (element.classList.contains("counter")) {
      this.animateCounter(element);
    }

    if (element.classList.contains("progress-bar")) {
      this.animateProgressBar(element);
    }

    if (element.classList.contains("typewriter")) {
      this.animateTypewriter(element);
    }
  }

  setupScrollTriggers() {
    window.addEventListener(
      "scroll",
      this.throttle(() => {
        this.updateScrollProgress();
        this.updateParallax();
        this.updateNavbarState();
      }, 10)
    );
  }

  setupParallaxElements() {
    this.parallaxElements = document.querySelectorAll("[data-parallax]");
  }

  updateScrollProgress() {
    const scrolled =
      (window.pageYOffset /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    const progressBar = document.querySelector(".scroll-progress");

    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }

    // Update scroll indicator
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      scrollIndicator.style.opacity = window.pageYOffset > 100 ? "0" : "1";
    }
  }

  updateParallax() {
    const scrollTop = window.pageYOffset;

    this.parallaxElements.forEach((element) => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const yPos = -(scrollTop * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  updateNavbarState() {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (window.pageYOffset > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  }

  // Utility function
  throttle(func, limit) {
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
}

// ==========================================
// COUNTER ANIMATIONS
// ==========================================

class CounterAnimation {
  static animate(element) {
    const target =
      parseInt(element.dataset.target) || parseInt(element.textContent);
    const duration = parseInt(element.dataset.duration) || 2000;
    const suffix = element.dataset.suffix || "";

    let current = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + suffix;
      }
    };

    updateCounter();
  }
}

// ==========================================
// TYPEWRITER ANIMATION
// ==========================================

class TypewriterAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.words = options.words || [element.textContent];
    this.speed = options.speed || 100;
    this.deleteSpeed = options.deleteSpeed || 50;
    this.delay = options.delay || 2000;
    this.loop = options.loop !== false;
    this.currentWordIndex = 0;
    this.currentText = "";
    this.isDeleting = false;

    this.init();
  }

  init() {
    this.element.textContent = "";
    this.type();
  }

  type() {
    const currentWord = this.words[this.currentWordIndex];

    if (this.isDeleting) {
      this.currentText = currentWord.substring(0, this.currentText.length - 1);
    } else {
      this.currentText = currentWord.substring(0, this.currentText.length + 1);
    }

    this.element.textContent = this.currentText;

    let speed = this.isDeleting ? this.deleteSpeed : this.speed;

    if (!this.isDeleting && this.currentText === currentWord) {
      speed = this.delay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === "") {
      this.isDeleting = false;
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
      speed = 500;
    }

    if (
      this.loop ||
      this.currentWordIndex < this.words.length ||
      this.currentText !== ""
    ) {
      setTimeout(() => this.type(), speed);
    }
  }
}

// ==========================================
// PARTICLE SYSTEM
// ==========================================

class ParticleSystem {
  constructor(container, options = {}) {
    this.container = container;
    this.particleCount = options.count || 50;
    this.particleSize = options.size || 2;
    this.particleColor = options.color || "#ff6b35";
    this.particles = [];

    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.cssText = `
                position: absolute;
                width: ${this.particleSize}px;
                height: ${this.particleSize}px;
                background: ${this.particleColor};
                border-radius: 50%;
                pointer-events: none;
            `;

      const particleData = {
        element: particle,
        x: Math.random() * this.container.offsetWidth,
        y: Math.random() * this.container.offsetHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random() * 100,
      };

      this.particles.push(particleData);
      this.container.appendChild(particle);
    }
  }

  animate() {
    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;

      // Boundary check
      if (particle.x < 0 || particle.x > this.container.offsetWidth) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > this.container.offsetHeight) {
        particle.vy *= -1;
      }

      // Reset particle if life is over
      if (particle.life <= 0) {
        particle.x = Math.random() * this.container.offsetWidth;
        particle.y = Math.random() * this.container.offsetHeight;
        particle.life = Math.random() * 100;
      }

      // Update position
      particle.element.style.left = particle.x + "px";
      particle.element.style.top = particle.y + "px";
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ==========================================
// MORPHING SHAPES
// ==========================================

class MorphingShape {
  constructor(element, shapes) {
    this.element = element;
    this.shapes = shapes || [
      "50% 50% 50% 50%",
      "25% 75% 75% 25%",
      "75% 25% 25% 75%",
      "40% 60% 80% 20%",
    ];
    this.currentIndex = 0;
    this.duration = 3000;

    this.init();
  }

  init() {
    this.morph();
  }

  morph() {
    this.element.style.borderRadius = this.shapes[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.shapes.length;

    setTimeout(() => this.morph(), this.duration);
  }
}

// ==========================================
// FLOATING ANIMATION
// ==========================================

class FloatingAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.amplitude = options.amplitude || 10;
    this.speed = options.speed || 0.02;
    this.offset = Math.random() * Math.PI * 2;
    this.baseY = 0;

    this.init();
  }

  init() {
    const rect = this.element.getBoundingClientRect();
    this.baseY = rect.top;
    this.animate();
  }

  animate() {
    const time = Date.now() * this.speed + this.offset;
    const y = Math.sin(time) * this.amplitude;

    this.element.style.transform = `translateY(${y}px)`;

    requestAnimationFrame(() => this.animate());
  }
}

// ==========================================
// GLITCH EFFECT
// ==========================================

class GlitchEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.intensity = options.intensity || 5;
    this.duration = options.duration || 100;
    this.interval = options.interval || 3000;

    this.init();
  }

  init() {
    setInterval(() => this.glitch(), this.interval);
  }

  glitch() {
    const originalTransform = this.element.style.transform;
    const glitchCount = 5;

    for (let i = 0; i < glitchCount; i++) {
      setTimeout(() => {
        const x = (Math.random() - 0.5) * this.intensity;
        const y = (Math.random() - 0.5) * this.intensity;
        this.element.style.transform = `translate(${x}px, ${y}px)`;

        if (i === glitchCount - 1) {
          setTimeout(() => {
            this.element.style.transform = originalTransform;
          }, this.duration / glitchCount);
        }
      }, (this.duration / glitchCount) * i);
    }
  }
}

// ==========================================
// RIPPLE EFFECT
// ==========================================

class RippleEffect {
  static create(element, event) {
    const ripple = document.createElement("span");
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;

    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}

// ==========================================
// MAGNETIC EFFECT
// ==========================================

class MagneticEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.strength = options.strength || 0.3;
    this.radius = options.radius || 100;

    this.init();
  }

  init() {
    this.element.addEventListener("mousemove", (e) => {
      this.handleMouseMove(e);
    });

    this.element.addEventListener("mouseleave", () => {
      this.resetPosition();
    });
  }

  handleMouseMove(e) {
    const rect = this.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < this.radius) {
      const moveX = deltaX * this.strength;
      const moveY = deltaY * this.strength;

      this.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  }

  resetPosition() {
    this.element.style.transform = "translate(0px, 0px)";
  }
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          this.scrollTo(targetElement);
        }
      });
    });
  }

  scrollTo(element) {
    const targetPosition = element.offsetTop - 80; // Account for navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);

      // Easing function
      const ease = this.easeInOutCubic(percent);

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  // Initialize scroll animations
  new ScrollAnimations();

  // Initialize smooth scroll
  new SmoothScroll();

  // Initialize typewriter for hero title
  const heroTitle = document.querySelector(".hero-title .highlight");
  if (heroTitle) {
    new TypewriterAnimation(heroTitle, {
      words: [
        "Richard Vidzrakou",
        "Full Stack Developer",
        "React Specialist",
        "Flutter Developer",
      ],
      speed: 150,
      deleteSpeed: 100,
      delay: 2000,
    });
  }

  // Initialize particles in hero section
  const heroParticles = document.querySelector(".hero-particles");
  if (heroParticles) {
    new ParticleSystem(heroParticles, {
      count: 30,
      size: 3,
      color: "#ff6b35",
    });
  }

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      RippleEffect.create(button, e);
    });
  });

  // Initialize magnetic effect for cards
  const cards = document.querySelectorAll(
    ".project-card, .skill-category, .template-card"
  );
  cards.forEach((card) => {
    new MagneticEffect(card, {
      strength: 0.1,
      radius: 150,
    });
  });

  // Initialize floating animation for certain elements
  const floatingElements = document.querySelectorAll(".floating, .status-dot");
  floatingElements.forEach((element) => {
    new FloatingAnimation(element, {
      amplitude: 5,
      speed: 0.01,
    });
  });

  // Initialize morphing shapes
  const morphingShapes = document.querySelectorAll(".morphing-shape");
  morphingShapes.forEach((shape) => {
    new MorphingShape(shape);
  });

  // Initialize glitch effect for certain elements
  const glitchElements = document.querySelectorAll(".glitch-effect");
  glitchElements.forEach((element) => {
    new GlitchEffect(element, {
      intensity: 3,
      interval: 5000,
    });
  });

  // Animate counters when they come into view
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          CounterAnimation.animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
});

// ==========================================
// CSS ANIMATIONS (ADD TO CSS)
// ==========================================

// Add these CSS keyframes to your animations.css file:
const additionalCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.fade-in {
    opacity: 0;
    transition: opacity 0.6s ease;
}

.fade-in.animated {
    opacity: 1;
}

.slide-up {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.slide-up.animated {
    opacity: 1;
    transform: translateY(0);
}

.slide-in-left {
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.6s ease;
}

.slide-in-left.animated {
    opacity: 1;
    transform: translateX(0);
}

.slide-in-right {
    opacity: 0;
    transform: translateX(30px);
    transition: all 0.6s ease;
}

.slide-in-right.animated {
    opacity: 1;
    transform: translateX(0);
}

.zoom-in {
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.6s ease;
}

.zoom-in.animated {
    opacity: 1;
    transform: scale(1);
}
`;

// ==========================================
// EXPORT FOR TESTING
// ==========================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ScrollAnimations,
    CounterAnimation,
    TypewriterAnimation,
    ParticleSystem,
    RippleEffect,
    MagneticEffect,
    SmoothScroll,
  };
}
