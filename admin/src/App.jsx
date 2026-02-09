import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'

const App = () => {
  return (
    <div className='flex min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30'>
      
      {/* 1. Sidebar (Fixed Position) */}
      <Sidebar />

      {/* 2. Main Content Area */}
      {/* ml-72 matches the w-72 of the Sidebar, ensuring perfect alignment */}
      <div className='flex-1 ml-72 relative min-h-screen'>
        
        {/* --- Global Background Ambience --- */}
        {/* Fixed position ensures the glow stays put while you scroll down the dashboard */}
        <div className='fixed inset-0 z-0 pointer-events-none'>
          {/* Top Blue Glow */}
          <div className='absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]' />
          
          {/* Bottom Purple Glow */}
          <div className='absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]' />
          
          {/* Noise Texture for Premium Feel */}
          <div className='absolute inset-0 opacity-[0.03] bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>
        </div>

        {/* --- Page Routes --- */}
        {/* z-10 puts the content ABOVE the background blobs */}
        <div className='relative z-10'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddProduct />} />
          </Routes>
        </div>

      </div>
    </div>
  )
}

export default App