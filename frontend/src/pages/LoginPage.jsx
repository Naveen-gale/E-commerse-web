import React, { useState } from 'react'
import logo from '../assets/logo.png'
import googleLogo from '../assets/google.png'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../utils/firebase'
import { useUserContext } from '../context/usercontext'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const navigate = useNavigate()
  const { serverurl } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { getCurrentUser } = useUserContext()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${serverurl}/api/auth/login`, {
        email,
        password
      }, {
        withCredentials: true
      })

      const data = res.data

      if (res.status === 200) {
        getCurrentUser()

        if (data.user.role === 'admin') {
          window.location.href = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174';
          return;
        }

        toast.success("Login Successful!")
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Login Failed")
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider)
      const user = response.user

      const result = await axios.post(`${serverurl}/api/auth/google-login`, {
        name: user.displayName,
        email: user.email,
        intent: 'login'
      }, {
        withCredentials: true
      })

      if (result.status === 200) {
        getCurrentUser()
        toast.success("Login Successful!")
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      // Handle Firebase popup closed
      if (error.code === 'auth/popup-closed-by-user') {
        toast.info("Sign-in cancelled")
        return
      }
      // Handle backend errors (like 'User not found')
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Google Login Failed")
      }
    }
  }

  return (
    <div className='relative w-screen h-screen flex flex-col bg-[#050505] text-white overflow-hidden selection:bg-blue-500/30'>

      {/* --- Ambient Background Effects --- */}
      <div className='absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none' />

      {/* Header / Logo */}
      <div className='z-10 w-full flex justify-start items-center px-8 py-6'>
        <div
          className='flex items-center gap-3 cursor-pointer group'
          onClick={() => navigate('/')}
        >
          <img className='w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg' src={logo} alt="logo" />
          <h3 className='text-2xl font-bold tracking-tighter text-white group-hover:text-blue-400 transition-colors'>
            StyleSync
          </h3>
        </div>
      </div>

      {/* Main Content Container */}
      <div className='z-10 flex-1 flex items-center justify-center px-4 sm:px-6'>
        <div className='max-w-[420px] w-full flex flex-col items-center gap-8'>

          {/* Typography Section */}
          <div className='text-center space-y-3'>
            <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-white'>
              Welcome back
            </h1>
            <p className='text-gray-400 text-sm md:text-base font-medium'>
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form Card (Glassmorphism) */}
          <div className='w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl ring-1 ring-white/5'>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className='w-full h-12 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl flex items-center justify-center gap-3 transition-all duration-200 transform active:scale-[0.98] shadow-lg shadow-white/5 group'
            >
              <img className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' src={googleLogo} alt="google" />
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className='relative flex py-6 items-center'>
              <div className='flex-grow border-t border-white/10'></div>
              <span className='flex-shrink-0 mx-4 text-xs font-medium text-gray-500 uppercase tracking-widest'>Or sign in with</span>
              <div className='flex-grow border-t border-white/10'></div>
            </div>

            {/* Traditional Form */}
            <form className='flex flex-col gap-5' onSubmit={handleLogin}>
              <div className='space-y-4'>
                <div className='group'>
                  <label className="block text-xs font-medium text-gray-400 mb-1 ml-1 group-focus-within:text-blue-400 transition-colors">Email Address</label>
                  <input
                    type="email"
                    placeholder='name@example.com'
                    className='w-full h-12 bg-black/20 border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='group'>
                  <label className="block text-xs font-medium text-gray-400 mb-1 ml-1 group-focus-within:text-blue-400 transition-colors">Password</label>
                  <input
                    type="password"
                    placeholder='••••••••'
                    className='w-full h-12 bg-black/20 border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className='pt-2'>
                <button
                  type='submit'
                  className='w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                >
                  Sign In
                </button>
              </div>
            </form>

            <div className='mt-8 text-center text-sm text-gray-500'>
              Don't have an account?{' '}
              <span
                className='text-blue-400 font-semibold cursor-pointer hover:text-blue-300 hover:underline transition-colors'
                onClick={() => navigate('/signup')}
              >
                Sign up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage