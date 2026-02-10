import React from 'react'
import logo from '../assets/logo.png'
import googleLogo from '../assets/google.png' // Make sure to add a google icon in your assets
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { useState } from 'react'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../utils/firebase'
import { useUserContext } from '../context/usercontext'
import { toast } from 'react-toastify'

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const { serverurl } = useAuth()
    const { getCurrentUser } = useUserContext()

    const handelSignup = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${serverurl}/api/auth/register`, {
                name,
                email,
                password
            }, {
                withCredentials: true
            })
            getCurrentUser()
            if (res.status === 201) {
                toast.success("Registration Successful! Welcome.")
                navigate('/')
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Registration Failed")
        }
    }

    const googleSigneup = async () => {
        try {
            const response = await signInWithPopup(auth, googleProvider)
            const user = response.user

            const result = await axios.post(`${serverurl}/api/auth/google-login`, {
                name: user.displayName,
                email: user.email,
                intent: 'register' // Explicitly set intent
            }, {
                withCredentials: true
            })

            getCurrentUser()
            if (result.status === 200) {
                toast.success("Account Created Successfully!")
                navigate('/')
            }

        } catch (error) {
            console.error(error)
            // Handle specific Firebase popup closed error gracefully
            if (error.code === 'auth/popup-closed-by-user') {
                toast.info("Sign-in cancelled")
                return
            }
            // Handle backend errors (like 'User already exists')
            if (error.response) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Google Registration Failed. Please try again.")
            }
        }
    }
    return (
        <div className='w-screen h-screen flex flex-col bg-linear-to-br from-[#141414] to-[#0c2025] text-white overflow-hidden'>

            {/* Header / Logo */}
            <div
                className='w-full flex justify-start items-center px-[30px] py-[20px] gap-[10px] cursor-pointer hover:opacity-80 transition-opacity'
                onClick={() => navigate('/')}
            >
                <img className='w-[40px] h-[40px] object-contain' src={logo} alt="logo" />
                <h3 className='text-xl font-bold tracking-tight'>StyleSync</h3>
            </div>

            {/* Main Content Container */}
            <div className='flex-1 flex items-center justify-center px-4'>
                <div className='max-w-[450px] w-full flex flex-col items-center gap-6'>

                    {/* Typography Section */}
                    <div className='text-center space-y-2'>
                        <h1 className='text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400'>
                            Create Account
                        </h1>
                        <p className='text-gray-400 font-medium'>Welcome to oencart</p>
                    </div>

                    {/* Form Card */}
                    <div className='w-full bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl'>

                        {/* Google Button */}
                        <button
                            type="button"
                            className='w-full h-[55px] bg-white text-black font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-[0.98]' onClick={googleSigneup}
                        >
                            <img className='w-[24px] h-[24px]' src={googleLogo} alt="google" />
                            Register with Google
                        </button>

                        {/* Divider */}
                        <div className='flex items-center my-6 gap-4'>
                            <div className='h-px flex-1 bg-white/10'></div>
                            <span className='text-xs text-gray-500 uppercase tracking-widest'>or</span>
                            <div className='h-px flex-1 bg-white/10'></div>
                        </div>

                        <form className='flex flex-col gap-4' onSubmit={handelSignup}>
                            <div className='space-y-4'>
                                <input
                                    type="text"
                                    placeholder='Full Name'
                                    className='w-full h-[55px] bg-[#1a1a1a]/50 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-500' onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="email"
                                    placeholder='Email Address'
                                    className='w-full h-[55px] bg-[#1a1a1a]/50 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-500' onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder='Password'
                                    className='w-full h-[55px] bg-[#1a1a1a]/50 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-500' onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type='submit'
                                className='w-full h-[55px] bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20 mt-2'
                            >
                                Register
                            </button>
                        </form>

                        <div className='mt-6 text-center text-sm text-gray-500'>
                            Already have an account? <span className='text-blue-400 cursor-pointer hover:underline' onClick={() => navigate('/login')}>Sign in</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage 