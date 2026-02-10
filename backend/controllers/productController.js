import Product from "../model/Product.js";
import imagekit from "../config/imagekit.js";

// Add Product
export const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, sizes } = req.body;
        const file = req.file;

        if (!name || !price || !description || !category || !sizes || !file) {
            return res.status(400).json({ message: "All fields and image are required" });
        }

        // Upload to ImageKit
        const uploadResponse = await imagekit.upload({
            file: file.buffer, // multer stores file in buffer
            fileName: `product-${Date.now()}-${file.originalname}`,
            folder: "/products"
        });

        let parsedSizes;
        try {
            parsedSizes = JSON.parse(sizes);
        } catch (e) {
            parsedSizes = sizes.split(","); // Fallback if simple comma separated
        }

        const newProduct = await Product.create({
            name,
            price,
            description,
            category,
            sizes: parsedSizes,
            image: uploadResponse.url // Save ImageKit URL
        });

        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Add product error:", error);
        res.status(500).json({ message: "Failed to add product", error: error.message });
    }
};

// Get All Products (with Search & Filter)
export const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};

        if (search) {
            query.name = { $regex: search, $options: "i" }; // Case-insensitive search
        }

        if (category && category !== "All") {
            query.category = category;
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Get products error:", error);
        console.error("Error Stack:", error.stack);
        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack
        });
    }
};

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
};
