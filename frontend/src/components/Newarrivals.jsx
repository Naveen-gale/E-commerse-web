import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useUserContext } from '../context/usercontext';
import ProductDetailsModal from './ProductDetailsModal';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const { serverurl } = useAuth();
  const { addToCart, addToWishlist } = useUserContext();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await axios.get(`${serverurl}/api/products/all`);
        const allProducts = res.data;
        // Filter for category "New Arrivals"
        const newArrivals = allProducts.filter(p => p.category === 'New Arrivals');

        if (newArrivals.length > 0) {
          setProducts(newArrivals.slice(0, 4));
        } else {
          // Fallback: Show latest 4 products
          setProducts(allProducts.slice(-4).reverse());
        }
      } catch (error) {
        console.error("Fetch new arrivals error", error);
      }
    };
    fetchNewArrivals();
  }, [serverurl]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product._id);
  };

  const handleWishlist = (e, product) => {
    e.stopPropagation();
    addToWishlist(product._id);
  }

  /* --- Modal Logic --- */
  const [selectedProduct, setSelectedProduct] = useState(null)

  const openProduct = (product) => {
    setSelectedProduct(product)
  }

  return (
    <div className="w-full bg-[#050505] py-24 px-4 md:px-12 border-t border-white/5">

      {/* --- Section Header --- */}
      <div className="max-w-[1400px] mx-auto mb-16 text-center space-y-4">
        <span className="text-purple-500 text-xs font-bold tracking-[0.3em] uppercase">
          Fresh Drops
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
          New Arrivals
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto text-sm">
          Be the first to wear our latest cuts and designs.
        </p>
      </div>

      {/* --- Product Grid --- */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => openProduct(product)}
            className="group relative flex flex-col gap-4 cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-900 border border-white/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* "New" Tag Badge - Optional if desired */}
              <div className="absolute top-3 left-3 bg-purple-600/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white rounded-sm z-10 shadow-lg shadow-purple-900/20">
                New
              </div>

              {/* Wishlist Icon */}
              <button
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-purple-600 cursor-pointer"
                onClick={(e) => handleWishlist(e, product)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-white group-hover:text-gray-300 transition-colors truncate pr-2">
                  {product.name}
                </h3>
                <span className="text-white font-semibold whitespace-nowrap">₹{product.price}</span>
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => { e.stopPropagation(); openProduct(product); }}
              className="w-full py-3 mt-2 border border-white/20 rounded-lg text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 group/btn cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:rotate-12 transition-transform"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Add to Cart
            </button>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No new arrivals available.</div>
        )}
      </div>

      {/* --- Product Details Popup --- */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default NewArrivals;