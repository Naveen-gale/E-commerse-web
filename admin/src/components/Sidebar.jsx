import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation()

    // Added Icons for a Pro look
    const menuItems = [
        { 
            name: 'Dashboard', 
            path: '/', 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            )
        },
        { 
            name: 'Add Product', 
            path: '/add',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            ) 
        },
    ]

    return (
        <div className='w-72 h-screen bg-[#050505] border-r border-white/5 fixed flex flex-col z-50 transition-all duration-300'>
            
            {/* --- Logo Section --- */}
            <div className='h-[80px] flex items-center px-8 border-b border-white/5 mb-6'>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20'>
                        <span className='text-white font-bold text-lg'>A</span>
                    </div>
                    <h1 className='text-xl font-bold tracking-tight text-white'>
                        Admin<span className='text-gray-500 font-normal'>Panel</span>
                    </h1>
                </div>
            </div>

            {/* --- Navigation --- */}
            <nav className='flex-1 flex flex-col gap-2 px-4'>
                <p className='px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 mt-4'>Menu</p>
                
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path
                    
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium overflow-hidden ${
                                isActive
                                    ? 'bg-white text-black shadow-lg shadow-white/5'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {/* Active Indicator Dot */}
                            {isActive && (
                                <div className='absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-500 rounded-r-full'></div>
                            )}

                            {/* Icon */}
                            <span className={`transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-white'}`}>
                                {item.icon}
                            </span>
                            
                            {/* Text */}
                            <span className="relative z-10">
                                {item.name}
                            </span>

                            {/* Hover Glow Effect */}
                            <div className='absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
                        </Link>
                    )
                })}
            </nav>

            {/* --- Footer / User Section --- */}
            <div className='p-4 mt-auto'>
                <div className='bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black border border-white/10 flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <div className='overflow-hidden'>
                        <p className='text-sm text-white font-medium truncate'>Admin User</p>
                        <p className='text-xs text-gray-500 truncate'>StyleSync</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar