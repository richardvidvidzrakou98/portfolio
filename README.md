# Richard Vidzrakou - Professional Portfolio

A modern, professional portfolio website showcasing my work as a Senior Software Developer. Built with a clean black, orange, and white design that's perfect for recruiters and potential clients.

## 🚀 Features

- **Modern Design**: Clean, minimalistic design with professional color scheme
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Project Showcase**: Filterable project gallery with detailed modals
- **Template Library**: Downloadable templates and boilerplates
- **Presentations**: Dedicated page for slides and talks
- **Contact Form**: Integrated contact form with email notifications
- **Backend API**: Node.js/Express backend for dynamic content management
- **SEO Optimized**: Optimized for search engines and social sharing

## 🛠️ Tech Stack

### Frontend

- HTML5, CSS3, JavaScript (ES6+)
- Font Awesome icons
- AOS (Animate On Scroll) library
- Responsive CSS Grid and Flexbox

### Backend

- Node.js with Express.js
- Multer for file uploads
- Nodemailer for email functionality
- Rate limiting and security middleware

## 📁 Project Structure

```
portfolio/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── main.css
│   │   ├── components.css
│   │   └── animations.css
│   ├── js/
│   │   ├── main.js
│   │   ├── templates.js
│   │   ├── projects.js
│   │   └── animations.js
│   ├── pages/
│   │   └── presentations.html
│   ├── assets/
│   │   └── icons/
│   └── images/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── templates.js
│   │   ├── presentations.js
│   │   └── contact.js
│   ├── uploads/
│   │   ├── templates/
│   │   └── presentations/
│   └── middleware/
└── README.md
```

## 🚀 Quick Start

### Frontend (Static Hosting on GitHub Pages)

1. **Clone the repository**

   ```bash
   git clone https://github.com/richardvidvidzrakou98/portfolio.git
   cd portfolio
   ```

2. **Deploy to GitHub Pages**
   - Push the code to your GitHub repository
   - Go to Settings > Pages
   - Select source as "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Your site will be available at `https://yourusername.github.io/portfolio`

### Backend (Hosting on Render)

1. **Install dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:

   ```env
   NODE_ENV=production
   PORT=5000

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=richardvidzrakou98@gmail.com
   ```

3. **Local Development**

   ```bash
   npm run dev
   ```

4. **Deploy to Render**
   - Create a new Web Service on [Render](https://render.com)
   - Connect your GitHub repository
   - Set the following:
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && npm start`
     - **Environment**: Add all variables from your `.env` file
   - Deploy!

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
