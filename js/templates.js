/* ==========================================
   TEMPLATES MANAGEMENT
   Template upload, preview, and download functionality
   ========================================== */

// API Configuration
const API_BASE_URL = "http://localhost:5000/api"; // Change this for production

// Template data will be loaded from API
let templates = [];
let currentFilter = "all";

// Initialize templates when page loads
document.addEventListener("DOMContentLoaded", function () {
  loadTemplates();
  initializeTemplateUpload();
});

// Load templates from API
async function loadTemplates(category = "all") {
  try {
    const response = await fetch(
      `${API_BASE_URL}/templates?category=${category}`
    );
    const result = await response.json();

    if (result.success) {
      templates = result.data;
      renderTemplates();
    } else {
      console.error("Failed to load templates:", result.message);
      // Fallback to sample data
      loadSampleTemplates();
    }
  } catch (error) {
    console.error("Error loading templates:", error);
    // Fallback to sample data
    loadSampleTemplates();
  }
}

// Fallback sample templates (for when backend is not available)
function loadSampleTemplates() {
  templates = [
    {
      id: "react-dashboard",
      name: "React Dashboard",
      description:
        "Modern React dashboard template with authentication, routing, and state management.",
      technologies: ["React 18", "TypeScript", "Tailwind CSS"],
      category: "React",
      downloadCount: 1247,
      featured: true,
      createdAt: "2024-12-01",
    },
    {
      id: "flutter-ecommerce",
      name: "Flutter E-commerce",
      description:
        "Complete Flutter e-commerce app with payment integration and admin panel.",
      technologies: ["Flutter 3.0", "Firebase", "Payment Gateway"],
      category: "Flutter",
      downloadCount: 892,
      featured: true,
      createdAt: "2024-11-15",
    },
    {
      id: "wp-business",
      name: "Business WordPress Theme",
      description:
        "Professional WordPress theme for business websites with custom post types.",
      technologies: ["WordPress 6.0", "Elementor", "WooCommerce"],
      category: "WordPress",
      downloadCount: 567,
      featured: false,
      createdAt: "2024-10-20",
    },
    {
      id: "node-api",
      name: "Node.js API Starter",
      description:
        "RESTful API template with authentication, validation, and documentation.",
      technologies: ["Express.js", "MongoDB", "JWT", "Swagger"],
      category: "Node.js",
      downloadCount: 234,
      featured: false,
      createdAt: "2024-09-15",
    },
  ];
  renderTemplates();
}

// Render templates in the grid
function renderTemplates() {
  const templatesGrid = document.querySelector(".templates-grid");
  if (!templatesGrid) return;

  templatesGrid.innerHTML = "";

  templates.forEach((template, index) => {
    const templateCard = document.createElement("div");
    templateCard.className = "template-card";
    templateCard.setAttribute("data-aos", "fade-up");
    templateCard.setAttribute("data-aos-delay", (index * 100 + 200).toString());

    const iconClass = getTemplateIcon(template.category);
    const technologies = template.technologies || [];

    templateCard.innerHTML = `
            <div class="template-icon">
                <i class="${iconClass}"></i>
            </div>
            <h3>${template.name}</h3>
            <p>${template.description}</p>
            <div class="template-features">
                ${technologies
                  .map((tech) => `<span class="feature-tag">${tech}</span>`)
                  .join("")}
            </div>
            <div class="template-stats">
                <span class="download-count">
                    <i class="fas fa-download"></i>
                    ${template.downloadCount || 0} downloads
                </span>
                ${
                  template.featured
                    ? '<span class="featured-badge">Featured</span>'
                    : ""
                }
            </div>
            <div class="template-actions">
                <button class="btn btn-sm btn-outline" onclick="previewTemplate('${
                  template.id
                }')">
                    <i class="fas fa-eye"></i>
                    Preview
                </button>
                <button class="btn btn-sm btn-primary" onclick="downloadTemplate('${
                  template.id
                }')">
                    <i class="fas fa-download"></i>
                    Download
                </button>
            </div>
        `;

    templatesGrid.appendChild(templateCard);
  });
}

// Get appropriate icon for template category
function getTemplateIcon(category) {
  const iconMap = {
    React: "fab fa-react",
    Flutter: "fab fa-flutter",
    WordPress: "fab fa-wordpress",
    "Node.js": "fab fa-node-js",
    Vue: "fab fa-vuejs",
    Angular: "fab fa-angular",
    PHP: "fab fa-php",
    Python: "fab fa-python",
  };

  return iconMap[category] || "fas fa-code";
}

