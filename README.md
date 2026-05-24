# Zenith AI

Zenith AI is a full-stack AI workspace with a React frontend and an Express backend. It includes tools for article writing, blog title generation, image generation, background removal, object removal, resume review, a dashboard, and a community gallery.

## Project Structure

```text
client/   React 19 + Vite frontend
server/   Express API, JWT auth, Neon database, Cloudinary, Groq-compatible OpenAI client
```

## Prerequisites

- Node.js 20 or newer
- npm
- Neon/PostgreSQL database URL
- Cloudinary account
- ClipDrop API key
- Groq API key

## Environment Variables

Create `client/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Create `server/.env`:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace_with_a_long_random_secret
DATABASE_URL=your_neon_database_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIPDROP_API_KEY=your_clipdrop_api_key
GROQ_API_KEY=your_groq_api_key
```

Example files are included at `client/.env.example` and `server/.env.example`.

## Install

```bash
cd client
npm install

cd ../server
npm install
```

## Run Locally

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

The frontend runs on Vite's local URL, usually `http://localhost:5173`.

## Authentication

The app uses email/password authentication with JWT access tokens:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/me`

The server creates `users` and `password_reset_tokens` tables automatically if they do not already exist. JWTs are valid for 1 day, stored in the browser's `localStorage`, and sent to protected API routes as `Authorization: Bearer <token>`.

## Build

```bash
cd client
npm run build
```

```bash
cd server
npm start
```

## Deploy

### Backend on Render

Use the included `render.yaml` blueprint or create a Render Web Service manually:

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Runtime: Node 20+

Set these Render environment variables:

```env
CLIENT_URL=https://your-vercel-app.vercel.app
JWT_SECRET=replace_with_a_long_random_secret
DATABASE_URL=your_neon_database_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIPDROP_API_KEY=your_clipdrop_api_key
GROQ_API_KEY=your_groq_api_key
```

### Frontend on Vercel

Deploy the `client` directory to Vercel and set:

```env
VITE_API_URL=https://your-render-service.onrender.com
```

The existing `client/vercel.json` rewrites all routes to the React app so direct navigation to `/login` or `/ai` works.

## Notes

- The frontend feature pages share a compact workspace layout and a single API client that automatically attaches JWT headers.
- Uploaded files are handled by Multer on the server. ClipDrop powers background/object removal, Cloudinary stores generated image URLs, and PDF parsing powers resume review.
