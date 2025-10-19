# Vintage Rolodex - Deployment Instructions

This document provides detailed instructions for building and deploying the Vintage Rolodex application for production use.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Building the Application](#building-the-application)
3.  [Local Production Testing](#local-production-testing)
4.  [Deployment to Static Hosting](#deployment-to-static-hosting)
    *   [General Steps](#general-steps)
    *   [Example: Netlify](#example-netlify)
    *   [Example: Vercel](#example-vercel)
    *   [Example: GitHub Pages](#example-github-pages)

---

## 1. Prerequisites

Before deploying the application, ensure you have the following installed:

*   **Node.js:** Version 18 or higher.
*   **pnpm:** Package manager (can be installed via `npm install -g pnpm`).
*   **Git:** For version control and cloning the repository.

## 2. Building the Application

To create a production-ready build of the application, follow these steps:

1.  **Navigate to the project directory:**
    ```bash
    cd vintage-rolodex
    ```

2.  **Install dependencies (if not already done):**
    ```bash
    pnpm install
    ```

3.  **Run the build command:**
    ```bash
    pnpm run build
    ```
    This command will compile the React application and optimize it for production. The output will be placed in the `dist/` directory at the root of your project.

## 3. Local Production Testing

After building the application, you can test the production build locally to ensure everything works as expected before deploying it to a live server. You can use a simple static file server for this.

1.  **Install a static file server (if you don't have one):**
    A common choice is `serve`:
    ```bash
    pnpm install -g serve
    ```

2.  **Serve the `dist` directory:**
    ```bash
    serve -s dist
    ```
    The application will typically be accessible at `http://localhost:3000` (or another port if 3000 is in use). Verify all functionalities, especially routing and data persistence.

## 4. Deployment to Static Hosting

The Vintage Rolodex application is a static web application, making it ideal for deployment on various static hosting services. These services offer high performance, scalability, and often a generous free tier.

### General Steps

1.  **Version Control:** Ensure your project is committed to a Git repository (e.g., GitHub, GitLab, Bitbucket).
2.  **Choose a Hosting Provider:** Select a static hosting service (e.g., Netlify, Vercel, GitHub Pages, Firebase Hosting, AWS S3 + CloudFront).
3.  **Connect Repository:** Connect your Git repository to the chosen hosting provider.
4.  **Configure Build Settings:** Specify the build command (`pnpm run build` or `npm run build`) and the publish directory (`dist/`).
5.  **Deploy:** Trigger a deployment. Most services will automatically deploy on every push to your main branch.

### Example: Netlify

Netlify offers seamless deployment for static sites.

1.  **Sign up/Log in to Netlify:** Go to [Netlify](https://www.netlify.com/) and create an account or log in.
2.  **New Site from Git:** Click "Add new site" -> "Import an existing project" -> "Deploy with GitHub" (or your Git provider).
3.  **Select Repository:** Choose your `vintage-rolodex` repository.
4.  **Build Settings:**
    *   **Build command:** `pnpm run build`
    *   **Publish directory:** `dist`
5.  **Deploy Site:** Click "Deploy site". Netlify will build and deploy your application, providing you with a unique URL.

### Example: Vercel

Vercel is another popular platform for deploying frontend applications.

1.  **Sign up/Log in to Vercel:** Go to [Vercel](https://vercel.com/) and create an account or log in.
2.  **Import Project:** Click "New Project" -> "Import Git Repository" -> Select your `vintage-rolodex` repository.
3.  **Configure Project:** Vercel usually auto-detects React projects. Ensure the following settings:
    *   **Framework Preset:** `Create React App` (or similar, Vercel is smart)
    *   **Build Command:** `pnpm run build`
    *   **Output Directory:** `dist`
4.  **Deploy:** Click "Deploy". Vercel will build and deploy your application.

### Example: GitHub Pages

For simpler projects or personal portfolios, GitHub Pages can be a good option.

1.  **Install `gh-pages`:**
    ```bash
    pnpm install gh-pages --save-dev
    ```

2.  **Add deploy scripts to `package.json`:**
    Open `package.json` and add the following scripts. Replace `<YOUR_GITHUB_USERNAME>` and `<YOUR_REPO_NAME>` with your actual GitHub details.
    ```json
    "homepage": "https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>",
    "scripts": {
      "predeploy": "pnpm run build",
      "deploy": "gh-pages -d dist",
      // ... other scripts
    }
    ```

3.  **Deploy to GitHub Pages:**
    ```bash
    pnpm run deploy
    ```

4.  **Configure GitHub Repository:** Go to your GitHub repository settings, navigate to "Pages" and ensure the source is set to the `gh-pages` branch and the `/root` folder.

**Note:** For a custom domain, you will need to configure DNS settings with your domain registrar and the chosen hosting provider.

