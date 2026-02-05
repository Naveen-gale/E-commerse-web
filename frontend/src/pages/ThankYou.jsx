import React from 'react'
import { useNavigate } from 'react-router-dom'

const ThankYou = () => {
    const navigate = useNavigate()

    return (
        <div className='relative min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-4 font-sans overflow-hidden'>

            {/* --- Background Ambience & Texture (Consistent with App) --- */}
            <div className='fixed inset-0 pointer-events-none'>
                <div className='absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-green-900/20 rounded-full blur-[120px]' />
                <div className='absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]' />
                <div className='absolute inset-0 opacity-[0.03] bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>
            </div>

            {/* --- Main Card --- */}
            <div className='relative z-10 max-w-md w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-14 text-center shadow-2xl'>

                {/* Animated Icon Container */}
                <div className='flex justify-center mb-8'>
                    <div className='relative'>
                        {/* Pulse Ring */}
                        <div className='absolute inset-0 bg-green-500/30 rounded-full animate-ping'></div>
                        <div className='absolute inset-0 bg-green-500/20 rounded-full blur-xl'></div>

                        {/* Main Icon Circle */}
                        <div className='relative w-24 h-24 bg-gradient-to-tr from-green-600 to-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 border border-white/20'>
                            <svg className="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Typography */}
                <h1 className='text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight'>
                    Thank You!
                </h1>

                <div className='space-y-3 mb-10'>
                    <p className='text-lg text-gray-300 font-medium'>
                        Your order has been placed successfully.
                    </p>

                    <div className='inline-block bg-white/10 px-4 py-2 rounded-lg border border-white/10'>
                        <span className='text-green-400 font-bold tracking-wide uppercase text-xs'>Payment: Cash on Delivery</span>
                    </div>

                    <p className='text-sm text-gray-500 leading-relaxed max-w-xs mx-auto'>
                        Check your mailbox for the order details. You will receive an email confirmation shortly.
                    </p>
                </div>

                {/* Action Button (Logic Untouched) */}
                <button
                    onClick={() => navigate('/')}
                    className='w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] shadow-xl shadow-white/5'
                >
                    Continue Shopping
                </button>
            </div>

            {/* Decorative Footer Text */}
            <div className='absolute bottom-8 text-xs text-gray-600 tracking-widest uppercase'>
                Order Completed
            </div>

        </div>
    )
}

export default ThankYou