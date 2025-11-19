# Deployment Guide

This guide explains how to deploy the frontend to GitHub Pages and connect it to your Railway backend.

## Prerequisites

1. GitHub repository set up
2. Railway backend deployed and running
3. Railway backend URL (e.g., `https://your-app.up.railway.app`)

## Step 1: Configure Railway Backend URL

### Option A: Using Environment File (Recommended)

1. Create a `.env.production` file in the `frontend/` directory:
   ```bash
   cd frontend
   cp .env.production.example .env.production
   ```

2. Edit `.env.production` and add your Railway backend URL:
   ```
   VITE_API_URL=https://your-app.up.railway.app
   ```

3. **Important**: Add `.env.production` to `.gitignore` if it contains sensitive URLs, or commit it if it's just the public Railway URL.

### Option B: Set Environment Variable Before Build

You can also set the environment variable when building:
```bash
VITE_API_URL=https://your-app.up.railway.app npm run build
```

## Step 2: Build the Frontend

```bash
cd frontend
npm run build
```

This will:
- Build the production bundle
- Create a `dist/` folder with all assets
- Copy `index.html` to `404.html` for GitHub Pages SPA routing

## Step 3: Deploy to GitHub Pages

### Automatic Deployment (Recommended)

The `package.json` already has a deploy script configured:

```bash
cd frontend
npm run deploy
```

This will:
1. Build the project (`predeploy` script)
2. Deploy the `dist/` folder to the `gh-pages` branch

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy using gh-pages:
   ```bash
   npx gh-pages -d dist
   ```

## Step 4: Configure GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Select **gh-pages** branch
5. Select **/ (root)** folder
6. Click **Save**

Your site will be available at:
```
https://yourusername.github.io/freelancer-portfolio/
```

(Replace `yourusername` and `freelancer-portfolio` with your actual GitHub username and repository name)

## Step 5: Configure Railway Backend CORS

Make sure your Railway backend allows requests from your GitHub Pages domain:

1. Go to your Railway project
2. Navigate to **Variables**
3. Add or update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://yourusername.github.io
   ```

This ensures CORS is properly configured.

## Step 6: Test the Deployment

1. Visit your GitHub Pages URL
2. Open the browser console (F12)
3. Try submitting the contact form
4. Check that the request goes to your Railway backend
5. Verify you receive the email

## Troubleshooting

### Contact form not working

1. **Check the API URL**: Open browser console and check the Network tab to see what URL is being called
2. **Verify Railway backend**: Visit `https://your-app.up.railway.app/health` to ensure backend is running
3. **Check CORS**: Make sure `FRONTEND_URL` is set correctly in Railway
4. **Check environment variable**: Ensure `VITE_API_URL` was set during build

### 404 errors on page refresh

This is normal for SPAs on GitHub Pages. The `404.html` file should handle this, but if it doesn't:
- Make sure `dist/404.html` exists (created by the build script)
- Verify GitHub Pages is serving from the `gh-pages` branch

### Assets not loading

- Check that `vite.config.js` has the correct `base` path matching your repository name
- Verify all image imports are using relative imports (not absolute paths)

## Updating the Deployment

After making changes:

1. Update `.env.production` if Railway URL changed
2. Build: `npm run build`
3. Deploy: `npm run deploy`

Or use the combined command:
```bash
npm run deploy
```

## Development vs Production

- **Development**: Uses Vite proxy (`/api` → `http://localhost:3001`)
- **Production**: Uses `VITE_API_URL` environment variable (Railway backend)

Make sure your backend is running on `localhost:3001` when developing locally.

