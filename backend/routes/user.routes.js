import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getUser } from "../controllers/usercontroller.js";

const userRoutes = express.Router();

userRoutes.post("/getcurrentuser", isAuth, getUser);

export default userRoutes;