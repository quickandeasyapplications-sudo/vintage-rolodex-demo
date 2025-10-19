# Quick Start: Deploy to GitHub Pages in 5 Minutes

This is a quick reference guide for deploying the Vintage Rolodex to GitHub Pages. For detailed instructions, see `GITHUB_PAGES_DEPLOYMENT_GUIDE.md`.

## Prerequisites
- Git installed
- Node.js installed
- GitHub account

## Steps

### 1. Create a GitHub Repository
- Go to https://github.com/new
- Name it: `vintage-rolodex-demo`
- Make it Public
- Click "Create repository"

### 2. Initialize and Push Code
```bash
# Navigate to the project folder
cd vintage-rolodex

# Initialize Git
git init
git add .
git commit -m "Initial commit"

# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/vintage-rolodex-demo.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository: `https://github.com/YOUR_USERNAME/vintage-rolodex-demo`
2. Click **Settings** > **Pages**
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)**
4. Click **Save**

### 4. Wait and Visit
- Wait 2-5 minutes for deployment
- Visit: `https://YOUR_USERNAME.github.io/vintage-rolodex-demo/`

## That's It!
Your Vintage Rolodex is now live! Share the URL with anyone to showcase your application.

## Update Your Live Site
```bash
# Make changes to your files, then:
git add .
git commit -m "Your changes"
git push

# Wait 2-5 minutes for automatic rebuild
```

## Troubleshooting
- **404 Error?** Check that GitHub Pages is enabled in Settings
- **Blank Page?** Check browser console (F12) for errors
- **Changes not showing?** Clear cache (Ctrl+Shift+R) and wait for rebuild

For more help, see the detailed guide: `GITHUB_PAGES_DEPLOYMENT_GUIDE.md`

