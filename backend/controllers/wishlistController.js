import Wishlist from "../models/wishlist.model.js";

// Add to Wishlist
export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = new Wishlist({ userId, products: [] });
        }

        // Check if product exists
        const exists = wishlist.products.find((p) => p.productId.toString() === productId);

        if (exists) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        wishlist.products.push({ productId });
        await wishlist.save();

        res.status(200).json({ message: "Added to wishlist", wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get Wishlist
export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await Wishlist.findOne({ userId }).populate('products.productId');
        res.status(200).json(wishlist ? wishlist : { products: [] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Remove from Wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

        wishlist.products = wishlist.products.filter(p => p.productId.toString() !== productId);
        await wishlist.save();

        res.status(200).json({ message: "Removed from wishlist", wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
