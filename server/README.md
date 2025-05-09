# IFN666_25se1 Assessment 02 Submission

**Student name:** Manoj Mariyappa  
**Student ID:** N11775637  

---

## Response to Marking Criteria

### ✅ (API) Core: Application Architecture (1 mark)
- **One line description:** RESTful API built with Express.js using layered architecture (routes, controllers, models, middleware).
- **Video timestamp:** 00:20
- **Relevant files:**
  - `src/routes/`
  - `src/controllers/`
  - `src/models/`

### ✅ (API) Core: Endpoints (2 marks)
- **One line description:** Endpoints for CRUD operations on posts, user authentication, and comment handling.
- **Video timestamp:** 00:45
- **Relevant files:**
  - `src/routes`

  | Method | Endpoint                   | Auth | Body (JSON)                                                    |
|--------|----------------------------|------|----------------------------------------------------------------|
| POST   | `/users`                   | No   | `{ "username":"user1","email":"user1@example.com","password":"pass123" }` |
| POST   | `/users/login`             | No   | `{ "email":"user1@example.com","password":"pass123" }`         |

User CRUD
| Method | Endpoint                   | Auth | Body (JSON)                   |
|--------|----------------------------|------|-------------------------------|
| GET    | `/users`                   | Yes  | —                             |
| GET    | `/users/:id`               | Yes  | —                             |
| PUT    | `/users/:id`               | Yes  | e.g. `{ "username":"newname" }` |
| DELETE | `/users/:id`               | Yes  | —                             |

Post CRUD
| Method | Endpoint                   | Auth | Body (JSON)                   |
|--------|----------------------------|------|-------------------------------|
| GET    | `/posts`                   | Yes  | —                             |
| GET    | `/posts/:id`               | Yes  | —                             |
| PUT    | `/posts/:id`               | Yes  | e.g. `{ "content":"new content" }` |
| DELETE | `/posts/:id`               | Yes  | —                             |

Comment CRUD & Queries
| Method | Endpoint                                     | Auth | Body (JSON)                         |
|--------|----------------------------------------------|------|-------------------------------------|
| GET    | `/comments`                                  | No   | —                                   |
| GET    | `/comments?post=<id>&user=<id>`             | No   | —                                   |
| GET    | `/comments/:id`                              | No   | —                                   |
| POST   | `/comments`                                  | Yes  | `{ "text":"Nice!", "post":"<post id>" }` |
| PUT    | `/comments/:id`                              | Yes  | `{ "text":"Edited comment" }`       |
| DELETE | `/comments/:id`                              | Yes  | —                                   |

### ✅ (API) Core: Data Model (3 marks)
- **One line description:** MongoDB schemas for User, Post, and Comment using Mongoose.
- **Video timestamp:** 0.35
- **Relevant files:**
  - `src/models/User.js`
  - `src/models/Post.js`
  - `src/models/Comment.js`

### ✅ (API) Core: Data Interface (3 marks)
- **One line description:** JSON-based communication between client and API using fetch requests and standardized responses.
- **Video timestamp:** 1.50 - 6.30
- **Relevant files:**
  - `src/controllers/postController.js`
  - `src/controllers/authController.js`

### ✅ (API) Core: Deployment to Web Server (3 marks)
- **One line description:** Application deployed on server with MongoDB Atlas and CORS enabled.
- **Video timestamp:** 1.10 - 6.30
- **Relevant files:**
  - `server.js`
  - `.env`

### ✅ (API) Core: API Testing with Postman (3 marks)
- **One line description:** Used Postman to test all endpoints including auth, post CRUD, and error cases.
- **Video timestamp:** 0:55, 6:55
- **Relevant files:**
  - `API-collection.json`

---

### ✅ (API) Additional: Authentication (3 marks)
- **One line description:** JWT-based auth with login and signup endpoints, protected routes using middleware.
- **Video timestamp:** 1.50
- **Relevant files:**
  - `src/middleware/authMiddleware.js`
  - `src/controllers/authController.js`

### ✅ (API) Additional: Input Validation (3 marks)
- **One line description:** Used express-validator to validate post creation and registration input.
- **Video timestamp:** 14.18
- **Relevant files:**
  - `src/routes/postRoutes.js`
  - `src/routes/authRoutes.js`

