# 🛍️ StyleSync — MERN Stack E-Commerce Platform

StyleSync is a modern, scalable, and production-ready **full-stack E-Commerce web application** built using the **MERN Stack (MongoDB, Express, React, Node.js)**.

It provides a seamless shopping experience for customers and a powerful admin dashboard for managing products, orders, and users.

---

## 🚀 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Redux / Context API

### Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication

### Database
- MongoDB + Mongoose

---

## ✨ Features

### 👤 User Features
- User Registration & Login
- Secure Authentication (JWT)
- Browse Products by Category
- Search & Filters
- Add to Cart
- Wishlist
- Checkout System
- Order History
- Fully Responsive Design

### 🛠️ Admin Features
- Add / Edit / Delete Products
- Manage Categories
- Manage Orders
- Manage Users
- Sales Analytics Dashboard
- Inventory Control

---

## 📂 Project Structure

```
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
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/stylesync.git
cd stylesync
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🔑 Authentication Flow

1. Register / Login  
2. JWT Token generated  
3. Token stored on client  
4. Protected routes verified using middleware  
5. Role-based access (User / Admin)

---

## 🌍 Deployment

You can deploy easily:

- Frontend → Vercel / Netlify
- Backend → Railway / Render
- Database → MongoDB Atlas

---

## 🚀 Future Improvements

- Stripe / Razorpay Payments
- AI Product Recommendations
- Reviews & Ratings
- Dark Mode
- Multi-Vendor Support
- PWA Support

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork this repository and submit pull requests.

---

## 📜 License

MIT License

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
