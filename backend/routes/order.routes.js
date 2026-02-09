import express from "express";
import isAuth from "../middleware/isAuth.js";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", isAuth, placeOrder);

export default router;
