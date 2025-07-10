# Portfolio Deployment Guide

This guide provides comprehensive instructions for deploying the portfolio website, which consists of:

- **Frontend**: Static client-side portfolio (GitHub Pages)
- **Backend**: Node.js/Express API with PostgreSQL (Render)
- **Admin Dashboard**: Administrative interface (Render)

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Pages  │    │   Render.com    │    │   PostgreSQL    │
│   (Frontend)    │───▶│   (Backend)     │───▶│   (Database)    │
│   Static Files  │    │   API + Admin   │    │   Data Storage  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## � Database Setup and Troubleshooting

### Database Schema Options

This project includes three database schema versions to handle different PostgreSQL configurations:

1. **schema-simple.sql** (Recommended) - Uses SERIAL IDs only, no extensions required
2. **schema-no-extension.sql** - Uses gen_random_uuid() (PostgreSQL 13+)
3. **schema.sql** - Uses uuid-ossp extension (requires superuser privileges)

### Automated Setup Process

1. **Install Dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment**

   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Test Database Connection**

   ```bash
   npm run test:db
   ```

4. **Run Migration**
   ```bash
   npm run migrate
   ```

The migration script automatically selects the most compatible schema version.

### Manual Database Setup (If Automated Fails)

1. **Create Database**

   ```sql
   CREATE DATABASE portfolio_db;
   ```

2. **Run Simple Schema**
   ```bash
   psql -h localhost -U your_username -d portfolio_db -f backend/database/schema-simple.sql
   ```

### Common PostgreSQL Issues and Solutions

#### 1. "permission denied to create extension 'uuid-ossp'"

**Solution A: Use Simple Schema (Recommended)**

```bash
cd backend
npm run migrate
# The script will automatically use schema-simple.sql
```

**Solution B: Request Extension Installation**
Contact your database administrator to run:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

**Solution C: Alternative User Permissions**

```sql
-- As superuser, grant extension creation rights
ALTER USER your_username CREATEDB;
-- Or grant specific extension rights
GRANT CREATE ON SCHEMA public TO your_username;
```

#### 2. "function gen_random_uuid() does not exist"

This occurs on PostgreSQL versions < 13. Solutions:

**Solution A: Use Simple Schema**

```bash
# The migration script will handle this automatically
npm run migrate
```

**Solution B: Manual Schema Selection**

```bash
psql -d portfolio_db -f backend/database/schema-simple.sql
```

#### 3. npm install Issues

**Error: "Module 'pg' not found"**

```bash
cd backend
npm install pg bcryptjs jsonwebtoken joi --save
```

**Error: "Python/Build tools required"**
On Windows:

```bash
npm install --global windows-build-tools
# Or install Visual Studio Build Tools
```

On Ubuntu/Debian:

```bash
sudo apt-get install python3 make g++
```

On macOS:

```bash
xcode-select --install
```

#### 4. Database Connection Issues

**Check Environment Variables**

```bash
cd backend
npm run test:db
```

**Common .env Issues:**

```env
# ❌ Wrong format
DATABASE_URL="postgresql://user:pass@host:port/db"

# ✅ Correct format (no quotes)
DATABASE_URL=postgresql://user:pass@host:port/db

# ✅ Alternative format
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=your_username
DB_PASSWORD=your_password
```

#### 5. Render.com Deployment Issues

**PostgreSQL External Connection**

- Ensure you're using the External Database URL
- Enable external connections in Render database settings

**Build Failures**

```bash
# In Render build command:
cd backend && npm install

# In Render start command:
cd backend && npm start
```

**Environment Variables in Render**

- Set all environment variables in Render dashboard
- Don't include quotes around values
- Use the External Database URL for DATABASE_URL

### Database Migration Flow

```
┌─────────────────┐
│   npm run       │
│   migrate       │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Check for       │
│ schema-simple   │
│ .sql            │
└─────────┬───────┘
          │ Found
          ▼
┌─────────────────┐     ┌─────────────────┐
│ Execute Simple  │     │ Check for       │
│ Schema (SERIAL  │ ◄─── │ schema-no-      │
│ IDs only)       │     │ extension.sql   │
└─────────────────┘     └─────────┬───────┘
                                  │ Not Found
                                  ▼
                        ┌─────────────────┐
                        │ Check for       │
                        │ original        │
                        │ schema.sql      │
                        └─────────────────┘
```

### Testing Your Setup

1. **Database Connection Test**

   ```bash
   cd backend
   npm run test:db
   ```

2. **API Health Check**

   ```bash
   curl http://localhost:3001/api/health
   ```

3. **Admin Login Test**
   ```bash
   curl -X POST http://localhost:3001/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"username":"admin","password":"change-this-password"}'
   ```

### Production Checklist

- [ ] Database migration completed successfully
- [ ] Admin user created and password changed
- [ ] Environment variables set correctly
- [ ] API endpoints responding
- [ ] Frontend connecting to backend
- [ ] Email notifications working
- [ ] Admin dashboard accessible
- [ ] CORS configured for production domain

## �🚀 Quick Deployment Steps

### 1. Frontend Deployment (GitHub Pages)

1. **Prepare Repository**

   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

