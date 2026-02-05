import Order from "../model/Order.js";
import Cart from "../model/Cart.js";
import User from "../model/user.model.js";
import nodemailer from "nodemailer";

// Reuse transporter logic or valid import if separated
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id; // Fixed: req.user contains { id, iat, exp }
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { items, totalAmount, shippingAddress } = req.body;

        // Create Order
        const newOrder = await Order.create({
            user: userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod: "COD",
            status: "Pending"
        });

        // Clear User Cart
        await Cart.findOneAndUpdate({ user: userId }, { products: [] });

        // Send Confirmation Email
        // const user = req.user; // Removed: We fetched the full 'user' object above

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            bcc: process.env.EMAIL_USER, // Admin receives a copy
            subject: "Order Confirmation - Antigravity Bags",
            text: `Hi ${user.name},

Your order #${newOrder._id} has been placed successfully!

Total Amount: $${totalAmount}
Payment Method: Cash on Delivery

Shipping Details:
${shippingAddress.firstName} ${shippingAddress.lastName}
${shippingAddress.street}
${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}
${shippingAddress.country}
Phone: ${shippingAddress.phone}

Thank you for shopping with us.`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log("Email error", err);
        });

        res.status(201).json({ message: "Order placed successfully", order: newOrder });

    } catch (error) {
        console.error("Place order error:", error);
        res.status(500).json({ message: "Failed to place order", error: error.message });
    }
};
