import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// --- Mock Data Removed ---
// --- Imports --- (Ensure axios and context are imported)
import axios from 'axios'
import { useUserContext } from '../context/usercontext'
import { useAuth } from '../context/authContext'
import ProductDetailsModal from '../components/ProductDetailsModal'

const CollectionPage = () => {
  const navigate = useNavigate()
  const { addToCart } = useUserContext()
  const { serverurl } = useAuth()

  // State Management
  const [allProducts, setAllProducts] = useState([])
  const [displayProducts, setDisplayProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortType, setSortType] = useState('relevant')

  // Categories for Filter Bar
  const categories = ['All', 'Men', 'Women', 'Kids']

  // --- Fetch Logic ---
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${serverurl}/api/products/all`)
      setAllProducts(res.data)
      setDisplayProducts(res.data)
    } catch (error) {
      console.error("Fetch products error", error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, []) // Fetch on mount

  // --- Filtering & Sorting Logic ---
  useEffect(() => {
    if (allProducts.length === 0) return;

    let result = [...allProducts]

    // 1. Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(item => item.category === activeCategory)
    }

    // ... rest of logic uses result ...
    // Note: Search Logic below needs to use 'result' correctly.

    // 2. Filter by Search (from query param or local state? Using local state as built)
    // If URL has search param, we should probably sync it on mount, but local state is fine for now
    // logic continued below in next chunk if needed or just replacing block
    if (searchQuery) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 3. Sort
    if (sortType === 'low-high') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortType === 'high-low') {
      result.sort((a, b) => b.price - a.price)
    }

    setDisplayProducts(result)
  }, [activeCategory, searchQuery, sortType, allProducts])

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    addToCart(product._id)
  }

  /* --- Modal Logic --- */
  // Only state needed is selectedProduct. "selectedSize" is now handled inside ProductDetailsModal.
  const [selectedProduct, setSelectedProduct] = useState(null)

  const openProduct = (product) => {
    setSelectedProduct(product)
  }

  return (
    <div className='w-full min-h-screen bg-[#050505] text-white pt-10 pb-20 px-4 md:px-8'>

      {/* --- Page Header --- */}
      <div className='max-w-[1400px] mx-auto mb-12 text-center'>
        <h1 className='text-5xl md:text-6xl font-serif font-bold tracking-tight mb-4 animate-fade-in'>
          The Collection
        </h1>
        <p className='text-gray-400 max-w-lg mx-auto'>
          Explore our complete catalog. Timeless designs, sustainable materials, and modern cuts for everyone.
        </p>
      </div>

      {/* --- Controls Bar (Search, Filter, Sort) --- */}
      <div className='sticky top-[70px] z-30 bg-[#050505]/80 backdrop-blur-xl border-y border-white/10 py-4 mb-12'>
        <div className='max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-2'>

          {/* 1. Categories (Scrollable on mobile) */}
          <div className='flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border ${activeCategory === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 text-gray-400 border-transparent hover:border-white/20 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 2. Right Side: Search & Sort */}
          <div className='flex items-center gap-4 w-full md:w-auto'>

            {/* Search Input */}
            <div className='relative flex-1 md:w-64 group'>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/30 transition-all'
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="8" strokeWidth="2"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2"></line>
              </svg>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className='bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-sm text-gray-300 focus:outline-none focus:border-white/30 cursor-pointer hover:text-white transition-colors appearance-none'
            >
              <option value="relevant" className='bg-gray-900'>Sort by: Relevant</option>
              <option value="low-high" className='bg-gray-900'>Price: Low to High</option>
              <option value="high-low" className='bg-gray-900'>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- Product Grid --- */}
      <div className='max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6'>
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => openProduct(product)}
              className='group relative flex flex-col gap-3 cursor-pointer animate-fade-in'
            >
              {/* Image */}
              <div className='relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-900 border border-white/5'>
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100'
                />

                {/* Tag */}
                {product.tag && (
                  <div className='absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black rounded-sm z-10'>
                    {product.tag}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className='flex justify-between items-start pt-1'>
                <div className='flex flex-col'>
                  <h3 className='text-sm font-medium text-white group-hover:text-gray-300 transition-colors'>
                    {product.name}
                  </h3>
                  <p className='text-xs text-gray-500 capitalize'>{product.category}</p>
                </div>
                <span className='text-sm font-semibold text-white'>${product.price}</span>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className='col-span-full py-20 flex flex-col items-center justify-center text-gray-500'>
            <div className='w-16 h-16 border-2 border-dashed border-gray-700 rounded-full flex items-center justify-center mb-4'>
              <span className='text-2xl'>?</span>
            </div>
            <p>No products found matching your criteria.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className='mt-4 text-blue-400 hover:text-blue-300 text-sm underline'
            >
              Clear Filters
            </button>
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

export default CollectionPage