2. **Enable GitHub Pages**

   - Go to your repository on GitHub
   - Click Settings > Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Save

3. **Update API URLs**
   - In `js/config.js`, update:
   ```javascript
   const API_BASE_URL = "https://your-app-name.onrender.com/api";
   ```

### 2. Backend Deployment (Render)

1. **Create PostgreSQL Database**

   - In Render dashboard: New > PostgreSQL
   - Name: `portfolio-db`
   - Note the connection string

2. **Create Web Service**

   - Click "New" > "Web Service"
   - Connect your repository
   - Configuration:
     - **Name**: `portfolio-api`
     - **Environment**: Node
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && npm start`
     - **Instance Type**: Free

3. **Set Environment Variables**
   ```env
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=postgresql://user:pass@host:port/db
   JWT_SECRET=your-super-secret-jwt-key
   CORS_ORIGIN=https://yourusername.github.io
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=secure-password
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=richardvidzrakou98@gmail.com
   ```

### 3. Email Setup (Gmail)

1. **Enable 2FA**

   - Go to Google Account settings
   - Security > 2-Step Verification

2. **Generate App Password**

   - Security > App passwords
   - Select app: Mail
   - Generate and copy the 16-character password

3. **Update Environment Variables**
   - Use the app password in `EMAIL_PASS`

### 4. Testing

1. **Test Frontend**

   - Visit your GitHub Pages URL
   - Check all sections load correctly
   - Test navigation and animations

2. **Test Backend**
   - Test contact form
   - Verify template downloads
   - Check API endpoints

### 5. Custom Domain (Optional)

1. **Purchase Domain**

   - Buy from any domain registrar

2. **Configure DNS**

   - Add CNAME record pointing to `username.github.io`

3. **Update GitHub Pages**
   - Settings > Pages > Custom domain
   - Add your domain

## 🔧 Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- [Git](https://git-scm.com/)

### 1. Install Dependencies

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install
```

### 2. Database Setup

```bash
# Create PostgreSQL database (using psql or pgAdmin)
createdb portfolio_db

# OR using psql command line:
psql -U postgres
CREATE DATABASE portfolio_db;
\q
```

### 3. Environment Configuration

```bash
# Copy the environment template
cp .env.example .env

# Edit .env file with your database credentials
# Update DATABASE_URL with your PostgreSQL connection string
# Example: postgresql://username:password@localhost:5432/portfolio_db
```

### 4. Initialize Database

```bash
# Run database setup (creates tables and admin user)
npm run setup

# Alternative: Run individual steps
npm run setup:schema    # Create tables only
npm run setup:admin     # Create admin user only
npm run setup:data      # Insert sample data only
```

### 5. Start Development Server

```bash
# Start backend server (in backend directory)
npm run dev

# Server will run on http://localhost:3000
# Admin dashboard: http://localhost:3000/admin
# API health check: http://localhost:3000/health
```

### 6. Frontend Development

```bash
# Navigate back to root directory
cd ..

# Start frontend (use any local server)
# Option 1: Using Live Server (VS Code extension)
# Right-click index.html and select "Open with Live Server"

# Option 2: Using Python
python -m http.server 8000

# Option 3: Using Node.js http-server
npx http-server -p 8000

# Frontend will be available at: http://localhost:8000
```

## 📝 Post-Deployment Checklist

- [ ] All images load correctly
- [ ] Contact form works
- [ ] API endpoints respond
- [ ] Mobile responsive
- [ ] SEO meta tags updated
- [ ] Social links work
- [ ] Analytics setup (optional)

## 🆘 Troubleshooting

### Setup Issues

**Error: Cannot find module 'pg'**

```bash
# Install missing dependencies
cd backend
npm install
```

**Database connection failed**

```bash
# Check if PostgreSQL is running
# Windows: Check Services for PostgreSQL
# Mac: brew services list | grep postgres
# Linux: sudo systemctl status postgresql

# Verify database exists
psql -U postgres -l

# Test connection manually
psql -U username -d portfolio_db
```

**Permission denied errors**

```bash
# Make sure PostgreSQL user has correct permissions
# Create user if needed:
psql -U postgres
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO your_username;
\q
```

**Environment variables not loading**

```bash
# Ensure .env file is in backend directory
ls backend/.env

# Check file content (be careful not to expose secrets)
head backend/.env
```

### Frontend Issues

- **Images not loading**: Check file paths and names
- **Styles broken**: Verify CSS file links
- **JavaScript errors**: Check browser console

### Backend Issues

- **API not responding**: Check Render logs
- **Email not sending**: Verify Gmail app password
- **CORS errors**: Add frontend domain to CORS settings

### Common Fixes

```javascript
// Update API URL for production
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://your-app-name.onrender.com/api";
```

## 📊 Monitoring

1. **Render Dashboard**

   - Monitor deployment status
   - Check logs for errors
   - View performance metrics

2. **GitHub Pages**

   - Check deployment status in Actions tab
   - Monitor build logs

3. **Analytics** (Optional)
   - Add Google Analytics
   - Monitor visitor traffic
   - Track contact form submissions

Your portfolio should now be live! 🎉
