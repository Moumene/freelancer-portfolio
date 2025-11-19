# Backend Server for Freelance Portfolio

This backend server handles contact form submissions and sends emails using Node.js and Express.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your email credentials:
   - `EMAIL_USER`: Your email address
   - `EMAIL_PASS`: Your email password or App Password (for Gmail, use App Password)
   - `RECIPIENT_EMAIL`: Where you want to receive contact form messages (optional, defaults to EMAIL_USER)
   - `PORT`: Server port (default: 3001)

3. **For Gmail users:**
   - Enable 2-Factor Authentication on your Google account
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Use the App Password (not your regular password) in `EMAIL_PASS`

## Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

### POST `/api/send-email`
Sends an email from the contact form.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in your services..."
}
```

**Success response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "..."
}
```

**Error response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

### GET `/health`
Health check endpoint.

## Environment Variables

- `PORT`: Server port (default: 3001, Railway sets this automatically)
- `EMAIL_USER`: Email address for SMTP authentication
- `EMAIL_PASS`: Email password or App Password
- `RECIPIENT_EMAIL`: Email address to receive messages (optional)
- `SMTP_HOST`: SMTP server host (default: smtp.gmail.com)
- `SMTP_PORT`: SMTP server port (default: 587)
- `FRONTEND_URL`: Frontend URL for CORS (optional, defaults to "*" for all origins)

## Deployment to Railway

See [RAILWAY_DEPLOY.md](./RAILWAY_DEPLOY.md) for detailed instructions on deploying to Railway.

Quick steps:
1. Connect your GitHub repository to Railway
2. Set the root directory to `backend`
3. Add environment variables (EMAIL_USER, EMAIL_PASS, etc.)
4. Deploy!

