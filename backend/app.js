import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { router } from "./routes/auth.routes.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
let port = process.env.PORT || 3000

var app = express()
connectDB();
app.get("/", (req, res) => {
    res.send("Hello World!")
})
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://e-commerse-web-vtdb.vercel.app",
    "https://e-commerse-web-backend.onrender.com",
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log("Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import contactRoutes from "./routes/contact.routes.js";

app.use("/api/auth", router)
app.use("/api/user", userRoutes)
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
// Force Restart Trigger