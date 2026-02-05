import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useUserContext } from '../context/usercontext'
import { useAuth } from '../context/authContext'
import ProductDetailsModal from './ProductDetailsModal'

const Women = () => {
  const { addToCart } = useUserContext()
  const { serverurl } = useAuth()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${serverurl}/api/products/all?category=Women`)
        setProducts(res.data)
      } catch (error) {
        console.error("Fetch women products error", error)
      }
    }
    fetchProducts()
  }, [serverurl])

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    addToCart(product._id)
  }

  // Placeholder for Wishlist (Like) functionality
  const handleLike = (e, product) => {
    e.stopPropagation()
    alert("Wishlist feature coming soon!")
  }

  /* --- Modal Logic --- */
  const [selectedProduct, setSelectedProduct] = useState(null)

  const openProduct = (product) => {
    setSelectedProduct(product)
  }

  return (
    <div className='w-full min-h-screen bg-[#050505] text-white pt-10 pb-20 px-4 md:px-12'>

      {/* Header */}
      <div className='max-w-[1400px] mx-auto mb-12 text-center'>
        <h1 className='text-5xl md:text-7xl font-serif font-bold tracking-tight mb-4 animate-fade-in'>
          Women's Collection
        </h1>
        <p className='text-gray-400 max-w-lg mx-auto text-sm md:text-base'>
          Elegant designs for the contemporary woman. Explore our curated selection of dresses, outerwear, and accessories.
        </p>
      </div>

      {/* Product Grid */}
      <div className='max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8'>

        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              onClick={() => openProduct(product)}
              className='group relative flex flex-col gap-4 cursor-pointer animate-fade-in'
            >
              {/* Image Container */}
              <div className='relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-900'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                />

                {product.tag && (
                  <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black rounded-sm z-10'>
                    {product.tag}
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => handleLike(e, product)}
                  className='absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-red-500'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
              </div>

              {/* Product Info */}
              <div className='flex flex-col gap-1'>
                <div className='flex justify-between items-start'>
                  <h3 className='text-lg font-medium text-white group-hover:text-gray-300 transition-colors'>
                    {product.name}
                  </h3>
                  <span className='text-white font-semibold'>${product.price}</span>
                </div>
                <p className='text-xs text-gray-500'>{product.category}</p>
              </div>

              {/* Add to Cart Button */}
              <button
                className='w-full py-3 mt-2 border border-white/20 rounded-lg text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.98]'
                onClick={(e) => { e.stopPropagation(); openProduct(product); }}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-20">
            No products found in Women's category.
          </div>
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
  )
}

export default Women