import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: 'Men',
        image: null
    })
    const [loading, setLoading] = useState(false)
    const [sizes, setSizes] = useState([])

    // --- LOGIC STARTS (UNCHANGED) ---
    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = new FormData()
        data.append('name', formData.name)
        data.append('price', formData.price)
        data.append('description', formData.description)
        data.append('category', formData.category)
        data.append('sizes', JSON.stringify(sizes))
        data.append('image', formData.image)

        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/products/add`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            alert("Product Added Successfully!")
            navigate('/')
        } catch (error) {
            console.error(error)
            alert("Failed to add product")
        } finally {
            setLoading(false)
        }
    }
    // --- LOGIC ENDS ---

    return (
        <div className='w-full h-full bg-[#050505] text-white pt-24 pb-20 px-4 md:px-12'>

            {/* --- Background Texture --- */}
            <div className='fixed inset-0 pointer-events-none z-0'>
                <div className='absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]' />
                <div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]' />
                <div className='absolute inset-0 opacity-[0.03] bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>
            </div>

            <div className='relative z-10 max-w-2xl mx-auto'>

                {/* --- Header --- */}
                <div className='mb-10 text-center'>
                    <span className='text-blue-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block'>
                        Inventory Management
                    </span>
                    <h2 className='text-4xl font-serif font-bold text-white'>
                        Add New Product
                    </h2>
                </div>

                {/* --- Form Card --- */}
                <form
                    onSubmit={handleSubmit}
                    className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl space-y-8'
                >

                    {/* Name */}
                    <div className='space-y-2'>
                        <label className='text-xs font-bold uppercase tracking-widest text-gray-500 ml-1'>Product Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="e.g. Vintage Leather Jacket"
                            className='w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all'
                            onChange={handleChange}
                        />
                    </div>

                    {/* Price & Category Row */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-2'>
                            <label className='text-xs font-bold uppercase tracking-widest text-gray-500 ml-1'>Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                required
                                placeholder="0.00"
                                className='w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='space-y-2'>
                            <label className='text-xs font-bold uppercase tracking-widest text-gray-500 ml-1'>Category</label>
                            <div className='relative'>
                                <select
                                    name="category"
                                    className='w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all appearance-none cursor-pointer'
                                    onChange={handleChange}
                                >
                                    <option value="Men" className="bg-gray-900 text-white">Men</option>
                                    <option value="Women" className="bg-gray-900 text-white">Women</option>
                                    <option value="Kids" className="bg-gray-900 text-white">Kids</option>
                                    <option value="Winter" className="bg-gray-900 text-white">Winter</option>
                                    <option value="Trending" className="bg-gray-900 text-white">Trending</option>
                                    <option value="New Arrivals" className="bg-gray-900 text-white">New Arrivals</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M6 9l6 6 6-6" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className='space-y-2'>
                        <label className='text-xs font-bold uppercase tracking-widest text-gray-500 ml-1'>Description</label>
                        <textarea
                            name="description"
                            required
                            rows="4"
                            placeholder="Detailed product description..."
                            className='w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all resize-none'
                            onChange={handleChange}
                        />
                    </div>

                    {/* Sizes */}
                    <div className='space-y-3'>
                        <label className='text-xs font-bold uppercase tracking-widest text-gray-500 ml-1'>Product Sizes</label>
                        <div className='flex gap-3'>
                            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <div
                                    key={size}
                                    onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                                    className={`w-12 h-12 flex items-center justify-center rounded-lg border cursor-pointer transition-all
                                    ${sizes.includes(size)
                                            ? 'bg-white text-black border-white'
                                            : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                                        }`}
                                >
                                    <span className="font-bold">{size}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Upload Area */}
                    <div className='space-y-2'>
                        <label className='text-xs font-bold uppercase tracking-widest text-gray-500 ml-1'>Product Image</label>
                        <div className='relative group'>
                            <input
                                type="file"
                                name="image"
                                required
                                accept="image/*"
                                className='w-full text-sm text-gray-400
                                file:mr-4 file:py-3 file:px-6
                                file:rounded-xl file:border-0
                                file:text-xs file:font-bold file:uppercase file:tracking-widest
                                file:bg-white file:text-black
                                hover:file:bg-gray-200
                                cursor-pointer
                                bg-black/40 border border-white/10 rounded-xl p-2
                                transition-all'
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full font-bold py-5 rounded-xl transition-all duration-300 transform shadow-xl mt-4 
                        ${loading
                                ? 'bg-gray-800 cursor-not-allowed opacity-80'
                                : 'bg-white text-black hover:bg-gray-200 active:scale-[0.98] hover:shadow-white/10'
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-3">
                                <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className='uppercase tracking-widest text-xs'>Uploading...</span>
                            </div>
                        ) : (
                            <span className='uppercase tracking-widest text-xs'>Publish Product</span>
                        )}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default AddProduct