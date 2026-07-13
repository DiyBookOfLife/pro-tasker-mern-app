# Pro-Tasker – AI-Powered Full Stack MERN Application

A full-stack project management application that allows users to register, log in, create projects, manage tasks, and generate AI-powered project recommendations. Built with the MERN stack, JWT authentication, MongoDB Atlas, and Cohere AI.

---

## 🔗 Live Demo

Frontend:
https://pro-tasker-frontend.netlify.app

Backend API:
https://pro-tasker-backend-t7ye.onrender.com/api

---

## 🛠️ Tech Stack

- MongoDB Atlas
- Express.js
- React (Vite)
- Node.js
- Axios
- JSON Web Tokens (JWT)
- Cohere AI API
- Netlify (Frontend Deployment)
- Render (Backend Deployment)

---

## 🚀 Features

- User registration and login (JWT authentication)
- Create, view, and manage projects
- Create tasks within projects 
- Secure routes (only logged-in users can access data)
- Each user can only access their own projects
- AI-powered project recommendations using the Cohere Chat API
- Full frontend ↔ backend ↔ database integration

---

## 🔐 Authentication

- JWT-based authentication
- Token stored in localStorage
- Axios interceptor automatically attaches token to protected requests

---

## 🤖 AI Project Assistant

The AI Project Assistant uses the Cohere Chat API to analyze project information and generate actionable recommendations.

The AI provides:

- Project summary
- Recommended next steps
- Potential blockers

---

## 📁 Project Structure

```bash
pro-tasker-mern-app/
│
├── client/        # React frontend (Vite)
├── server/        # Express backend API
└── README.md
```

---

## ⚙️ Setup (Local Development)

### 1. Clone Repo

```bash
git clone https://github.com/DiyBookOfLife/pro-tasker-mern-app
cd pro-tasker-mern-app
```

### 2. Backend Setup

```bash
cd server
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🌐 API Base URL

```bash
http://localhost:10000/api
```

Production:

```bash
https://pro-tasker-backend-t7ye.onrender.com/api
```

---

## 📌 Notes

- Frontend and backend are deployed separately
- Backend may take a few seconds to respond if inactive (Render free tier)
- Axios is configured with a baseURL to communicate with the backend

---
