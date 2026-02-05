#StyleSync E-Commerce Project

This is a full-stack E-Commerce application built with the MERN stack (MongoDB, Express, React, Node.js). It consists of three main components: a Backend API, a Frontend User Interface, and an Admin Dashboard.

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## 📂 Folder Structure

The project is organized into the following main directories:
E-commerse-web/
├── 📂 root/         # Main orchestration scripts & configs
├── 📂 backend/      # Node.js & Express API (Auth, Data, Payments)
├── 📂 frontend/     # Customer-facing storefront (React + Vite)
└── 📂 admin/        # Product & Order Management Dashboard (React + Vite)



Tech Stack

Component             Technologies
                    
Frontend & Admin      React, Vite, Tailwind CSS
Backend               Node.js, Express.js
Database              MongoDB (Mongoose ODM)
Authentication          JWT (JSON Web Tokens)
Media                   ImageKit (File Storage)


### 1️⃣ Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v14 or higher)
- **MongoDB** (Local or AtlasURI)
- **Git**
Getting Started
Follow these steps to set up the project locally.

1️⃣ Prerequisites
Node.js (v14+)

MongoDB (Local instance or Atlas URI)

Git

2️⃣ Installation
We have streamlined the installation process. Run this command from the root directory to install dependencies for the Backend, Frontend, and Admin simultaneously.

Bash
# In the root folder (E-commerse-web)
npm run install-all
Troubleshooting: If the script fails, try running npm install in the root folder first.

3️⃣ Environment Configuration
Create a .env file in the backend/ directory.

Path: backend/.env

Ini, TOML
# Server Configuration
PORT=4000
MONGODB_URI=your_mongodb_connection_string

# Security
JWT_SECRET=your_super_secret_key_here

# Image Hosting (ImageKit)
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=[https://ik.imagekit.io/your_id/](https://ik.imagekit.io/your_id/)
4️⃣ Run the Application
Launch the entire ecosystem (API, Storefront, and Dashboard) with a single command:

Bash
npm run dev
Service	Local URL
🔌 Backend API	http://localhost:4000
🛍️ Frontend Store	http://localhost:5173
⚙️ Admin Panel	http://localhost:5174
📜 Key Features
User Authentication: Secure Login/Signup with JWT.

Product Management: Admin dashboard to Create, Read, Update, and Delete products.

Image Optimization: Automatic handling via ImageKit.

Responsive Design: Mobile-first UI using Tailwind CSS.


---

**Would you like me to create a `CONTRIBUTING.md` file as well to help other developers understand how to submit code to your project?**
