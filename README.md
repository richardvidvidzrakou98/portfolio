# Richard Vidzrakou - Professional Portfolio

A modern, responsive portfolio website showcasing my work as a Software Developer. Built with HTML5, CSS3, and JavaScript featuring a clean black, orange, and white design perfect for recruiters and potential clients.

🌐 **Live Demo**: [https://richardvidvidzrakou98.github.io/portfolio/](https://richardvidvidzrakou98.github.io/portfolio/)

## 🚀 Features

- **Modern Responsive Design**: Optimized for all devices and screen sizes
- **Interactive Project Showcase**: Filterable project gallery with detailed modals
- **Professional Templates**: Downloadable code templates and boilerplates
- **Presentations Gallery**: Dedicated page for talks and presentations
- **Dynamic Contact Form**: Integrated contact form with validation
- **Smooth Animations**: CSS animations and scroll effects
- **SEO Optimized**: Meta tags and semantic HTML structure
- **GitHub Pages Deployment**: Automatic CI/CD deployment with GitHub Actions

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Icons**: Font Awesome
- **Animations**: CSS Animations, AOS (Animate On Scroll)
- **Deployment**: GitHub Pages with GitHub Actions CI/CD

## 📁 Project Structure

```
portfolio/
├── index.html                 # Main portfolio page
├── css/
│   ├── main.css              # Core styles and layout
│   ├── components.css        # Component-specific styles
│   └── animations.css        # Animation and transition styles
├── js/
│   ├── main.js              # Core JavaScript functionality
│   ├── projects.js          # Project showcase logic
│   ├── templates.js         # Template management
│   └── animations.js        # Animation controls
├── images/                   # Project images and assets
├── pages/
│   ├── all-projects.html    # Complete project gallery
│   ├── templates.html       # Template library
│   └── presentations.html   # Presentation gallery
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions CI/CD
└── README.md
```

## 🚀 Quick Start

### View Live Portfolio

Visit the live portfolio at: **[https://richardvidvidzrakou98.github.io/portfolio/](https://richardvidvidzrakou98.github.io/portfolio/)**

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/richardvidvidzrakou98/portfolio.git
   cd portfolio
   ```

2. **Open locally**

   ```bash
   # Simply open index.html in your browser, or use a local server:

   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

3. **Make changes**

   - Edit HTML in `index.html` or page files in `pages/`
   - Modify styles in `css/` directory
   - Update JavaScript in `js/` directory
   - Add images to `images/` directory

4. **Deploy changes**

   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

   GitHub Actions will automatically deploy your changes to GitHub Pages!

## 📧 Email Configuration

To enable the contact form, you'll need to configure email settings:

1. **Gmail Setup**

   - Enable 2-factor authentication
   - Generate an app password
   - Use the app password in `EMAIL_PASS`

2. **Environment Variables**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=richardvidzrakou98@gmail.com
   ```

## 🎨 Customization

### Colors

The main colors are defined in CSS variables in `css/main.css`:

```css
:root {
  --primary-black: #0a0a0a;
  --primary-orange: #ff6b35;
  --primary-white: #ffffff;
}
```

### Content

- Update personal information in `index.html`
- Add your projects in the projects section
- Upload your profile image and project screenshots
- Customize the about section with your experience

### Projects

Add new projects by updating the projects array in `js/projects.js` or through the backend API.

## 📱 API Endpoints

### Templates

- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get specific template
- `POST /api/templates/upload` - Upload new template
- `GET /api/templates/:id/download` - Download template

### Presentations

- `GET /api/presentations` - Get all presentations
- `GET /api/presentations/:id` - Get specific presentation
- `POST /api/presentations/upload` - Upload new presentation
- `GET /api/presentations/:id/download` - Download presentation

### Contact

- `POST /api/contact` - Send contact message
- `GET /api/contact/info` - Get contact information

## 🔧 Development

### Prerequisites

- Node.js (v14 or higher)
- Git

### Local Development

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Open `index.html` in your browser or use a local server:

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx http-server
   ```

### Adding New Features

1. Frontend changes go in the respective CSS/JS files
2. Backend API changes go in the `backend/routes/` directory
3. New pages should be added to the `pages/` directory

## 🚀 Deployment Checklist

### Frontend (GitHub Pages)

- [ ] Update API_BASE_URL in `js/templates.js` to your Render backend URL
- [ ] Test all functionality locally
- [ ] Push to GitHub repository
- [ ] Enable GitHub Pages in repository settings

### Backend (Render)

- [ ] Set all environment variables
- [ ] Test email functionality
- [ ] Verify file upload limits
- [ ] Check CORS settings for your frontend domain

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Richard Vidzrakou**

- Email: richardvidzrakou98@gmail.com
- LinkedIn: [richard-vidzrakou](https://www.linkedin.com/in/richard-vidzrakou-53aa0422b/)
- GitHub: [richardvidvidzrakou98](https://github.com/richardvidvidzrakou98)
- Phone: +233 505 631 264

---

⭐ **Star this repository if you found it helpful!**
