/* ==========================================
   PROJECTS MANAGEMENT (Client-Side Only)
   Project display, filtering, and modal functionality
   Admin features moved to separate admin dashboard
   ========================================== */

// Projects data
let projects = [
  {
    id: "pi-dashboard",
    title: "PI Management Dashboard",
    description:
      "Official page for private investigators to access and manage their cases and documentations. Built with Laravel featuring secure authentication, case management, and comprehensive documentation tools.",
    longDescription:
      "This project is a professional web-based management system designed specifically for Private Investigation agencies. Built with Laravel, it features a modern dashboard with secure authentication, case management, client tracking, and comprehensive documentation tools. The system includes role-based access control, secure document storage, and automated workflow management.",
    category: "web",
    featured: true,
    technologies: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    images: [
      "./images/pidashboard1.png",
      "./images/pi-dashboard-2.jpg",
      "./images/pi-dashboard-3.jpg",
    ],
    liveUrl: "https://doyeninstitute.edu.gh/verify/admin/login.php",
    githubUrl: "https://github.com/richardvidvidzrakou98/pi-dashboard",
    features: [
      "Secure Laravel authentication",
      "Case management system",
      "Client tracking and communication",
      "Document management",
      "Role-based access control",
      "Automated reporting",
    ],
    challenges:
      "Creating a secure Laravel system that could handle sensitive investigation data while maintaining ease of use for non-technical users.",
    solution:
      "Implemented Laravel's built-in security features with encrypted data storage, secure authentication, and comprehensive audit trails.",
    status: "completed",
    completedAt: "2024-11-01",
    client: "Doyen Institute",
    duration: "3 months",
  },
  {
    id: "bookafrica",
    title: "BookAfrica Platform",
    description:
      "A comprehensive Next.js platform for booking hotels across Africa. Collaborative project featuring advanced search, booking management, payment integration, and user-friendly interface for travelers.",
    longDescription:
      "BookAfrica is a modern hotel booking platform built with Next.js, designed specifically for the African hospitality market. This collaborative project features advanced search capabilities, real-time availability checking, secure booking management, integrated payment systems, and a responsive user interface optimized for travelers across Africa.",
    category: "web",
    featured: false,
    technologies: ["Next.js", "React", "TypeScript", "Node.js"],
    images: [
      "./images/bookafrica1.png",
      "./images/bookafrica2.png",
      "./images/bookafrica-3.jpg",
    ],
    liveUrl: null,
    githubUrl: "https://github.com/richardvidvidzrakou98/bookafrica",
    features: [
      "Advanced hotel search and filtering",
      "Real-time availability checking",
      "Secure booking management",
      "Payment gateway integration",
      "User review and rating system",
      "Mobile-responsive design",
      "Multi-language support",
    ],
    challenges:
      "Building a scalable booking platform that can handle multiple hotels across different African countries with varying payment methods and currencies.",
    solution:
      "Implemented a microservices architecture with Next.js for optimal performance, integrated multiple payment gateways, and created a flexible currency conversion system.",
    status: "in-progress",
    completedAt: null,
    client: "Collaborative Project",
    duration: "Ongoing",
  },
  {
    id: "doyen-app",
    title: "Doyen Institute Platform",
    description:
      "A comprehensive web platform for security professionals and students with learning modules and certification tracking built with modern web technologies.",
    longDescription:
      "A comprehensive web application built with React for the Doyen Institute of Security Studies. The platform serves as a learning management system for security professionals and students, featuring interactive courses, certification tracking, examination systems, and professional networking capabilities.",
    category: "web",
    featured: false,
    technologies: ["React", "Node.js", "Firebase", "REST API"],
    images: [
      "./images/DoyenApp.png",
      "./images/doyen-app-2.jpg",
      "./images/doyen-app-3.jpg",
    ],
    liveUrl: null,
    githubUrl: "https://github.com/richardvidvidzrakou98/doyen-platform",
    features: [
      "Interactive learning modules",
      "Certification tracking",
      "Online examinations",
      "Professional networking",
      "Progress analytics",
      "Responsive web design",
    ],
    challenges:
      "Creating an engaging web learning experience while ensuring content security and cross-device compatibility.",
    solution:
      "Developed a progressive web application with secure content delivery and responsive design for optimal user experience across devices.",
    status: "completed",
    completedAt: "2024-10-15",
    client: "Doyen Institute",
    duration: "4 months",
  },
  {
    id: "globalee-solutions",
    title: "Globalee Solutions",
    description:
      "A professional WordPress website for real estate services with custom themes and advanced property management features.",
    longDescription:
      "A complete real estate website solution built on WordPress with custom themes and advanced property management features. The site includes property listings, virtual tours, client management, and integrated payment systems for a seamless real estate experience.",
    category: "wordpress",
    featured: false,
    technologies: ["WordPress", "PHP", "Custom Themes"],
    images: [
      "./images/iPad-Air-4-globaleesolutions.com.png",
      "./images/globalee-2.jpg",
      "./images/globalee-3.jpg",
    ],
    liveUrl: "https://globaleesolutions.com/",
    githubUrl: null,
    features: [
      "Custom WordPress theme",
      "Property management system",
      "Virtual tour integration",
      "Client portal",
      "Payment gateway integration",
      "SEO optimization",
    ],
    challenges:
      "Creating a fast, SEO-friendly real estate website with complex property search and filtering capabilities.",
    solution:
      "Implemented custom post types, advanced caching strategies, and optimized database queries for performance.",
    status: "completed",
    completedAt: "2024-09-20",
    client: "Globalee Solutions",
    duration: "2 months",
  },
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    description:
      "A modern e-commerce platform built with React and Node.js featuring advanced product management and analytics.",
    longDescription:
      "A full-stack e-commerce solution built with React frontend and Node.js backend. Features include product catalog management, shopping cart, payment processing, order management, and comprehensive analytics dashboard for business insights.",
    category: "web",
    featured: true,
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    images: [
      "./images/ecommerce-1.jpg",
      "./images/ecommerce-2.jpg",
      "./images/ecommerce-3.jpg",
    ],
    liveUrl: "https://ecommerce-demo.richardvidzrakou.com",
    githubUrl: "https://github.com/richardvidvidzrakou98/ecommerce-platform",
    features: [
      "Product catalog management",
      "Shopping cart functionality",
      "Secure payment processing",
      "Order management system",
      "Analytics dashboard",
      "Inventory management",
    ],
    challenges:
      "Building a scalable e-commerce platform with real-time inventory updates and secure payment processing.",
    solution:
      "Implemented microservices architecture with real-time data synchronization and PCI-compliant payment processing.",
    status: "in-progress",
    completedAt: null,
    client: "Personal Project",
    duration: "Ongoing",
  },
];

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  initializeProjects();
});

