# Freelance Portfolio - Frontend

React + Vite frontend for the freelance portfolio website.

## Development

```bash
npm install
npm run dev
```

The app will run on `http://localhost:5173` with hot module replacement.

## Building for Production

```bash
npm run build
```

This creates a `dist/` folder with the production build.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to GitHub Pages

1. Set your Railway backend URL in `.env.production`:
   ```
   VITE_API_URL=https://your-app.up.railway.app
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

This will build and deploy to the `gh-pages` branch.

## Project Structure

- `src/` - Source code
- `public/` - Static assets
- `dist/` - Production build (generated)
- `vite.config.js` - Vite configuration (base path for GitHub Pages)

## Environment Variables

- `VITE_API_URL` - Railway backend URL (required for production)
