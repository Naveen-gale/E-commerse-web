import Contact from "../model/Contact.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const submitContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Save to DB
        const newContact = await Contact.create({ name, email, phone, subject, message });

        // Send Email to Admin (Receiver)
        const mailOptionsAdmin = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL, // Updated var name
            subject: `New Contact: ${subject || 'No Subject'} - ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
        };

        // Send Auto-reply to User
        const mailOptionsUser = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Thank for contacting Antigravity Bags",
            text: `Hi ${name},\n\nWe have received your message and will get back to you shortly.\n\nBest Regards,\nAntigravity Bags Team`,
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(mailOptionsAdmin),
            transporter.sendMail(mailOptionsUser)
        ]);

        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({ message: "Failed to send message", error: error.message });
    }
};