function initializeProjects() {
  setupProjectFiltering();
  setupProjectModals();
  loadProjectsFromStorage();
  setupProjectActions();
}

// ==========================================
// PROJECT FILTERING
// ==========================================

function setupProjectFiltering() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter projects with animation
      filterProjectsWithAnimation(projectCards, filter);
    });
  });
}

function filterProjectsWithAnimation(cards, filter) {
  // First, fade out all cards
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
  });

  setTimeout(() => {
    cards.forEach((card, index) => {
      const category = card.dataset.category;

      if (filter === "all" || category === filter) {
        card.style.display = "block";

        // Stagger the fade-in animation
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, index * 100);
      } else {
        card.style.display = "none";
      }
    });
  }, 200);
}

// ==========================================
// PROJECT MODALS
// ==========================================

function setupProjectModals() {
  // Add click listeners to project cards for modal opening
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const projectId = card.dataset.projectId || extractProjectIdFromCard(card);
    if (projectId) {
      card.addEventListener("click", (e) => {
        // Don't open modal if clicking on links
        if (e.target.tagName === "A" || e.target.closest("a")) {
          return;
        }
        openProjectModal(projectId);
      });
    }
  });
}

function openProjectModal(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    console.warn(`Project with ID ${projectId} not found`);
    return;
  }

  const modal = createProjectModal(project);
  document.body.appendChild(modal);

  // Prevent body scroll
  document.body.style.overflow = "hidden";

  // Show modal with animation
  setTimeout(() => {
    modal.classList.add("active");
  }, 100);

  // Setup modal interactions
  setupModalInteractions(modal, project);
}

