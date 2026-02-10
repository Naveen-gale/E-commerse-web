import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    // --- YOUR LOGIC (UNCHANGED) ---
    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/all`)
            setProducts(res.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/products/delete/${id}`)
                fetchProducts() // Refresh list
            } catch (error) {
                alert("Failed to delete")
            }
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    // --- END OF LOGIC ---

    // --- Premium Loading State ---
    if (loading) return (
        <div className='w-full h-screen bg-[#050505] flex items-center justify-center'>
            <div className='flex flex-col items-center gap-4'>
                <div className='w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin'></div>
                <p className='text-gray-400 text-sm tracking-widest uppercase'>Loading Inventory...</p>
            </div>
        </div>
    )

    return (
        <div className='w-full min-h-screen bg-[#050505] text-white pt-24 pb-20 px-4 md:px-12'>

            {/* Background Texture (Consistent with App) */}
            <div className='fixed inset-0 pointer-events-none z-0'>
                <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]' />
            </div>

            <div className='relative z-10 max-w-[1400px] mx-auto'>

                {/* --- Header Section --- */}
                <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8'>
                    <div>
                        <span className='text-blue-500 text-xs font-bold tracking-[0.3em] uppercase mb-2 block'>
                            Admin Panel
                        </span>
                        <h2 className='text-4xl md:text-5xl font-serif font-bold tracking-tight text-white'>
                            Product Dashboard
                        </h2>
                        <p className='text-gray-400 mt-2 text-sm max-w-md'>
                            Manage your collection. Currently displaying <span className='text-white font-semibold'>{products.length}</span> items.
                        </p>
                    </div>

                </div>

                {/* --- Grid Layout --- */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className='group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col'
                        >
                            {/* Image Container */}
                            <div className='relative aspect-[4/5] overflow-hidden bg-gray-900'>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100'
                                />

                                {/* Overlay Gradient */}
                                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60' />

                                {/* Price Tag */}
                                <div className='absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-white border border-white/10'>
                                    ${product.price}
                                </div>
                            </div>

                            {/* Content & Actions */}
                            <div className='p-5 flex flex-col flex-1'>
                                <div className='flex-1 mb-4'>
                                    <h3 className='text-lg font-bold text-white mb-1 truncate'>{product.name}</h3>
                                    <p className='text-gray-400 text-xs leading-relaxed line-clamp-2'>
                                        {product.description || "No description provided."}
                                    </p>
                                </div>

                                {/* Action Bar */}
                                <div className='pt-4 border-t border-white/10 flex items-center justify-between'>
                                    <span className='text-xs text-gray-500 uppercase tracking-wider font-medium'>
                                        ID: {product._id.toString().slice(-4)}
                                    </span>

                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className='flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all duration-300 group/delete'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        <span className='text-xs font-bold uppercase tracking-wide'>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {!loading && products.length === 0 && (
                    <div className='text-center py-32 border border-dashed border-white/10 rounded-2xl bg-white/5'>
                        <p className='text-gray-500 text-lg'>No products found in inventory.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard