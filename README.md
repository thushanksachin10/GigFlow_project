# GigFlow_project

# 🚀 GigFlow – Freelance Marketplace (MERN Stack)

GigFlow is a simplified freelance marketplace where **clients can post gigs** and **freelancers can bid** on them.  
It demonstrates full-stack development using the **MERN stack** with secure authentication, protected routes, and role-based access.

---

## 📌 Features

### 🔐 Authentication
- Register as **Client** or **Freelancer**
- Login using secure `httpOnly` cookies (JWT)
- Auto-session persistence with `/auth/me`
- Logout system clears cookies server-side

---

### 🧑‍💼 Role-Based Features

| User Type | Features |
|----------|----------|
| **Client** | Create gigs, view bids, hire freelancers |
| **Freelancer** | Browse gigs, submit bids |
| **Guest** | Can view home page but must log in to interact |

---

### 🛠 Gigs Module
- Create a new gig (client)
- View all gigs
- View gig details
- Linked automatically to the client's ID

---

### 👨‍🔧 Bidding System
- Freelancers submit bids with amount + message
- Clients can view all bids on their gigs
- Clients can **hire** a freelancer → updates bid status

---

## 🏗️ Project Structure

gigflow/
│
├── backend/
│ ├── src/
│ │ ├── controllers/ # auth, gig, bid logic
│ │ ├── models/ # User, Gig, Bid schemas
│ │ ├── middleware/ # auth protection middleware
│ │ ├── routes/ # API endpoints
│ │ ├── utils/ # JWT token helper
│ │ ├── server.js # App entry
│ │ └── db.js # MongoDB connection
│ ├── package.json
│ └── .env.example
│
└── frontend/
├── src/
│ ├── components/ # Navbar, GigCard
│ ├── pages/ # Home, Login, Register, CreateGig, GigDetails
│ ├── store/ # Redux slices
│ ├── App.jsx
│ └── main.jsx
├── package.json
└── index.html


---

## 🔧 Tech Stack

### **Frontend**
- React (Vite)
- Redux Toolkit
- React Router
- Axios
- TailwindCSS

### **Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT + Cookies
- MVC architecture

---

## ⚙️ Installation Guide

### 🔹 Clone the Repository

git clone https://github.com/YOUR_USERNAME/gigflow.git

cd gigflow


---

## 🖥️ Backend Setup



cd backend
npm install


Create `.env` file:



PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/gigflow
JWT_SECRET=supersecret_jwt_key


Start backend:



npm run dev


---

## 🌐 Frontend Setup



cd frontend
npm install
npm run dev


---

## 🔥 API Endpoints Overview

### Authentication
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get session user |
| POST | `/api/auth/logout` | Logout user |

### Gigs
| Method | Route | Description |
|--------|--------|-------------|
| GET | `/api/gigs` | Get all gigs |
| GET | `/api/gigs/details/:id` | Get gig details |
| POST | `/api/gigs` | Create gig (client only) |

### Bids
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/api/bids` | Create bid (freelancer only) |
| GET | `/api/bids/gig/:gigId` | Get bids for gig |
| PATCH | `/api/bids/:bidId/hire` | Hire freelancer |

---

## 🧪 Testing Scenarios

### ✔ Client Workflow
1. Register as client  
2. Login  
3. Create gig  
4. See gig listed on homepage  
5. Wait for freelancer bid  
6. Hire a freelancer  

### ✔ Freelancer Workflow
1. Register as freelancer  
2. Login  
3. View all gigs  
4. Submit bid  
5. See updated bid list on gig page  

## 📝 Notes for Reviewers

- Clean separation of backend MVC architecture  
- Redux Toolkit for state management  
- Secure cookie-based JWT system  
- Role-based rendering handled on frontend  
- Fully functional MERN application  

📸 Screenshots

Below are visual previews of GigFlow’s UI.  

attached in mail or github or ill provide link for it
