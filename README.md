🛍️ StyleSync — MERN Stack E-Commerce Platform
StyleSync is a modern full-stack fashion E-Commerce web application built using the MERN Stack.
It provides a seamless shopping experience for customers and a powerful dashboard for admins to manage products, orders, and users.
Built with ❤️ for performance, scalability, and clean UI.
🚀 Tech Stack
� � � � �
Frontend
React.js
Tailwind CSS
Axios
Redux / Context API
Backend
Node.js
Express.js
REST APIs
JWT Authentication
Database
MongoDB + Mongoose
✨ Features
👤 User Side
User Registration & Login
JWT Authentication
Browse Products by Category
Search & Filters
Add to Cart
Wishlist
Secure Checkout
Order History
Responsive Mobile UI
🛠️ Admin Dashboard
Add / Edit / Delete Products
Manage Categories
Order Management
User Management
Sales Analytics
Stock Control
📂 Folder Structure
Copy code

StyleSync/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.jsx
│
├── admin/
│   ├── dashboard/
│   ├── products/
│   └── analytics/
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone Repo
Copy code
Bash
git clone https://github.com/your-username/stylesync.git
cd stylesync
2️⃣ Backend Setup
Copy code
Bash
cd backend
npm install
npm run dev
3️⃣ Frontend Setup
Copy code
Bash
cd frontend
npm install
npm start
4️⃣ Environment Variables (.env)
Copy code

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
🔐 Authentication Flow
Register → Login → JWT Token Generated
Token stored → Used for protected routes
Role-based access (User/Admin)
🌍 Deployment
You can deploy easily on:
Vercel (Frontend)
Railway / Render (Backend)
MongoDB Atlas (Database)
🎯 Future Improvements
Payment Gateway (Stripe/Razorpay)
AI Product Recommendations
Reviews & Ratings
Dark Mode
Multi-Vendor Support
PWA Support
🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.
📜 License
MIT LicenseThe project is organized into the following main directories:
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
