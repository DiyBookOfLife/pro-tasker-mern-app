# Pro-Tasker – Full Stack MERN App

A full-stack project management application built with the MERN stack. Users can securely create accounts, manage projects, and track tasks with full CRUD functionality and strict ownership-based authorization.

## 🚀 Live Demo

Frontend:
https://your-frontend-url.com

Backend API:
https://your-backend-url.com

---

## 🛠 Tech Stack

- MongoDB Atlas
- Express.js
- React (Vite)
- Node.js
- JWT Authentication
- bcrypt (password hashing)
- Render (deployment)

---

## ✨ Features

### User Authentication

- Register & login
- JWT-based authentication
- Secure password hashing

### Project Management

- Create, view, update, delete projects
- User-specific dashboard
- Ownership-based access control

### Task Management

- Create tasks within projects
- Update task status (To Do, In Progress, Done)
- Delete tasks
- Tasks tied to specific projects

### Security

- Protected API routes
- Authorization checks (users can only access their own data)

---

## 📡 API Endpoints

### Users

POST /api/users/register  
POST /api/users/login

### Projects

GET /api/projects  
POST /api/projects  
GET /api/projects/:id  
PUT /api/projects/:id  
DELETE /api/projects/:id

### Tasks

POST /api/projects/:projectId/tasks  
GET /api/projects/:projectId/tasks  
PUT /api/tasks/:taskId  
DELETE /api/tasks/:taskId

---

## ⚙️ Setup Instructions

### 1. Clone repo

https://github.com/DiyBookOfLife/pro-tasker-mern-app

### 2. Install backend

cd server  
npm install

### 3. Create .env file (server)

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run backend

npm run dev

### 5. Install frontend

cd ../client  
npm install

### 6. Run frontend

npm run dev

---

## 🧠 Key Concepts

- RESTful API design
- JWT authentication & middleware
- Ownership-based authorization
- MongoDB relationships using ObjectId refs
- Full-stack data flow (client ↔ server ↔ database)

---
