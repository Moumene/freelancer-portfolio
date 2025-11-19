# Deploying Backend to Railway

This guide will help you deploy the backend server to Railway.

## Prerequisites

1. A Railway account (sign up at https://railway.app)
2. GitHub account (to connect your repository)
3. Resend account (sign up at https://resend.com) - for email sending

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your backend code is committed and pushed to GitHub.

**Important Files:**

- `backend/package.json` - Railway uses this to detect Node.js projects
- `backend/railway.toml` - Railway configuration (already created)
- `backend/server.js` - Your server file

### 2. Create a New Project on Railway

1. Go to https://railway.app and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### 3. Configure the Service

**Option A: Railway Auto-Detection (Recommended)**

- Railway should automatically detect the `backend/` folder if it contains a `package.json`
- The `railway.toml` file in the backend folder will help Railway configure it correctly

**Option B: Create Service from Specific Path**

1. In your Railway project, click "+ New" → "GitHub Repo"
2. Select your repository
3. Railway will show a path selector - choose `backend` from the dropdown
4. Click "Deploy"

**Option C: Manual Service Configuration**

1. After connecting the repo, Railway may create a service from the root
2. Go to the service → "Settings" tab
3. Look for "Source" or "Path" settings
4. If available, set it to `backend`
5. The `railway.toml` file in the backend folder should handle the rest

**Note:** Railway's interface changes frequently. If you don't see a root directory option:

- The `railway.toml` file in the `backend/` folder should help Railway detect the correct configuration
- Railway will look for `package.json` in the service directory
- Make sure the service is pointing to the `backend/` folder path

**Alternative: Using Railway CLI**
If the web interface doesn't work, you can use Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project (from the backend directory)
cd backend
railway link

# Deploy
railway up
```

### 4. Set Up Resend

1. Sign up for a Resend account at https://resend.com
2. Get your API key:
   - Go to Dashboard → API Keys → Create API Key
   - Copy the API key (starts with `re_`)
3. (Optional) Add and verify your domain:
   - Go to Domains → Add Domain
   - Follow Resend's instructions to add DNS records in Namecheap
   - Wait for DNS verification (can take up to 72 hours)

### 5. Set Environment Variables

Go to the "Variables" tab in Railway and add the following environment variables:

#### Required Variables:

- `RESEND_API_KEY` - Your Resend API key (starts with `re_`)
- `FROM_EMAIL` - The email address to send from (e.g., `noreply@yourdomain.com` or use `onboarding@resend.dev` for testing)
- `RECIPIENT_EMAIL` - Where you want to receive contact form messages (optional, defaults to FROM_EMAIL)

#### Optional Variables:

- `PORT` - Server port (Railway sets this automatically, but you can override)
- `FRONTEND_URL` - Your frontend URL for CORS (e.g., `https://yourusername.github.io`)

### 6. Deploy

1. Railway will automatically deploy when you push to your repository
2. You can also manually trigger a deployment from the Railway dashboard
3. Check the "Deployments" tab to see the build logs

### 7. Get Your Backend URL

1. Once deployed, go to the "Settings" tab
2. Under "Domains", Railway will provide a public URL (e.g., `your-app.up.railway.app`)
3. Copy this URL - you'll need it for your frontend

### 8. Update Frontend

Update your frontend `App.jsx` file to use the Railway backend URL:

```javascript
const apiUrl =
  import.meta.env.MODE === "production"
    ? "https://your-app.up.railway.app/api/send-email" // Your Railway URL
    : "/api/send-email"; // Uses Vite proxy in development
```

Or better yet, use an environment variable:

1. Create a `.env.production` file in your frontend root:

   ```
   VITE_API_URL=https://your-app.up.railway.app
   ```

2. Update `App.jsx`:
   ```javascript
   const apiUrl =
     import.meta.env.VITE_API_URL ||
     (import.meta.env.MODE === "production"
       ? "https://your-app.up.railway.app/api/send-email"
       : "/api/send-email");
   ```

## Testing the Deployment

1. Visit `https://your-app.up.railway.app/health` - should return `{"status":"ok","message":"Server is running"}`
2. Test the email endpoint using curl or Postman:
   ```bash
   curl -X POST https://your-app.up.railway.app/api/send-email \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

## Monitoring

- Check the "Logs" tab in Railway to see server logs
- Railway provides metrics and monitoring in the dashboard
- Set up alerts if needed

## Custom Domain (Optional)

1. Go to "Settings" > "Domains"
2. Click "Generate Domain" or "Add Custom Domain"
3. Follow Railway's instructions to configure your custom domain

## Troubleshooting

### Email not sending

- Verify `RESEND_API_KEY` is set correctly in Railway environment variables
- Check that `FROM_EMAIL` is set to a verified domain email (or use `onboarding@resend.dev` for testing)
- Verify your domain DNS records in Resend dashboard if using a custom domain
- Check the Railway logs for error messages
- Make sure your Resend API key has the correct permissions

### CORS errors

- Set `FRONTEND_URL` environment variable to your frontend domain
- Make sure the frontend URL matches exactly (including https://)

### Build fails

- Check that `package.json` has the correct start script
- Verify Node.js version compatibility
- Check Railway logs for specific error messages
- Ensure Railway is detecting the `backend/` folder correctly (check build logs for the working directory)

### Service not detecting backend folder

- Make sure `railway.toml` exists in the `backend/` folder
- Try creating a new service and selecting the `backend` path during setup
- Check the build logs - they should show files from the `backend/` directory
- If Railway is building from root, you may need to delete the service and recreate it, selecting `backend` as the path

## Cost

Railway offers a free tier with:

- $5 free credit per month
- 500 hours of usage
- Perfect for small projects and portfolios

For more information, visit https://railway.app/pricing
