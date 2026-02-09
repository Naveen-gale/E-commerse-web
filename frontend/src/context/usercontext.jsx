import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';
import { toast } from 'react-toastify';

const usercontext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userdta, setUserdta] = useState(false);
    const { serverurl } = useAuth();

    const getCurrentUser = async () => {
        try {
            const result = await axios.post(`${serverurl}/api/user/getcurrentuser`, {}, { withCredentials: true });
            setUserdta(result.data);
        } catch (error) {
            // Silencing non-essential logs
            setUserdta(false);
        }
    };

    const logout = async () => {
        try {
            setUserdta(false);
            await axios.get(`${serverurl}/api/auth/logout`, { withCredentials: true });
            toast.success("Logged out successfully");
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    const [cart, setCart] = useState({ products: [] });
    // Wishlist State: Array of product IDs for easy checking
    const [wishlist, setWishlist] = useState([]);

    // --- Cart Functions ---
    const fetchCart = async () => {
        if (!userdta) return;
        try {
            const res = await axios.get(`${serverurl}/api/cart`, { withCredentials: true });
            setCart(res.data);
        } catch (error) {
            console.error("Fetch cart error", error);
        }
    }

    const addToCart = async (productId, size = 'M') => {
        if (!userdta) {
            toast.error("Please Login to Add to Cart");
            return;
        }
        try {
            await axios.post(`${serverurl}/api/cart/add`, { productId, size }, { withCredentials: true });
            fetchCart();
            toast.success("Added to Cart");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add to cart");
        }
    }

    // --- Wishlist Functions ---
    const fetchWishlist = async () => {
        if (!userdta) return;
        try {
            const res = await axios.get(`${serverurl}/api/wishlist`, { withCredentials: true });
            // Assuming res.data is an array of products. We map to IDs.
            // Adjust based on actual API response if needed, but this is standard.
            const ids = res.data.map(item => item._id || item);
            setWishlist(ids);
        } catch (error) {
            // Silencing redundant error logs if list is empty or API not ready
            // console.error("Fetch wishlist error", error);
        }
    }

    const addToWishlist = async (productId) => {
        if (!userdta) {
            toast.error("Please Login to use Wishlist");
            return;
        }
        try {
            await axios.post(`${serverurl}/api/wishlist/add`, { productId }, { withCredentials: true });
            toast.success("Added to Wishlist!");
            fetchWishlist(); // Refresh list to update UI state
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.info("Already in Wishlist");
            } else {
                toast.error("Failed to add to Wishlist");
            }
        }
    }

    useEffect(() => {
        if (userdta) {
            fetchCart();
            fetchWishlist();
        } else {
            setCart({ products: [] });
            setWishlist([]);
        }
    }, [userdta]);

    const value = {
        getCurrentUser,
        userdta,
        setUserdta,
        logout,
        cart,
        fetchCart,
        addToCart,
        wishlist,
        addToWishlist,
        fetchWishlist
    };

    return (
        <usercontext.Provider value={value}>
            {children}
        </usercontext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(usercontext);
};

export default UserContextProvider;
