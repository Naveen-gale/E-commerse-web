import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className='w-full bg-black text-white pt-20 pb-10 border-t border-white/10 font-sans'>
      
      {/* --- Top Section: Brand & Socials (Clean Split) --- */}
      <div className='max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-20'>
        
        {/* Brand Identity */}
        <div className='flex flex-col gap-4'>
          <Link to='/' className='flex items-center gap-3 w-fit group'>
             <img src={logo} alt="logo" className='w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-500' />
             <h2 className='text-3xl font-bold tracking-tighter text-white group-hover:text-gray-300 transition-colors'>oencart</h2>
          </Link>
          <p className='text-gray-500 text-sm max-w-sm leading-relaxed'>
            Designed for the bold, crafted for the future. <br />
            Sustainable luxury for the modern individual.
          </p>
        </div>

        {/* Social Icons (Prominent) */}
        <div className='flex items-center gap-4'>
            {['Instagram', 'Twitter', 'Facebook', 'Pinterest'].map((social) => (
                <a 
                    key={social} 
                    href="#" 
                    className='group relative w-12 h-12 rounded-full border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-white'
                >
                    <div className='absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out'></div>
                    <span className='sr-only'>{social}</span>
                    {/* Icon changes color on hover due to mix-blend-mode or z-index text color swap logic, simplified here with relative z-index */}
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-black relative z-10 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                </a>
            ))}
        </div>
      </div>

      {/* --- Divider --- */}
      <div className='w-full h-px bg-white/5 mb-16'></div>

      {/* --- Middle Section: Links Grid --- */}
      <div className='max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 mb-20'>
        
        {/* Column 1 */}
        <div className='flex flex-col gap-6'>
          <h4 className='text-xs font-bold uppercase tracking-[0.2em] text-white'>Shop</h4>
          <ul className='flex flex-col gap-3 text-gray-500 text-sm font-medium'>
            <li><Link to="/men" className='hover:text-white transition-colors duration-300'>Men</Link></li>
            <li><Link to="/women" className='hover:text-white transition-colors duration-300'>Women</Link></li>
            <li><Link to="/kids" className='hover:text-white transition-colors duration-300'>Kids</Link></li>
            <li><Link to="/collection" className='hover:text-white transition-colors duration-300'>New Arrivals</Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className='flex flex-col gap-6'>
          <h4 className='text-xs font-bold uppercase tracking-[0.2em] text-white'>Company</h4>
          <ul className='flex flex-col gap-3 text-gray-500 text-sm font-medium'>
            <li><Link to="/about" className='hover:text-white transition-colors duration-300'>Our Story</Link></li>
            <li><Link to="/contact" className='hover:text-white transition-colors duration-300'>Careers</Link></li>
            <li><Link to="/about" className='hover:text-white transition-colors duration-300'>Sustainability</Link></li>
            <li><Link to="/contact" className='hover:text-white transition-colors duration-300'>Press</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className='flex flex-col gap-6'>
          <h4 className='text-xs font-bold uppercase tracking-[0.2em] text-white'>Support</h4>
          <ul className='flex flex-col gap-3 text-gray-500 text-sm font-medium'>
            <li><Link to="/contact" className='hover:text-white transition-colors duration-300'>Contact Us</Link></li>
            <li><Link to="/contact" className='hover:text-white transition-colors duration-300'>Shipping & Returns</Link></li>
            <li><Link to="/contact" className='hover:text-white transition-colors duration-300'>FAQ</Link></li>
            <li><Link to="/contact" className='hover:text-white transition-colors duration-300'>Size Guide</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className='flex flex-col gap-6'>
          <h4 className='text-xs font-bold uppercase tracking-[0.2em] text-white'>Legal</h4>
          <ul className='flex flex-col gap-3 text-gray-500 text-sm font-medium'>
            <li><Link to="/" className='hover:text-white transition-colors duration-300'>Terms of Service</Link></li>
            <li><Link to="/" className='hover:text-white transition-colors duration-300'>Privacy Policy</Link></li>
            <li><Link to="/" className='hover:text-white transition-colors duration-300'>Cookie Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* --- Bottom Section: Copyright --- */}
      <div className='max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5'>
        <p className='text-xs text-gray-600 tracking-wide'>
          © {new Date().getFullYear()} Oencart Inc. All rights reserved.
        </p>
        
        {/* Minimalist Payment Icons */}
        <div className='flex gap-3 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500'>
             <div className="h-5 w-8 bg-white/10 rounded-sm"></div>
             <div className="h-5 w-8 bg-white/10 rounded-sm"></div>
             <div className="h-5 w-8 bg-white/10 rounded-sm"></div>
        </div>
      </div>

    </footer>
  )
}

export default Footer