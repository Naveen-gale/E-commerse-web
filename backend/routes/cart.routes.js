import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCart, addToCart, removeFromCart, updateQuantity } from "../controllers/cartController.js";

const router = express.Router();

router.use(isAuth); // All cart routes require login

router.get("/", getCart);
router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.put("/update", updateQuantity);

export default router;
