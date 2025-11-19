# Freelance Portfolio

A full-stack freelance portfolio website with contact form functionality.

## Project Structure

```
freelance-portfolio/
├── frontend/          # React + Vite frontend (GitHub Pages)
├── backend/           # Node.js + Express backend (Railway)
└── README.md          # This file
```

## Quick Start

### Frontend (Development)

```bash
cd frontend
npm install
npm run dev
```

### Backend (Development)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your email credentials
npm run dev
```

## Deployment

### Frontend → GitHub Pages

See [frontend/DEPLOYMENT.md](./frontend/DEPLOYMENT.md) for detailed instructions.

**Quick steps:**
1. Set Railway backend URL in `frontend/.env.production`
2. Run `npm run deploy` from the `frontend/` directory

### Backend → Railway

See [backend/RAILWAY_DEPLOY.md](./backend/RAILWAY_DEPLOY.md) for detailed instructions.

**Quick steps:**
1. Connect GitHub repo to Railway
2. Set root directory to `backend`
3. Add environment variables (EMAIL_USER, EMAIL_PASS, etc.)
4. Deploy!

## Configuration

### Frontend

- **Base Path**: `/freelancer-portfolio/` (configured in `vite.config.js`)
- **API URL**: Set via `VITE_API_URL` environment variable in production
- **Development**: Uses Vite proxy to `localhost:3001`

### Backend

- **Port**: Set automatically by Railway (or use `PORT` env var)
- **CORS**: Configured via `FRONTEND_URL` environment variable
- **Email**: Configured via `EMAIL_USER` and `EMAIL_PASS`

## Environment Variables

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend.up.railway.app
```

### Backend (.env)
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
FRONTEND_URL=https://yourusername.github.io
```

## Features

- ✅ Responsive design
- ✅ Contact form with email notifications
- ✅ GitHub Pages deployment
- ✅ Railway backend deployment
- ✅ CORS configuration
- ✅ Environment-based configuration

## Tech Stack

**Frontend:**
- React 19
- Vite
- Lucide React (icons)

**Backend:**
- Node.js
- Express
- Nodemailer
- CORS

## License

MIT

