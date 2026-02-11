import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useUserContext } from '../context/usercontext'

const NaveBar = () => {
    const { userdta, logout, cart } = useUserContext()
    const navigate = useNavigate()
    const location = useLocation()

    // --- Original States ---
    const [searchVisible, setSearchVisible] = useState(false)
    const [profileMenuVisible, setProfileMenuVisible] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // --- Smart Scroll State ---
    const [visible, setVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    // --- Route Changes Effect ---
    useEffect(() => {
        setMobileMenuOpen(false)
        setProfileMenuVisible(false)
        setSearchVisible(false)
        setVisible(true) // Ensure navbar is visible on route change
        window.scrollTo(0, 0)
    }, [location])

    // --- Smart Navbar Logic (Made Predictable) ---
    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                const currentScrollY = window.scrollY

                // Prevent hiding if user is interacting with search, profile, or mobile menu
                if (searchVisible || profileMenuVisible || mobileMenuOpen) {
                    setVisible(true)
                    setLastScrollY(currentScrollY)
                    return
                }

                // Prevent iOS bounce scroll glitches
                if (currentScrollY <= 0) {
                    setVisible(true)
                } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
                    // Scrolling DOWN -> HIDE
                    setVisible(false)
                } else {
                    // Scrolling UP -> SHOW
                    setVisible(true)
                }
                
                setLastScrollY(currentScrollY)
            }
        }

        window.addEventListener('scroll', controlNavbar)
        return () => window.removeEventListener('scroll', controlNavbar)
    }, [lastScrollY, mobileMenuOpen, searchVisible, profileMenuVisible])

    // --- Lock Body Scroll when Mobile Menu Open ---
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [mobileMenuOpen])

    // --- Handlers ---
    const handleLogout = async () => {
        await logout()
        setProfileMenuVisible(false)
        navigate('/login')
    }

    const handleMobileLogout = async () => {
        await logout()
        setMobileMenuOpen(false)
        navigate('/login')
    }

    return (
        <>
            {/* --- Main Navbar Container --- */}
            <div
                className={`w-full h-[70px] md:h-[80px] bg-black/90 md:bg-black/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 md:px-12 fixed top-0 z-50 transition-transform duration-300 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'}`}
            >
                {/* 1. Mobile Menu Button */}
                <div className='md:hidden flex items-center z-50 flex-shrink-0 w-1/4'>
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className='text-white p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors'
                        aria-label="Open Mobile Menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </button>
                </div>

                {/* 2. Logo Section */}
                <div className="flex-shrink-0 flex justify-center md:w-auto w-2/4 z-50">
                    <Link to="/" className='flex items-center gap-2 cursor-pointer group'>
                        <img
                            className='w-7 h-7 md:w-8 md:h-8 object-contain opacity-90 group-hover:opacity-100 transition-opacity'
                            src={logo}
                            alt="StyleSync logo"
                        />
                        <h3 className='font-sans text-lg md:text-xl font-bold tracking-tighter text-white group-hover:text-gray-300 transition-colors'>
                            StyleSync
                        </h3>
                    </Link>
                </div>

                {/* 3. Desktop Navigation Links */}
                <div className='hidden md:flex items-center justify-center gap-10 absolute left-1/2 -translate-x-1/2'>
                    {['/', '/collection', '/about', '/contact'].map((path) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) => `
                                relative text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 
                                ${isActive ? 'text-white' : 'text-gray-500 hover:text-white'}
                                after:content-[''] after:absolute after:left-0 after:-bottom-2 
                                after:w-full after:h-[1px] after:bg-white 
                                ${isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-50'}
                                after:transition-transform after:duration-300
                            `}
                        >
                            {path === '/' ? 'Home' : path.replace('/', '')}
                        </NavLink>
                    ))}
                </div>

                {/* 4. Right Icons Section */}
                <div className='flex items-center justify-end gap-1 md:gap-3 z-50 flex-shrink-0 w-1/4'>
                    {/* Search Icon */}
                    <button
                        onClick={() => {
                            setSearchVisible(!searchVisible)
                            setProfileMenuVisible(false) // close profile if opening search
                        }}
                        className='text-gray-400 hover:text-white transition-colors duration-300 p-2'
                        aria-label="Toggle Search"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>

                    {/* Cart Icon */}
                    <button
                        onClick={() => navigate('/cart')}
                        className='relative text-gray-400 hover:text-white transition-colors duration-300 p-2 mr-1 md:mr-0'
                        aria-label="Go to Cart"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        <div className='absolute top-0 right-0 bg-white text-black text-[9px] md:text-[10px] w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center font-bold shadow-sm'>
                            {userdta && cart?.products ? cart.products.reduce((acc, item) => acc + item.quantity, 0) : 0}
                        </div>
                    </button>

                    {/* Profile Section (Desktop / Small View) */}
                    <div className='relative'>
                        {userdta ? (
                            <div
                                className='w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:bg-white/20 transition-all select-none'
                                onClick={() => {
                                    setProfileMenuVisible(!profileMenuVisible)
                                    setSearchVisible(false) // close search if opening profile
                                }}
                            >
                                {userdta.name ? userdta.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                        ) : (
                            <button
                                className='text-gray-400 hover:text-white transition-colors duration-300 p-2'
                                onClick={() => navigate('/login')}
                                aria-label="Go to Login"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </button>
                        )}

                        {/* Dropdown Menu */}
                        {userdta && profileMenuVisible && (
                            <div className='absolute top-12 right-0 w-48 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50'>
                                <div className='px-4 py-3 border-b border-white/5 bg-white/5'>
                                    <p className='text-[10px] text-gray-500 uppercase tracking-wider mb-1'>Signed in as</p>
                                    <p className='text-sm text-white font-medium truncate'>{userdta.name}</p>
                                </div>
                                <div className='p-1'>
                                    <button
                                        onClick={handleLogout}
                                        className='w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2'
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu Overlay --- */}
            <div
                className={`fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setMobileMenuOpen(false)}
                    className='absolute top-6 right-6 text-gray-400 hover:text-white p-2 z-[101] bg-white/5 rounded-full'
                    aria-label="Close Mobile Menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                {/* Mobile Links */}
                <div className='flex flex-col items-center gap-6 md:gap-8 w-full px-6'>
                    {['/', '/collection', '/about', '/contact'].map((path) => (
                        <NavLink
                            key={path}
                            to={path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) => `
                                text-3xl md:text-4xl font-serif font-light tracking-wide transition-all duration-300 w-full text-center py-2
                                ${isActive ? 'text-white scale-105' : 'text-gray-500 hover:text-white'}
                            `}
                        >
                            {path === '/' ? 'Home' : path.replace('/', '')}
                        </NavLink>
                    ))}

                    {/* Mobile Only Logout */}
                    {userdta && (
                        <button
                            onClick={handleMobileLogout}
                            className='mt-8 text-sm text-red-500 uppercase tracking-widest border border-red-900/30 px-8 py-3 rounded-full hover:bg-red-900/10 transition-colors w-3/4 max-w-xs'
                        >
                            Logout
                        </button>
                    )}
                </div>

                <div className='w-12 h-[1px] bg-white/10 mt-12 mb-8'></div>
                <p className='text-gray-600 text-[10px] tracking-[0.3em] uppercase'>
                    Fashion • Style • Luxury
                </p>
            </div>

            {/* --- Search Bar Overlay --- */}
            {searchVisible && (
                <div className={`fixed left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-4 z-40 transition-all duration-300 ${visible ? 'top-[70px] md:top-[80px]' : 'top-0'}`}>
                    <div className='max-w-2xl mx-auto relative animate-in slide-in-from-top-4 duration-300'>
                        <input
                            type="text"
                            placeholder="Search collection..."
                            className='w-full bg-white/10 border border-white/10 rounded-full px-12 py-3 text-sm md:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all shadow-inner'
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setSearchVisible(false)
                                    navigate(`/collection?search=${e.target.value}`)
                                }
                            }}
                        />
                        <div className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                        <button
                            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors'
                            onClick={() => setSearchVisible(false)}
                            aria-label="Close Search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default NaveBar