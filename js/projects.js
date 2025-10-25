/* ==========================================
   PROJECTS MANAGEMENT (Client-Side Only)
   Project display, filtering, and modal functionality
   Admin features moved to separate admin dashboard
   ========================================== */

// Projects data - Auto-generated from admin dashboard
let projects = [
  {
    id: "pidashboard",
    title: "PI Dashboard - Project Intelligence",
    description:
      "A comprehensive project management dashboard with real-time analytics and team collaboration features.",
    longDescription:
      "A comprehensive project management dashboard with real-time analytics and team collaboration features. Built with modern web technologies to provide intuitive project tracking, resource allocation, and performance monitoring.",
    category: "web-app",
    featured: true,
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Chart.js"],
    images: [
      "./images/pidashboard-1.jpg",
      "./images/pidashboard-2.jpg",
      "./images/pidashboard-3.jpg",
    ],
    liveUrl: "https://pidashboard.demo.com",
    githubUrl: "https://github.com/richardvidvidzrakou98/pi-dashboard",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    challenges: "Project challenges and solutions will be detailed here.",
    solution: "Technical solution and implementation details.",
    status: "completed",
    completedAt: "2025-07-19T08:06:09.092Z",
    client: "Client Name",
    duration: "Project duration",
  },
  {
    id: "bookafrica",
    title: "BookAfrica - Literary Platform",
    description:
      "A digital platform connecting African authors with global readers through an innovative e-book marketplace.",
    longDescription:
      "A digital platform connecting African authors with global readers through an innovative e-book marketplace. Features include author profiles, book recommendations, reading analytics, and community features.",
    category: "e-commerce",
    featured: true,
    technologies: ["Next.js", "PostgreSQL", "Stripe", "AWS", "Redis"],
    images: [
      "./images/bookafrica-1.jpg",
      "./images/bookafrica-2.jpg",
      "./images/bookafrica-3.jpg",
    ],
    liveUrl: "https://bookafrica.net",
    githubUrl: "https://github.com/richardvidvidzrakou98/bookafria",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    challenges: "Project challenges and solutions will be detailed here.",
    solution: "Technical solution and implementation details.",
    status: "completed",
    completedAt: "2025-07-19T08:06:09.092Z",
    client: "Client Name",
    duration: "Project duration",
  },
  {
    id: "doyen-app",
    title: "Doyen App - Professional Network",
    description:
      "A networking platform for professionals to connect, collaborate, and share expertise across industries.",
    longDescription:
      "A networking platform for professionals to connect, collaborate, and share expertise across industries. Includes mentorship matching, skill assessments, and career development tools.",
    category: "social",
    featured: false,
    technologies: ["React Native", "Firebase", "GraphQL", "TypeScript"],
    images: [
      "./images/doyen-app-1.jpg",
      "./images/doyen-app-2.jpg",
      "./images/doyen-app-3.jpg",
    ],
    liveUrl: "https://doyenapp.demo.com",
    githubUrl: "https://github.com/richardvidvidzrakou98/doyen-app",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    challenges: "Project challenges and solutions will be detailed here.",
    solution: "Technical solution and implementation details.",
    status: "completed",
    completedAt: "2025-07-19T08:06:09.092Z",
    client: "Client Name",
    duration: "Project duration",
  },
  {
    id: "case-management-system",
    title: "Case Management System (CMS)",
    description:
      "Professional case management system built with Laravel and MySQL for managing investigation cases.",
    longDescription:
      "A comprehensive case management system developed with Laravel and MySQL for efficient handling of investigation cases. The system features secure authentication, case tracking, document management, and reporting capabilities. Hosted on Hostinger for reliable performance and accessibility.",
    category: "web-app",
    featured: true,
    technologies: ["Laravel", "MySQL", "PHP", "Bootstrap", "jQuery"],
    images: ["./images/CMS.png", "./images/cms-2.jpg", "./images/cms-3.jpg"],
    liveUrl: "https://app.doyeninstitute.edu.gh/",
    githubUrl: "",
    features: [
      "Secure user authentication and authorization",
      "Comprehensive case tracking and management",
      "Document upload and management system",
      "Advanced search and filtering capabilities",
      "Detailed reporting and analytics",
    ],
    challenges:
      "Building a secure and scalable case management system that handles sensitive investigation data while maintaining user-friendly interface and robust performance.",
    solution:
      "Implemented Laravel's built-in security features, created a modular architecture for easy maintenance, and optimized database queries for fast performance. Used secure file handling for document management and implemented role-based access control.",
    status: "completed",
    completedAt: "2025-10-20T08:00:00.000Z",
    client: "Investigation Agency",
    duration: "3 months",
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
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active filter button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter projects with animation
      filterProjectsWithAnimation(filter);
    });
  });
}

