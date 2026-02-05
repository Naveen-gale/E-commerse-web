import React from 'react'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div className='w-full min-h-screen bg-[#050505] text-white'>
      
      {/* --- Hero Section (Text Only) --- */}
      <div className='max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-24 text-center'>
        <span className='text-blue-500 text-xs font-bold tracking-[0.3em] uppercase mb-6 block animate-fade-in'>
          Since 2024
        </span>
        <h1 className='text-5xl md:text-8xl font-serif font-bold tracking-tight leading-tight animate-fade-in [animation-delay:200ms]'>
          Redefining <br />
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600'>
            Modern Luxury.
          </span>
        </h1>
      </div>

      {/* --- Story Section (Image + Text Split) --- */}
      <div className='w-full bg-white/5 border-y border-white/5'>
        <div className='max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2'>
            
            {/* Image Side */}
            <div className='relative h-[500px] md:h-auto overflow-hidden group'>
                <img 
                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop" 
                    alt="Fashion Workshop" 
                    className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0'
                />
                <div className='absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors'></div>
            </div>

            {/* Text Side */}
            <div className='flex flex-col justify-center p-12 md:p-24 space-y-8'>
                <h2 className='text-3xl md:text-4xl font-serif font-medium'>
                    Crafted for the bold.
                </h2>
                <div className='space-y-6 text-gray-400 leading-relaxed font-light text-lg'>
                    <p>
                        Oencart began with a simple idea: that luxury shouldn't be defined by a price tag, but by the feeling it gives you. We bridge the gap between streetwear attitude and high-fashion elegance.
                    </p>
                    <p>
                        Every stitch tells a story of precision. We source sustainable materials from around the globe to create pieces that not only look good but stand the test of time.
                    </p>
                </div>
                
                {/* Signature / Quote */}
                <div className='pt-8 border-t border-white/10'>
                    <p className='text-white font-serif italic text-xl'>
                        "Fashion is the armor to survive the reality of everyday life."
                    </p>
                    <p className='text-sm text-gray-500 mt-2 uppercase tracking-widest'>— Bill Cunningham</p>
                </div>
            </div>
        </div>
      </div>

      {/* --- Values Grid --- */}
      <div className='max-w-[1400px] mx-auto px-6 md:px-12 py-32'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
            
            {/* Value 1 */}
            <div className='space-y-4 text-center md:text-left group hover:-translate-y-2 transition-transform duration-500'>
                <div className='w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors mx-auto md:mx-0'>
                    <svg className="w-8 h-8 text-blue-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className='text-xl font-bold text-white'>Sustainable Future</h3>
                <p className='text-gray-400 leading-relaxed'>
                    We are committed to reducing our carbon footprint by using 100% recycled packaging and ethically sourced fabrics.
                </p>
            </div>

            {/* Value 2 */}
            <div className='space-y-4 text-center md:text-left group hover:-translate-y-2 transition-transform duration-500'>
                <div className='w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors mx-auto md:mx-0'>
                    <svg className="w-8 h-8 text-purple-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className='text-xl font-bold text-white'>Unmatched Quality</h3>
                <p className='text-gray-400 leading-relaxed'>
                    Fast fashion fades. Our pieces are engineered to last, combining durability with timeless aesthetics.
                </p>
            </div>

            {/* Value 3 */}
            <div className='space-y-4 text-center md:text-left group hover:-translate-y-2 transition-transform duration-500'>
                <div className='w-16 h-16 bg-pink-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-600 transition-colors mx-auto md:mx-0'>
                    <svg className="w-8 h-8 text-pink-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <h3 className='text-xl font-bold text-white'>Customer First</h3>
                <p className='text-gray-400 leading-relaxed'>
                    From our design studio to your doorstep, we ensure a seamless experience. 24/7 support and hassle-free returns.
                </p>
            </div>

        </div>
      </div>

      {/* --- Stats Banner --- */}
      <div className='w-full border-t border-white/10 py-16 bg-white/[0.02]'>
        <div className='max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            
            <div className='space-y-2'>
                <h4 className='text-4xl md:text-5xl font-serif font-bold text-white'>10k+</h4>
                <p className='text-xs uppercase tracking-widest text-gray-500'>Happy Customers</p>
            </div>

            <div className='space-y-2'>
                <h4 className='text-4xl md:text-5xl font-serif font-bold text-white'>50+</h4>
                <p className='text-xs uppercase tracking-widest text-gray-500'>Design Awards</p>
            </div>

            <div className='space-y-2'>
                <h4 className='text-4xl md:text-5xl font-serif font-bold text-white'>100%</h4>
                <p className='text-xs uppercase tracking-widest text-gray-500'>Sustainable</p>
            </div>

            <div className='space-y-2'>
                <h4 className='text-4xl md:text-5xl font-serif font-bold text-white'>24/7</h4>
                <p className='text-xs uppercase tracking-widest text-gray-500'>Support</p>
            </div>

        </div>
      </div>
      <Footer/>

    </div>
  )
}

export default About