import express from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.post("/add", isAuth, addToWishlist);
router.get("/", isAuth, getWishlist);
router.post("/remove", isAuth, removeFromWishlist);

export default router;
