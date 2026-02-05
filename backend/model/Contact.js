import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    // Status to track if admin responded/viewed (optional but good)
    status: { type: String, default: "New", enum: ["New", "Read", "Replied"] }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
