import express from "express";
const router = express.Router()
import { register, login, Logout, googleLogin } from "../controllers/authcontrller.js";


router.post("/register", register)
router.post("/login", login)
router.get("/logout", Logout)
router.post("/google-login", googleLogin)



export { router } 