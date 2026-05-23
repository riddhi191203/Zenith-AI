# Zenith AI

Zenith AI is a full-stack AI workspace with a React frontend and an Express backend. It includes tools for article writing, blog title generation, image generation, background removal, object removal, resume review, a dashboard, and a community gallery.

## Project Structure

```text
client/   React 19 + Vite frontend
server/   Express API, Clerk auth, Neon database, Cloudinary, Groq-compatible OpenAI client
```

## Prerequisites

- Node.js 20 or newer
- npm
- Clerk application keys
- Neon/PostgreSQL database URL
- Cloudinary account
- Groq API key

## Environment Variables

Create `client/.env`:

```env
VITE_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Create `server/.env`:

```env
PORT=3000
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_neon_database_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GROQ_API_KEY=your_groq_api_key
```

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

## Build

```bash
cd client
npm run build
```

```bash
cd server
npm start
```

## Notes

- The frontend feature pages share a compact workspace layout so each tool fits into one screen on desktop, with long outputs scrolling inside the result panel.
- Uploaded files are handled by Multer on the server and processed through Cloudinary or PDF parsing depending on the selected tool.
