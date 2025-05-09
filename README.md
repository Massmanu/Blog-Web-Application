# Blog-Web-Application
A full-stack blog platform built with React, Node.js, Express, and MongoDB. Users can register, log in, create posts, comment on posts, search and filter blogs, and manage their profile.

# 📝 Full Stack Blog Web Application

A responsive, full-stack **Blog Web App** built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**. Users can sign up, log in, create, update, delete, and comment on blog posts. Features include JWT authentication, search, pagination, rate limiting, and role-based access control.

---

## 🌟 Features

- ✅ User Registration and Login (JWT)
- ✅ Create, Read, Update, Delete Posts
- ✅ Comment on posts
- ✅ Server-side Search and Filtering
- ✅ Input Validation on both Frontend and Backend
- ✅ Pagination (API and UI)
- ✅ Rate Limiting on sensitive endpoints
- ✅ Protected Routes using PrivateRoute
- ✅ Responsive UI using TailwindCSS and Mantine

---


---

## 🛠️ Tech Stack

| Frontend        | Backend            | Database   | Other                 |
|-----------------|--------------------|------------|------------------------|
| React.js        | Node.js            | MongoDB    | Express.js, JWT        |
| Tailwind CSS    | Express Validator  | Mongoose   | Lodash, CORS, Helmet   |
| Mantine UI      |                   |            | Postman, Render, Vercel|

---

## 🧠 Folder Structure

📦root
┣ 📂client → Frontend (React)
┃ ┣ 📂components → Shared Components (Layout, Navbar, PostCard)
┃ ┣ 📂pages → Login, Signup, AllPosts, PostDetail, etc.
┃ ┣ 📂utils → auth.js (JWT utils)
┃ ┗ README.md
┣ 📂server → Backend (Node.js + Express)
┃ ┣ 📂controllers → Logic for auth, posts, comments
┃ ┣ 📂models → Mongoose models
┃ ┣ 📂routes → Express routes for /auth, /posts, /comments
┃ ┣ 📂middleware → JWT Auth, Rate Limiting
┃ ┗ server.js
┣ 📄 API-collection.json (Postman export)
┣ 📄 .env
┣ 📄 README.md

---

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/blog-app.git
cd blog-app
cd server
npm install
cd ../client
npm install
MONGO_URI=mongodb+srv://your-user:your-pass@cluster.mongodb.net/blog
JWT_SECRET=your_jwt_secret
PORT=5000
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev
```

🔑 API Endpoints Summary
🔐 Authentication
Method	Route	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login and get token

📬 Posts
Method	Route	Description
GET	/api/posts	Get all posts (search + pagination)
GET	/api/posts/:id	Get a specific post by ID
POST	/api/posts	Create a new post (auth)
PUT	/api/posts/:id	Update post (author only)
DELETE	/api/posts/:id	Delete post (author only)

💬 Comments
Method	Route	Description
POST	/api/comments	Add comment (auth)
GET	/api/comments/post/:id	Get all comments on a post
DELETE	/api/comments/:id	Delete comment (author only)

🔐 Authentication Strategy
User receives JWT on login

Token is stored in localStorage

Protected routes are guarded via PrivateRoute.jsx

Backend verifies token using authMiddleware.js

📏 Input Validation & Rate Limiting
All form inputs are validated using express-validator

Client-side validation uses regex and error states

Sensitive routes are protected using express-rate-limit

🔍 Search, Filter & Pagination
Query param ?search=keyword filters posts by title, content, author

Server-side pagination via ?page=1&limit=5

Pagination UI included on frontend

🧪 API Testing
Postman collection included in API-collection.json

Tested all endpoints with valid/invalid inputs and tokens

📸 Screenshots
Add images of:

Landing page

Sign Up / Sign In

Create / View Post

Comments and Profile


🙌 Author
Manoj Mariyappa


