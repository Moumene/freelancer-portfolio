# Deploying Backend to Railway

This guide will help you deploy the backend server to Railway.

## Prerequisites

1. A Railway account (sign up at https://railway.app)
2. GitHub account (to connect your repository)
3. Email credentials (Gmail App Password or other SMTP credentials)

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your backend code is committed and pushed to GitHub.

### 2. Create a New Project on Railway

1. Go to https://railway.app and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will detect the backend folder automatically, or you can specify it

### 3. Configure the Service

1. In your Railway project, click on the service
2. Go to the "Settings" tab
3. Set the **Root Directory** to `backend` (if not auto-detected)
4. Set the **Start Command** to `npm start` (if not auto-detected)

### 4. Set Environment Variables

Go to the "Variables" tab and add the following environment variables:

#### Required Variables:
- `EMAIL_USER` - Your email address (e.g., `your-email@gmail.com`)
- `EMAIL_PASS` - Your email password or App Password
- `RECIPIENT_EMAIL` - Where you want to receive contact form messages (optional, defaults to EMAIL_USER)

#### Optional Variables:
- `PORT` - Server port (Railway sets this automatically, but you can override)
- `FRONTEND_URL` - Your frontend URL for CORS (e.g., `https://yourusername.github.io`)
- `SMTP_HOST` - SMTP server host (default: `smtp.gmail.com`)
- `SMTP_PORT` - SMTP server port (default: `587`)

### 5. For Gmail Users

1. Enable 2-Factor Authentication on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate an App Password for "Mail"
4. Use this App Password (not your regular password) in `EMAIL_PASS`

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
- Verify `EMAIL_USER` and `EMAIL_PASS` are set correctly
- For Gmail, make sure you're using an App Password, not your regular password
- Check the Railway logs for error messages

### CORS errors
- Set `FRONTEND_URL` environment variable to your frontend domain
- Make sure the frontend URL matches exactly (including https://)

### Build fails
- Check that `package.json` has the correct start script
- Verify Node.js version compatibility
- Check Railway logs for specific error messages

## Cost

Railway offers a free tier with:
- $5 free credit per month
- 500 hours of usage
- Perfect for small projects and portfolios

For more information, visit https://railway.app/pricing

