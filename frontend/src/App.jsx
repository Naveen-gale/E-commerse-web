import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Imports ---
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import NaveBar from './components/NaveBar'
import Men from './components/Men'
import Women from './components/Women'
import Kids from './components/Kids'
import Winter from './components/Winter'
import { useUserContext } from './context/usercontext'
import CollectionPage from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './components/Cart'
import ThankYou from './pages/ThankYou'

const App = () => {
  const { userdta } = useUserContext()
  const location = useLocation()

  // Redirect Admin
  React.useEffect(() => {
    if (userdta && userdta.role === 'admin') {
      window.location.href = 'http://localhost:5174';
    }
  }, [userdta])

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div className='relative min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-blue-500/30'>

      {/* Toast Notification Container */}
      <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />

      {/* --- Global Background Ambience & Texture --- */}
      {!isAuthPage && (
        <div className='fixed inset-0 z-0 pointer-events-none'>
          {/* Color Blobs */}
          <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]' />
          <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]' />
          {/* Noise Texture */}
          <div className='absolute inset-0 opacity-[0.03] bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>
        </div>
      )}

      {/* --- Navbar --- */}
      {!isAuthPage && <NaveBar />}

      {/* --- Main Content --- */}
      <div className={`relative z-10 ${isAuthPage ? 'p-0' : 'pt-[80px] pb-10'}`}>
        <Routes>
          {/* Auth Routes */}
          <Route path="/signup" element={userdta ? <Navigate to="/" /> : <RegisterPage />} />
          <Route path="/login" element={userdta ? <Navigate to="/" /> : <LoginPage />} />

          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/winter" element={<Winter />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </div>
    </div>
  )
}

export default App