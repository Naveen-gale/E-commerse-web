import React, { useState, useEffect } from 'react'

const ProductDetailsModal = ({ product, onClose, addToCart }) => {
    const [selectedSize, setSelectedSize] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [recommendedSize, setRecommendedSize] = useState(null)

    // Initialize default size if available
    useEffect(() => {
        if (product.sizes && product.sizes.length > 0) {
            setSelectedSize(product.sizes[0])
        }
    }, [product])

    // AI Recommendation Logic
    const getRecommendation = () => {
        if (!height || !weight) {
            alert("Please enter both height and weight for a recommendation.")
            return
        }

        const h = parseFloat(height) // Feet
        const w = parseFloat(weight) // Kg

        let size = 'M' // Default

        // Simple Heuristic Logic
        if (h < 5.3 && w < 55) {
            size = 'S'
        } else if (h >= 5.3 && h < 5.8 && w >= 55 && w < 70) {
            size = 'M'
        } else if (h >= 5.8 && h < 6.0 && w >= 70 && w < 80) {
            size = 'L'
        } else if (h >= 6.0 && h < 6.2 && w >= 80 && w < 95) {
            size = 'XL'
        } else if (h >= 6.2 || w >= 95) {
            size = 'XXL'
        }

        // Adjust if weight pushes it up a category
        if (w > 100) size = 'XXL'
        else if (w > 85 && size !== 'XXL') size = 'XL'

        setRecommendedSize(size)
        setSelectedSize(size) // Auto-select the recommended size
    }

    const handleClearRecommendation = () => {
        setHeight('')
        setWeight('')
        setRecommendedSize(null)
    }

    const handleAddToCart = () => {
        addToCart(product._id, selectedSize)
        onClose()
    }

    if (!product) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[90vh] md:max-h-auto overflow-y-auto md:overflow-visible">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                {/* Image Section */}
                <div className="md:w-1/2 h-64 md:h-auto bg-gray-900 relative shrink-0">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                    <div>
                        <div className="mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{product.category}</span>
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-white mb-2">{product.name}</h2>
                        <div className="text-xl font-semibold text-white mb-6">${product.price}</div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {product.description}
                        </p>

                        {/* AI Size Recommender */}
                        <div className="mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-purple-400 uppercase tracking-widest mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                AI Size Recommender
                            </h4>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Height (Feet)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 5.9"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Weight (Kg)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 70"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500 outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={getRecommendation}
                                    className="flex-1 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-purple-600/40 transition-all"
                                >
                                    Ask AI for Size
                                </button>
                                {(recommendedSize || height || weight) && (
                                    <button
                                        onClick={handleClearRecommendation}
                                        className="px-4 py-2 bg-white/5 text-gray-400 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>

                            {recommendedSize && (
                                <div className="mt-3 text-center text-sm">
                                    <span className="text-gray-400">Recommended Size: </span>
                                    <span className="text-purple-400 font-bold text-lg">{recommendedSize}</span>
                                </div>
                            )}
                        </div>

                        {/* Size Selector */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-8">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-3">Select Size</span>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map(size => {
                                        const isSelected = selectedSize === size;
                                        const isRecommended = recommendedSize === size;

                                        return (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-12 h-12 rounded-lg border flex items-center justify-center text-sm font-medium transition-all relative
                                                    ${isSelected
                                                        ? 'bg-white text-black border-white shadow-md transform scale-105'
                                                        : isRecommended
                                                            ? 'bg-purple-500/20 text-purple-300 border-purple-500' // Recommended but not selected
                                                            : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50 hover:text-white' // Normal
                                                    }`}
                                            >
                                                {size}
                                                {isRecommended && (
                                                    <span className="absolute -top-2 -right-2 flex h-4 w-4">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500 items-center justify-center text-[8px] text-white">★</span>
                                                    </span>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-white text-black font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-gray-200 active:scale-[0.98] transition-all"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Backdrop click to close */}
            <div className="absolute inset-0 -z-10" onClick={onClose}></div>
        </div>
    )
}

export default ProductDetailsModal
