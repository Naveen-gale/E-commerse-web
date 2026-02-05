import Cart from "../model/Cart.js";
import Product from "../model/Product.js";

// Get User Cart
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await Cart.findOne({ user: userId }).populate("products.product");

        if (!cart) {
            cart = await Cart.create({ user: userId, products: [] });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error("Get cart error:", error);
        res.status(500).json({ message: "Failed to fetch cart", error: error.message });
    }
};

// Add to Cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, size } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = await Cart.create({ user: userId, products: [] });
        }

        // Check if product exists in cart
        const itemIndex = cart.products.findIndex(p => p.product.toString() === productId && p.size === size);

        if (itemIndex > -1) {
            cart.products[itemIndex].quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1, size });
        }

        await cart.save();
        const updatedCart = await Cart.findOne({ user: userId }).populate("products.product");
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ message: "Failed to add to cart", error: error.message });
    }
};

// Remove from Cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body; // or params, depending on route design

        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();

        const updatedCart = await Cart.findOne({ user: userId }).populate("products.product");
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error("Remove from cart error:", error);
        res.status(500).json({ message: "Failed to remove item", error: error.message });
    }
};

// Update Quantity
export const updateQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (itemIndex > -1) {
            cart.products[itemIndex].quantity = quantity;
            if (quantity <= 0) {
                cart.products.splice(itemIndex, 1);
            }
        }
        await cart.save();
        const updatedCart = await Cart.findOne({ user: userId }).populate("products.product");
        res.status(200).json(updatedCart);

    } catch (error) {
        console.error("Update quantity error", error);
        res.status(500).json({ message: "Failed to update quantity", error: error.message });
    }
}