// Filter templates by category
function filterTemplates(category) {
  currentFilter = category;

  // Update filter buttons
  document.querySelectorAll(".template-filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`[data-filter="${category}"]`)
    ?.classList.add("active");

  // Load templates with filter
  loadTemplates(category);
}

// Download template with API integration
async function downloadTemplate(templateId) {
  try {
    showNotification("Preparing download...", "info");

    const response = await fetch(
      `${API_BASE_URL}/templates/${templateId}/download`
    );

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `template-${templateId}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showNotification("Template downloaded successfully!", "success");
    } else {
      const result = await response.json();
      showNotification(
        result.message || "Download will be available soon!",
        "info"
      );
    }
  } catch (error) {
    console.error("Download error:", error);
    showNotification("Template download coming soon!", "info");
  }
}

// Preview template
function previewTemplate(templateId) {
  const template = templates.find((t) => t.id === templateId);
  if (!template) return;

  showNotification("Template preview coming soon!", "info");

  // In the future, this could open a modal with template preview
  // or redirect to a preview page
}

// Initialize template upload functionality
function initializeTemplateUpload() {
  const uploadArea = document.getElementById("template-upload");
  const uploadForm = document.getElementById("template-upload-form");

  if (uploadForm) {
    uploadForm.addEventListener("submit", handleTemplateUploadForm);
  }
}

// Handle template upload form submission
async function handleTemplateUploadForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    showNotification("Uploading template...", "info");

    const response = await fetch(`${API_BASE_URL}/templates/upload`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      showNotification("Template uploaded successfully!", "success");
      loadTemplates(); // Reload templates
      event.target.reset(); // Reset form
    } else {
      showNotification(result.message || "Upload failed", "error");
    }
  } catch (error) {
    console.error("Upload error:", error);
    showNotification("Upload failed. Please try again.", "error");
  }
}

// ==========================================
// INITIALIZATION (Updated)
// ==========================================

function initializeTemplates() {
  initializeTemplateUpload();
  setupTemplatePreview();
  setupTemplateDownload();
  loadTemplatesFromStorage();
}

// ==========================================
// TEMPLATE UPLOAD
// ==========================================

function setupTemplateUpload() {
  const uploadArea = document.getElementById("template-upload");
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.multiple = true;
  fileInput.accept = ".zip,.rar,.tar.gz";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  if (uploadArea) {
    // Click to upload
    uploadArea.addEventListener("click", () => {
      fileInput.click();
    });

    // Drag and drop functionality
    uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadArea.classList.add("drag-over");
    });

    uploadArea.addEventListener("dragleave", (e) => {
      e.preventDefault();
      uploadArea.classList.remove("drag-over");
    });

    uploadArea.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadArea.classList.remove("drag-over");

      const files = Array.from(e.dataTransfer.files);
      handleTemplateUpload(files);
    });

    // File input change
    fileInput.addEventListener("change", (e) => {
      const files = Array.from(e.target.files);
      handleTemplateUpload(files);
    });
  }
}

function handleTemplateUpload(files) {
  if (files.length === 0) return;

  // Show upload modal
  showUploadModal(files);
}

function showUploadModal(files) {
  const modal = createUploadModal(files);
  document.body.appendChild(modal);

  // Show modal
  setTimeout(() => {
    modal.classList.add("active");
  }, 100);
}

function createUploadModal(files) {
  const modal = document.createElement("div");
  modal.className = "modal template-upload-modal";

  modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close" onclick="closeUploadModal()">&times;</span>
            <h2>Upload Template</h2>
            <div class="upload-form">
                <div class="upload-files">
                    <h4>Files to Upload:</h4>
                    ${files
                      .map(
                        (file) => `
                        <div class="file-item">
                            <i class="fas fa-file-archive"></i>
                            <span class="file-name">${file.name}</span>
                            <span class="file-size">(${formatFileSize(
                              file.size
                            )})</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                <form class="template-form" onsubmit="submitTemplate(event)">
                    <div class="form-group">
                        <label for="template-name">Template Name</label>
                        <input type="text" id="template-name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="template-description">Description</label>
                        <textarea id="template-description" name="description" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="template-category">Category</label>
                        <select id="template-category" name="category" required>
                            <option value="">Select Category</option>
                            <option value="web">Web Development</option>
                            <option value="mobile">Mobile Development</option>
                            <option value="wordpress">WordPress</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="template-features">Features (comma-separated)</label>
                        <input type="text" id="template-features" name="features" 
                               placeholder="React, TypeScript, Tailwind CSS">
                    </div>
                    <div class="form-group">
                        <label for="template-thumbnail">Thumbnail Image</label>
                        <input type="file" id="template-thumbnail" name="thumbnail" accept="image/*">
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="closeUploadModal()">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-upload"></i>
                            Upload Template
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

  return modal;
}

function submitTemplate(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');

  // Show loading state
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Uploading...';
  submitButton.disabled = true;

  // Create template object
  const template = {
    id: generateTemplateId(),
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    features: formData
      .get("features")
      .split(",")
      .map((f) => f.trim()),
    author: "Richard Vidzrakou",
    downloads: 0,
    rating: 0,
    createdAt: new Date().toISOString().split("T")[0],
    thumbnailUrl: "./images/default-template-thumb.jpg", // Default thumbnail
  };

  // Simulate upload process
  setTimeout(() => {
    // Add to templates array
    templates.unshift(template);

    // Save to localStorage
    saveTemplatesToStorage();

    // Show success message
    showNotification("Template uploaded successfully!", "success");

    // Close modal
    closeUploadModal();

    // Refresh templates display
    refreshTemplatesDisplay();

    // Reset button
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
  }, 2000);
}

function closeUploadModal() {
  const modal = document.querySelector(".template-upload-modal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

// ==========================================
// TEMPLATE PREVIEW
// ==========================================

function previewTemplate(templateId) {
  const template = templates.find((t) => t.id === templateId);
  if (!template) return;

  // Create preview modal
  const modal = createPreviewModal(template);
  document.body.appendChild(modal);

  // Show modal
  setTimeout(() => {
    modal.classList.add("active");
  }, 100);
}

function createPreviewModal(template) {
  const modal = document.createElement("div");
  modal.className = "modal template-preview-modal";

  modal.innerHTML = `
        <div class="modal-content large">
            <span class="modal-close" onclick="closePreviewModal()">&times;</span>
            <div class="preview-header">
                <h2>${template.name}</h2>
                <div class="template-meta">
                    <span class="template-author">by ${template.author}</span>
                    <div class="template-rating">
                        ${generateStarRating(template.rating)}
                        <span class="rating-value">(${template.rating})</span>
                    </div>
                    <span class="download-count">${
                      template.downloads
                    } downloads</span>
                </div>
            </div>
            <div class="preview-content">
                <div class="preview-image">
                    <img src="${
                      template.thumbnailUrl ||
                      "./images/default-template-thumb.jpg"
                    }" 
                         alt="${template.name}" 
                         onerror="this.src='./images/default-template-thumb.jpg'">
                </div>
                <div class="preview-details">
                    <div class="template-description">
                        <h4>Description</h4>
                        <p>${template.description}</p>
                    </div>
                    <div class="template-features">
                        <h4>Features</h4>
                        <div class="features-list">
                            ${template.features
                              .map(
                                (feature) => `
                                <span class="feature-tag">${feature}</span>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                    <div class="template-category">
                        <h4>Category</h4>
                        <span class="category-badge">${template.category}</span>
                    </div>
                    <div class="template-date">
                        <h4>Created</h4>
                        <span>${formatDate(template.createdAt)}</span>
                    </div>
                </div>
            </div>
            <div class="preview-actions">
                <button class="btn btn-outline" onclick="closePreviewModal()">
                    Close
                </button>
                <button class="btn btn-primary" onclick="downloadTemplate('${
                  template.id
                }')">
                    <i class="fas fa-download"></i>
                    Download Template
                </button>
            </div>
        </div>
    `;

  return modal;
}

function closePreviewModal() {
  const modal = document.querySelector(".template-preview-modal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

// ==========================================
// TEMPLATE DOWNLOAD
// ==========================================

function downloadTemplate(templateId) {
  const template = templates.find((t) => t.id === templateId);
  if (!template) return;

  // Show download confirmation
  showDownloadConfirmation(template);
}

function showDownloadConfirmation(template) {
  const modal = document.createElement("div");
  modal.className = "modal download-confirmation-modal";

  modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close" onclick="closeDownloadConfirmation()">&times;</span>
            <div class="download-confirmation">
                <div class="download-icon">
                    <i class="fas fa-download"></i>
                </div>
                <h3>Download ${template.name}</h3>
                <p>You're about to download this template. Please note that this is a demo portfolio and actual downloads are not available.</p>
                <div class="download-info">
                    <div class="info-item">
                        <strong>Template:</strong> ${template.name}
                    </div>
                    <div class="info-item">
                        <strong>Category:</strong> ${template.category}
                    </div>
                    <div class="info-item">
                        <strong>Author:</strong> ${template.author}
                    </div>
                </div>
                <div class="download-actions">
                    <button class="btn btn-outline" onclick="closeDownloadConfirmation()">
                        Cancel
                    </button>
                    <button class="btn btn-primary" onclick="processDownload('${template.id}')">
                        <i class="fas fa-download"></i>
                        Proceed with Download
                    </button>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  setTimeout(() => {
    modal.classList.add("active");
  }, 100);
}

function processDownload(templateId) {
  const template = templates.find((t) => t.id === templateId);
  if (!template) return;

  // Update download count
  template.downloads++;
  saveTemplatesToStorage();

  // Close confirmation modal
  closeDownloadConfirmation();

  // Show download simulation
  showDownloadProgress(template);
}

function showDownloadProgress(template) {
  const modal = document.createElement("div");
  modal.className = "modal download-progress-modal";

  modal.innerHTML = `
        <div class="modal-content">
            <div class="download-progress">
                <div class="progress-icon">
                    <i class="fas fa-download"></i>
                </div>
                <h3>Downloading ${template.name}</h3>
                <div class="progress-bar">
                    <div class="progress-fill" id="download-progress"></div>
                </div>
                <div class="progress-text">
                    <span id="progress-percentage">0%</span>
                    <span id="progress-status">Preparing download...</span>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
  modal.classList.add("active");

  // Simulate download progress
  simulateDownload();
}

function simulateDownload() {
  const progressFill = document.getElementById("download-progress");
  const progressPercentage = document.getElementById("progress-percentage");
  const progressStatus = document.getElementById("progress-status");

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;

    progressFill.style.width = progress + "%";
    progressPercentage.textContent = Math.floor(progress) + "%";

    if (progress < 30) {
      progressStatus.textContent = "Preparing download...";
    } else if (progress < 70) {
      progressStatus.textContent = "Downloading files...";
    } else if (progress < 100) {
      progressStatus.textContent = "Finalizing...";
    } else {
      progressStatus.textContent = "Download complete!";
      clearInterval(interval);

      setTimeout(() => {
        const modal = document.querySelector(".download-progress-modal");
        if (modal) {
          modal.classList.remove("active");
          setTimeout(() => modal.remove(), 300);
        }

        showNotification("Template download completed! (Demo only)", "success");
      }, 1000);
    }
  }, 200);
}

function closeDownloadConfirmation() {
  const modal = document.querySelector(".download-confirmation-modal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

// ==========================================
// TEMPLATE MANAGEMENT
// ==========================================

function refreshTemplatesDisplay() {
  const templatesGrid = document.querySelector(".templates-grid");
  if (!templatesGrid) return;

  templatesGrid.innerHTML = "";

  templates.forEach((template) => {
    const templateCard = createTemplateCard(template);
    templatesGrid.appendChild(templateCard);
  });
}

function createTemplateCard(template) {
  const card = document.createElement("div");
  card.className = "template-card";
  card.setAttribute("data-aos", "fade-up");

  card.innerHTML = `
        <div class="template-icon">
            <i class="fab fa-${getTemplateIcon(template.category)}"></i>
        </div>
        <h3>${template.name}</h3>
        <p>${template.description}</p>
        <div class="template-features">
            ${template.features
              .map(
                (feature) => `
                <span class="feature-tag">${feature}</span>
            `
              )
              .join("")}
        </div>
        <div class="template-stats">
            <span class="download-count">
                <i class="fas fa-download"></i> ${template.downloads}
            </span>
            <span class="rating">
                <i class="fas fa-star"></i> ${template.rating}
            </span>
        </div>
        <div class="template-actions">
            <button class="btn btn-sm btn-outline" onclick="previewTemplate('${
              template.id
            }')">
                <i class="fas fa-eye"></i>
                Preview
            </button>
            <button class="btn btn-sm btn-primary" onclick="downloadTemplate('${
              template.id
            }')">
                <i class="fas fa-download"></i>
                Download
            </button>
        </div>
    `;

  return card;
}

// ==========================================
// STORAGE MANAGEMENT
// ==========================================

function saveTemplatesToStorage() {
  localStorage.setItem("portfolio_templates", JSON.stringify(templates));
}

function loadTemplatesFromStorage() {
  const storedTemplates = localStorage.getItem("portfolio_templates");
  if (storedTemplates) {
    templates = JSON.parse(storedTemplates);
    refreshTemplatesDisplay();
  }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function generateTemplateId() {
  return (
    "template_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
  );
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let stars = "";

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }

  // Half star
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

function getTemplateIcon(category) {
  const icons = {
    web: "react",
    mobile: "flutter",
    wordpress: "wordpress",
    other: "code",
  };

  return icons[category] || "code";
}

// ==========================================
// API INTEGRATION (for future use)
// ==========================================

async function uploadTemplateToServer(templateData, files) {
  try {
    const formData = new FormData();
    formData.append("templateData", JSON.stringify(templateData));

    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch("/api/templates/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

// ==========================================
// EXPORT FOR TESTING
// ==========================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    templates,
    previewTemplate,
    downloadTemplate,
    generateTemplateId,
    formatFileSize,
    formatDate,
  };
}
