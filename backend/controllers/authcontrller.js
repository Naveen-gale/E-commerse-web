import User from "../model/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { genToken } from "../config/token.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = genToken(newUser._id);

    // Set cookie (IMPORTANT: secure should be false in localhost)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send safe response (no password)
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Register failed", error: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // --- Admin Check ---
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
      // Check if Admin User exists in DB (creates consistency for ID-based logic like Cart/Orders)
      let adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL });

      if (!adminUser) {
        // Create Admin User if not exists
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);
        adminUser = await User.create({
          name: "Admin",
          email: process.env.ADMIN_EMAIL,
          password: hashedPassword,
          // role: "admin" // If Schema supported role, we'd set it here.
        });
      }

      const token = genToken(adminUser._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Admin Login successful",
        user: {
          _id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
          role: "admin", // Explicitly send role for Frontend Redirect
        },
      });
    }
    // -------------------

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const token = genToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Success response
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: "user",
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};



// logout controller
export const Logout = async (req, res) => {
  try {
    res.clearCookie("token")
    return res.status(200).json({ message: "Logout successful" })
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Logout failed", error: error.message });
  }
}



export const googleLogin = async (req, res) => {
  try {
    const { email, name, intent } = req.body
    const user = await User.findOne({ email })

    // Strict check for registration
    if (user && intent === 'register') {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    // Strict check for login
    if (!user && intent === 'login') {
      return res.status(400).json({ message: "User not found. Please register first." });
    }

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword
      })
      const token = genToken(newUser._id)
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: "Login successful",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    }
    const token = genToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("google login error:", error);
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
}