function filterProjectsWithAnimation(filter) {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const category = card.getAttribute("data-category");
    const shouldShow = filter === "all" || category === filter;

    if (shouldShow) {
      card.style.display = "block";
      card.classList.add("fade-in");
    } else {
      card.classList.remove("fade-in");
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });
}

// ==========================================
// PROJECT MODALS
// ==========================================

function setupProjectModals() {
  // Project modals are created dynamically when opened
  console.log("Project modals setup completed");
}

function openProjectModal(projectId) {
  // Check if modal is already open
  const existingModal = document.getElementById(`project-modal-${projectId}`);
  if (existingModal) {
    return; // Modal is already open, don't create another one
  }

  // Close any other open modals first
  const openModals = document.querySelectorAll(".modal.active");
  openModals.forEach((modal) => {
    modal.classList.remove("active");
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
    }, 300);
  });

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
                            ? `<a href="${project.liveUrl}" target="_blank" class="btn btn-primary">
                                 <i class="fas fa-external-link-alt"></i> Live Demo
                               </a>`
                            : ""
                        }
                        ${
                          project.githubUrl
                            ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">
                                 <i class="fab fa-github"></i> Source Code
                               </a>`
                            : ""
                        }
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="project-gallery">
                    <div class="gallery-main">
                        <img src="${project.images[0]}" alt="${
    project.title
  }" class="main-image">
                    </div>
                    <div class="gallery-thumbnails">
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
                </div>
                
                <div class="project-details">
                    <div class="project-description">
                        <h3>About This Project</h3>
                        <p>${project.longDescription}</p>
                    </div>
                    
                    <div class="project-tech">
                        <h3>Technologies Used</h3>
                        <div class="tech-stack">
                            ${project.technologies
                              .map(
                                (tech) =>
                                  `<span class="tech-badge">${tech}</span>`
                              )
                              .join("")}
                        </div>
                    </div>
                    
                    <div class="project-features">
                        <h3>Key Features</h3>
                        <ul class="features-list">
                            ${project.features
                              .map((feature) => `<li>${feature}</li>`)
                              .join("")}
                        </ul>
                    </div>
                    
                    <div class="project-challenges">
                        <h3>Challenges & Solutions</h3>
                        <div class="challenge-solution">
                            <div class="challenge">
                                <h4>Challenge</h4>
                                <p>${project.challenges}</p>
                            </div>
                            <div class="solution">
                                <h4>Solution</h4>
                                <p>${project.solution}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="project-info">
                        <div class="info-grid">
                            <div class="info-item">
                                <label>Client:</label>
                                <span>${project.client}</span>
                            </div>
                            <div class="info-item">
                                <label>Duration:</label>
                                <span>${project.duration}</span>
                            </div>
                            <div class="info-item">
                                <label>Completed:</label>
                                <span>${formatDate(project.completedAt)}</span>
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
  if (modal && modal.classList.contains("active")) {
    modal.classList.remove("active");
    document.body.style.overflow = "";

    // Remove event listeners to prevent memory leaks
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        closeProjectModal(projectId);
      }
    };
    document.removeEventListener("keydown", handleKeydown);

    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
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

  // Prevent modal content clicks from closing the modal
  const modalContent = modal.querySelector(".modal-content");
  if (modalContent) {
    modalContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
}

function changeMainImage(imageSrc, thumbnail) {
  const mainImage = document.querySelector(".gallery-main img");
  const thumbnails = document.querySelectorAll(".thumbnail");

  if (mainImage) {
    mainImage.src = imageSrc;
  }

  thumbnails.forEach((thumb) => thumb.classList.remove("active"));
  thumbnail.classList.add("active");
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function loadProjectsFromStorage() {
  // Load projects from localStorage if available
  const storedProjects = localStorage.getItem("portfolio_projects");
  if (storedProjects) {
    try {
      const parsedProjects = JSON.parse(storedProjects);
      if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
        projects = parsedProjects;
      }
    } catch (error) {
      console.error("Error parsing stored projects:", error);
    }
  }
}

function saveProjectsToStorage() {
  localStorage.setItem("portfolio_projects", JSON.stringify(projects));
}

function setupProjectActions() {
  // Setup any additional project actions
  console.log("Project actions setup completed");
}

// ==========================================
// MAKE FUNCTIONS GLOBALLY ACCESSIBLE
// ==========================================

// Make functions available globally for HTML onclick handlers
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.filterProjectsWithAnimation = filterProjectsWithAnimation;

// ==========================================
// EXPORT FOR TESTING
// ==========================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    projects,
    openProjectModal,
    closeProjectModal,
    filterProjectsWithAnimation,
  };
}