function createProjectModal(project) {
  const modal = document.createElement("div");
  modal.className = "modal project-modal";
  modal.id = `project-modal-${project.id}`;

  modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <span class="modal-close" onclick="closeProjectModal('${
                  project.id
                }')">&times;</span>
                <div class="project-header">
                    <div class="project-title-section">
                        <h2 class="project-title">${project.title}</h2>
                        <div class="project-meta">
                            <span class="project-category">${
                              project.category
                            }</span>
                            ${
                              project.featured
                                ? '<span class="featured-badge">Featured</span>'
                                : ""
                            }
                            <span class="project-status status-${
                              project.status
                            }">${project.status}</span>
                        </div>
                    </div>
                    <div class="project-actions">
                        ${
                          project.liveUrl
                            ? `
                            <a href="${project.liveUrl}" target="_blank" class="btn btn-primary">
                                <i class="fas fa-external-link-alt"></i>
                                Live Demo
                            </a>
                        `
                            : ""
                        }
                        ${
                          project.githubUrl
                            ? `
                            <a href="${project.githubUrl}" target="_blank" class="btn btn-outline">
                                <i class="fab fa-github"></i>
                                View Code
                            </a>
                        `
                            : ""
                        }
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="project-content">
                    <div class="project-gallery">
                        <div class="main-image">
                            <img src="${project.images[0]}" alt="${
    project.title
  }" class="gallery-main">
                        </div>
                        ${
                          project.images.length > 1
                            ? `
                            <div class="image-thumbnails">
                                ${project.images
                                  .map(
                                    (img, index) => `
                                    <img src="${img}" alt="${project.title} ${
                                      index + 1
                                    }" 
                                         class="thumbnail ${
                                           index === 0 ? "active" : ""
                                         }"
                                         onclick="changeMainImage('${img}', this)">
                                `
                                  )
                                  .join("")}
                            </div>
                        `
                            : ""
                        }
                    </div>
                    <div class="project-details">
                        <div class="project-overview">
                            <h3>Project Overview</h3>
                            <p class="project-description">${
                              project.longDescription
                            }</p>
                        </div>
                        
                        <div class="project-info-grid">
                            <div class="info-section">
                                <h4>Technologies Used</h4>
                                <div class="tech-tags">
                                    ${project.technologies
                                      .map(
                                        (tech) => `
                                        <span class="tech-tag">${tech}</span>
                                    `
                                      )
                                      .join("")}
                                </div>
                            </div>
                            
                            <div class="info-section">
                                <h4>Key Features</h4>
                                <ul class="features-list">
                                    ${project.features
                                      .map(
                                        (feature) => `
                                        <li><i class="fas fa-check"></i> ${feature}</li>
                                    `
                                      )
                                      .join("")}
                                </ul>
                            </div>
                            
                            <div class="info-section">
                                <h4>Project Details</h4>
                                <div class="project-stats">
                                    <div class="stat-item">
                                        <span class="stat-label">Client:</span>
                                        <span class="stat-value">${
                                          project.client
                                        }</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Duration:</span>
                                        <span class="stat-value">${
                                          project.duration
                                        }</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Status:</span>
                                        <span class="stat-value status-${
                                          project.status
                                        }">${project.status}</span>
                                    </div>
                                    ${
                                      project.completedAt
                                        ? `
                                        <div class="stat-item">
                                            <span class="stat-label">Completed:</span>
                                            <span class="stat-value">${formatDate(
                                              project.completedAt
                                            )}</span>
                                        </div>
                                    `
                                        : ""
                                    }
                                </div>
                            </div>
                            
                            <div class="info-section">
                                <h4>Challenge & Solution</h4>
                                <div class="challenge-solution">
                                    <div class="challenge">
                                        <h5><i class="fas fa-exclamation-triangle"></i> Challenge</h5>
                                        <p>${project.challenges}</p>
                                    </div>
                                    <div class="solution">
                                        <h5><i class="fas fa-lightbulb"></i> Solution</h5>
                                        <p>${project.solution}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  return modal;
}

function closeProjectModal(projectId) {
  const modal = document.getElementById(`project-modal-${projectId}`);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";

    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

function setupModalInteractions(modal, project) {
  // Close modal on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProjectModal(project.id);
    }
  });

  // Keyboard navigation
  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      closeProjectModal(project.id);
      document.removeEventListener("keydown", handleKeydown);
    }
  };

  document.addEventListener("keydown", handleKeydown);
}

function changeMainImage(imageSrc, thumbnail) {
  const mainImage = document.querySelector(".gallery-main");
  const thumbnails = document.querySelectorAll(".thumbnail");

  if (mainImage) {
    mainImage.src = imageSrc;
  }

  // Update active thumbnail
  thumbnails.forEach((thumb) => thumb.classList.remove("active"));
  thumbnail.classList.add("active");
}

// ==========================================
// PROJECT ACTIONS (Client-side only)
// ==========================================

function setupProjectActions() {
  // Only setup view-only actions for client side
  // Admin actions moved to admin dashboard
  console.log("Projects module loaded - client mode");
}

function renderProjects() {
  // This function would be called by the backend
  // For now, projects are statically loaded in HTML
  console.log("Projects rendered from static data");
}

function showNotification(message, type) {
  // Simple notification system
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Basic notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    border-radius: 6px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    ${type === "success" ? "background: #10b981;" : "background: #ef4444;"}
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// ==========================================
// STORAGE MANAGEMENT
// ==========================================

function saveProjectsToStorage() {
  localStorage.setItem("portfolio_projects", JSON.stringify(projects));
}

function loadProjectsFromStorage() {
  const storedProjects = localStorage.getItem("portfolio_projects");
  if (storedProjects) {
    projects = JSON.parse(storedProjects);
  }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function generateProjectId() {
  return (
    "project_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
  );
}

function extractProjectIdFromCard(card) {
  // Try to extract project ID from various sources
  const title = card.querySelector(".project-title, h3");
  if (title) {
    const titleText = title.textContent.toLowerCase();
    if (
      titleText.includes("pi management") ||
      titleText.includes("dashboard")
    ) {
      return "pi-dashboard";
    } else if (titleText.includes("doyen")) {
      return "doyen-app";
    } else if (titleText.includes("globalee")) {
      return "globalee-solutions";
    }
  }
  return null;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ==========================================
// EXPORT FOR TESTING
// ==========================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    projects,
    openProjectModal,
    closeProjectModal,
    filterProjectsWithAnimation,
    generateProjectId,
  };
}
