import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Imports ---
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'))
const LoginPage = React.lazy(() => import('./pages/LoginPage'))
const HomePage = React.lazy(() => import('./pages/HomePage'))
import NaveBar from './components/NaveBar'
const Men = React.lazy(() => import('./components/Men'))
const Women = React.lazy(() => import('./components/Women'))
const Kids = React.lazy(() => import('./components/Kids'))
const Winter = React.lazy(() => import('./components/Winter'))
const CollectionPage = React.lazy(() => import('./pages/Collection')) // Huge win
const About = React.lazy(() => import('./pages/About'))
const Contact = React.lazy(() => import('./pages/Contact'))
const Cart = React.lazy(() => import('./components/Cart'))
const ThankYou = React.lazy(() => import('./pages/ThankYou'))
import { useUserContext } from './context/usercontext' // Context must be eager


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
        <React.Suspense fallback={
          <div className="min-h-screen flex items-center justify-center text-white">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
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
        </React.Suspense>
      </div>
    </div>
  )
}

export default App