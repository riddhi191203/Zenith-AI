# Zenith AI 🚀

Zenith AI is a modern full-stack AI workspace that combines multiple AI-powered tools into one seamless platform. Built with a React + Vite frontend and an Express.js backend, the platform offers content generation, image processing, resume analysis, and a community-driven AI gallery experience.

---

## 🌐 Live Demo

- **Frontend:** https://zenith-ai-seven.vercel.app
- **Backend API:** https://zenith-ai-i6hc.onrender.com

---

# ✨ Features

## 🤖 AI Content Tools

- AI Article Writer
- Blog Title Generator
- Resume Review & Analysis
- Smart AI Responses using Groq API

## 🎨 AI Image Tools

- AI Image Generation
- Background Removal
- Cloud-based Image Storage with Cloudinary

## 👤 Authentication System

- User Registration & Login
- JWT-based Authentication
- Forgot Password & Reset Password
- Protected API Routes

## 📊 Dashboard & Community

- Personalized User Dashboard
- Community Gallery for Shared AI Creations
- Responsive Modern UI

## ⚡ Developer Experience

- React 19 + Vite Frontend
- Express.js REST API
- PostgreSQL (Neon Database)
- Modular Code Structure
- Environment-based Configuration

---

# 🛠️ Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- PostgreSQL (Neon)
- JWT Authentication
- Multer
- Cloudinary
- Groq API
- ClipDrop API

---

# 📁 Project Structure

```bash
Zenith-AI/
│
├── client/        # React + Vite Frontend
├── server/        # Express Backend API
│
└── README.md
```

---

# ⚙️ Environment Variables

## Client (`client/.env`)

```env
VITE_API_URL=http://localhost:3000
```

## Server (`server/.env`)

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

---

# 📦 Installation

## Clone the Repository

```bash
git clone https://github.com/riddhi191203/Zenith-AI.git
cd Zenith-AI
```

## Install Frontend Dependencies

```bash
cd client
npm install
```

## Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# 🚀 Running Locally

## Start Backend Server

```bash
cd server
npm run dev
```

## Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# 🔐 Authentication API

## Available Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| POST | `/api/auth/forgot-password` | Send Reset Link |
| POST | `/api/auth/reset-password` | Reset Password |
| GET | `/api/auth/me` | Get Current User |

## Authentication Details

- JWT tokens expire after **1 day**
- Tokens are stored in browser `localStorage`
- Protected routes use:

```bash
Authorization: Bearer <token>
```

- Database tables are automatically created if they do not exist

---

# 🖼️ AI Image Processing

Zenith AI integrates multiple AI services for image processing:

## ClipDrop API

- Background Removal

## Cloudinary

- Image Uploads
- CDN Image Storage

---

# 📄 Resume Review System

The Resume Review feature supports:

- PDF Resume Upload
- PDF Parsing
- AI-powered Resume Feedback
- Skill & Content Analysis

---

# 🏗️ Production Build

## Build Frontend

```bash
cd client
npm run build
```

## Start Backend Production Server

```bash
cd server
npm start
```

---

# ☁️ Deployment Guide

## Backend Deployment (Render)

You can deploy the backend using the included `render.yaml` file or manually create a Render Web Service.

### Render Configuration

| Setting | Value |
|---|---|
| Root Directory | `server` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Runtime | Node.js 20+ |

### Required Environment Variables

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

---

## Frontend Deployment (Vercel)

Deploy the `client` folder to Vercel.

### Required Environment Variable

```env
VITE_API_URL=https://your-render-service.onrender.com
```

The included `vercel.json` file supports React Router route rewrites.

---

# 📌 Notes

- Shared API client automatically attaches JWT headers
- Multer handles file uploads
- Responsive UI optimized for desktop and mobile
- Centralized AI workspace design
- Scalable backend architecture

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit pull requests.

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Developed by **Riddhi Jain** 🚀
