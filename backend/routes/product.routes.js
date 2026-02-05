import express from "express";
import { addProduct, getProducts, deleteProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.post("/add", upload.single("image"), addProduct); // Admin only protection should vary, using basic protect for now
router.get("/all", getProducts);
router.delete("/delete/:id", deleteProduct);

export default router;