### ✅ (API) Additional: Rate Limiting (3 marks)
- **One line description:** Implemented express-rate-limit to restrict repeated requests from the same IP.
- **Video timestamp:** 14.50
- **Relevant files:**
  - `src/middleware/rateLimiter.js`
  - `server.js`

### ✅ (API) Additional: Query Filtering (3 marks)
- **One line description:** Search implemented for post title, content, and author using regex and in-memory filtering.
- **Video timestamp:** 3.55
- **Relevant files:**
  - `src/controllers/postController.js`

### ✅ (API) Additional: Pagination (3 marks)
- **One line description:** Server-side pagination with limit and page query params for GET /posts.
- **Video timestamp:** 13.10
- **Relevant files:**
  - `src/controllers/postController.js`

### ✅ (API) Additional: Role-Based Access Control (3 marks)
- **One line description:** Only post authors can delete their own posts using user ID checks in delete controller.
- **Video timestamp:** 4.15
- **Relevant files:**
  - `src/controllers/postController.js`
  - `src/middleware/authMiddleware.js`

---

### ✅ (Client) Core: Application Architecture (3 marks)
- **One line description:** React frontend structured with modular components, React Router, and Mantine layout.
- **Video timestamp:** 00.20
- **Relevant files:**
  - `src/pages/`
  - `src/components/`

### ✅ (Client) Core: User Interface Design (3 marks)
- **One line description:** Responsive UI using Tailwind CSS and Mantine with clean navigation and consistent theme.
- **Video timestamp:** 1:15
- **Relevant files:**
  - `src/pages/LandingPage.jsx`
  - `src/components/Layout.jsx`

### ✅ (Client) Core: React Components (3 marks)
- **One line description:** Modular components like PostCard, CommentList, and ProtectedRoute created for reuse.
- **Video timestamp:** 15.25
- **Relevant files:**
  - `src/components/PostCard.jsx`
  - `src/components/PrivateRoute.jsx`

### ✅ (Client) Core: State Management (3 marks)
- **One line description:** Local state managed with useState/useEffect and user auth state persisted in localStorage.
- **Video timestamp:** 15.20
- **Relevant files:**
  - `src/pages/AllPosts.jsx`
  - `src/utils/auth.js`

### ✅ (Client) Core: API Integration (3 marks)
- **One line description:** Used fetch and async/await to communicate with backend for posts, login, signup, and delete.
- **Video timestamp:** 1.50 - 6.30
- **Relevant files:**
  - `src/pages/SignupForm.jsx`
  - `src/pages/LoginForm.jsx`
  - `src/pages/AllPosts.jsx`

---

### ✅ (Client) Additional: Authentication (3 marks)
- **One line description:** Authenticated routes using PrivateRoute and token checks with redirection.
- **Video timestamp:** 1.50
- **Relevant files:**
  - `src/components/PrivateRoute.jsx`
  - `src/utils/auth.js`

### ✅ (Client) Additional: Input Validation (3 marks)
- **One line description:** Validated registration/login input using regex and conditionally rendered error messages.
- **Video timestamp:** 3.10
- **Relevant files:**
  - `src/pages/SignupForm.jsx`
  - `src/pages/LoginForm.jsx`

### ✅ (Client) Additional: Rate Limiting (3 marks)
- **One line description:** Client-side debounce using lodash to prevent excessive search requests.
- **Video timestamp:** 6.10
- **Relevant files:**
  - `src/pages/AllPosts.jsx`

### ✅ (Client) Additional: Search and Sort (3 marks)
- **One line description:** Implemented search bar filtering posts by title, content, or author in real-time.
- **Video timestamp:** 3.55
- **Relevant files:**
  - `src/pages/AllPosts.jsx`

### ✅ (Client) Additional: Pagination (3 marks)
- **One line description:** Added page navigation with server-side pagination for listing posts.
- **Video timestamp:** 3.35
- **Relevant files:**
  - `src/pages/AllPosts.jsx`
  - `src/components/PaginationControls.jsx`
