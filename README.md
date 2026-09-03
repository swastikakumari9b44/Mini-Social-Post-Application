# Circle — Mini Social Post Application

A full-stack mini social media application built for an internship evaluation. Users can sign up, log in, create posts (text and/or image), view a public feed, like/unlike posts, and comment — all with instant, optimistic UI updates.

## Overview

Circle is a clean, modern social feed application inspired by the general layout of consumer social apps (cards, avatars, likes, comments) without copying any specific branding or proprietary assets. It is built as a two-collection MongoDB application (`users` and `posts`) with likes and comments embedded directly in each post document.

## Features

- Email/password authentication with JWT
- Secure password hashing (bcrypt)
- Create posts with text, image, or both
- Image preview before posting, with the ability to remove the selection
- Public feed showing posts from all users, newest first
- Like / unlike posts with duplicate-like prevention and instant count updates
- Expandable comment threads with usernames and relative timestamps
- Optimistic UI updates for likes and comments, with rollback on failure
- Loading skeletons, empty states, and toast notifications for errors/success
- Fully responsive layout (desktop, tablet, mobile)
- Deployment-ready configuration for Vercel (frontend), Render (backend), and MongoDB Atlas

## Tech Stack

**Frontend:** React 19, Vite, React Router, Material UI (MUI), Axios
**Backend:** Node.js, Express.js, Mongoose, JWT, bcryptjs, Multer, Cloudinary (optional)
**Database:** MongoDB (Atlas-compatible)

## Architecture

```
Browser (React SPA)
   │  Axios (JWT in Authorization header)
   ▼
Express REST API
   │  Mongoose
   ▼
MongoDB (users, posts)
```

- Passwords are hashed with bcrypt before being stored; the password field is never returned in API responses.
- JWTs are issued on signup/login and verified by an `auth` middleware that protects post creation, likes, and comments.
- Likes and comments are embedded sub-documents inside each post, so the database only needs two top-level collections.
- Images are uploaded via Multer. If Cloudinary credentials are present in the backend `.env`, images are uploaded to Cloudinary and only the resulting URL is stored in MongoDB (recommended for deployment on Render, which has an ephemeral filesystem). If Cloudinary is not configured, images fall back to local disk storage served from `/uploads` (suitable for local development only).

## Folder Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, PostCard, CreatePost, CommentSection, etc.
│   │   ├── pages/           # LoginPage, SignupPage, FeedPage
│   │   ├── services/        # api.js, authService.js, postService.js
│   │   ├── context/         # AuthContext
│   │   ├── hooks/           # useAuth
│   │   ├── utils/           # formatTime.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── src/
│   │   ├── controllers/     # authController.js, postController.js
│   │   ├── models/          # User.js, Post.js
│   │   ├── routes/          # authRoutes.js, postRoutes.js
│   │   ├── middleware/      # auth.js, upload.js, errorHandler.js
│   │   ├── config/          # db.js, cloudinary.js
│   │   └── server.js
│   ├── render.yaml
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

## Environment Variables

### backend/.env

| Variable | Description |
|---|---|
| `PORT` | Port the API listens on (default `5000`) |
| `NODE_ENV` | `development` or `production` |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random secret used to sign JWTs |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `CLIENT_URL` | Comma-separated allowed frontend origin(s) for CORS |
| `CLOUDINARY_CLOUD_NAME` | Optional — enables Cloudinary image uploads |
| `CLOUDINARY_API_KEY` | Optional |
| `CLOUDINARY_API_SECRET` | Optional |

### frontend/.env

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API, e.g. `http://localhost:5000/api` |

## Local Setup

### 1. Backend

```bash
cd backend
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET at minimum
npm install
npm run dev             # requires nodemon (installed as a dev dependency)
# or: npm start
```

The API will run at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
cp .env.example .env    # defaults to http://localhost:5000/api
npm install
npm run dev
```

The app will run at `http://localhost:5173`.

## MongoDB Atlas Setup

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user (username/password).
3. Under **Network Access**, allow access from anywhere (`0.0.0.0/0`) or your Render deployment's IPs.
4. Copy the connection string and set it as `MONGO_URI` in `backend/.env`, replacing `<username>`, `<password>`, and adding a database name, e.g. `.../mini-social?retryWrites=true&w=majority`.

## Image Hosting Setup (Cloudinary — recommended for production)

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. From the dashboard, copy your **Cloud name**, **API key**, and **API secret**.
3. Set them as `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` in `backend/.env`.
4. If these are left blank, the backend automatically falls back to local disk storage under `backend/uploads/` — fine for local development, but **not persistent on Render**, since its filesystem is ephemeral.

## API Overview

All responses follow `{ success, message?, data?, pagination? }`.

**Auth**
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | Public | Create an account |
| POST | `/api/auth/login` | Public | Log in, receive a JWT |
| GET | `/api/auth/me` | Protected | Get the current user |

**Posts**
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/posts` | Public | Paginated feed, newest first |
| POST | `/api/posts` | Protected | Create a post (`multipart/form-data`: `text`, `image`) |
| DELETE | `/api/posts/:id` | Protected | Delete your own post |
| POST | `/api/posts/:id/like` | Protected | Toggle like/unlike |
| POST | `/api/posts/:id/comments` | Protected | Add a comment |
| DELETE | `/api/posts/:id/comments/:commentId` | Protected | Delete your own comment |

## Deployment

### Frontend → Vercel

1. Push this repository to GitHub.
2. In Vercel, "Add New Project" → import the repo.
3. Set the **Root Directory** to `frontend`.
4. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
5. Add the environment variable `VITE_API_URL` pointing to your deployed Render backend, e.g. `https://your-backend.onrender.com/api`.
6. Deploy.

### Backend → Render

1. In Render, "New" → "Web Service" → connect the same GitHub repo.
2. Set **Root Directory** to `backend`.
3. Build command: `npm install`. Start command: `npm start`.
4. Add all the environment variables from `backend/.env.example` (at minimum `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` set to your Vercel URL, and Cloudinary credentials for persistent image uploads).
5. Deploy. A `render.yaml` blueprint is included in `backend/` if you prefer Render's Blueprint deploy flow.

### Database → MongoDB Atlas

See the MongoDB Atlas Setup section above. Use the same connection string for both local development and the deployed Render service (or separate clusters if you prefer).

## Screenshots
<img width="1292" height="912" alt="Screenshot 2026-09-02 202913" src="https://github.com/user-attachments/assets/ed7dc051-9228-4073-98f5-add2abe8dc28" />
<img width="1131" height="846" alt="Screenshot 2026-09-02 203129" src="https://github.com/user-attachments/assets/faa3a529-8a4e-4cdd-a12d-1b956913d01c" />
<img width="1727" height="902" alt="Screenshot 2026-09-02 203037" src="https://github.com/user-attachments/assets/4a12e2f2-0c35-42c6-94a5-d4f26401d669" />



## Future Improvements

- Pagination/infinite scroll UI on the frontend (API already supports `page`/`limit`)
- User profile pages showing a user's own posts
- Edit post/comment functionality
- Rate limiting on auth and post-creation endpoints
- Automated test suite (Jest/Supertest for backend, React Testing Library for frontend)
