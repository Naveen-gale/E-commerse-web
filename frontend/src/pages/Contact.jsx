import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/authContext'
import Footer from '../components/Footer'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '', // <--- The extra field you requested
    message: ''
  })

  const { serverurl } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${serverurl}/api/contact/submit`, formData)
      alert("Thank you for contacting us! We'll get back to you shortly.")
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      console.error(error)
      alert("Failed to send message.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='w-full min-h-screen bg-[#050505] text-white pt-20 pb-20 px-4 md:px-12'>

      {/* --- Page Header --- */}
      <div className='max-w-[1400px] mx-auto mb-16 text-center space-y-4'>
        <span className='text-blue-500 text-xs font-bold tracking-[0.3em] uppercase'>
          Support 24/7
        </span>
        <h1 className='text-4xl md:text-6xl font-serif font-bold tracking-tight animate-fade-in'>
          Get in Touch
        </h1>
        <p className='text-gray-400 max-w-lg mx-auto text-sm md:text-base'>
          We value your feedback. Whether you have a question about an order, a collaboration, or just want to say hi.
        </p>
      </div>

      {/* --- Split Layout Container --- */}
      <div className='max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20'>

        {/* --- Left Side: Contact Info --- */}
        <div className='flex flex-col justify-between space-y-12 animate-fade-in [animation-delay:200ms]'>

          <div className='space-y-8'>
            <h3 className='text-2xl font-serif font-medium text-white'>
              Contact Information
            </h3>

            {/* Info Item 1 */}
            <div className='flex items-start gap-4'>
              <div className='p-3 bg-white/5 rounded-full text-blue-400'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div>
                <p className='text-sm text-gray-400 uppercase tracking-widest mb-1'>Phone</p>
                <p className='text-lg font-medium text-white'>+1 (555) 000-0000</p>
                <p className='text-sm text-gray-500'>Mon-Fri 9am-6pm</p>
              </div>
            </div>

            {/* Info Item 2 */}
            <div className='flex items-start gap-4'>
              <div className='p-3 bg-white/5 rounded-full text-purple-400'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <p className='text-sm text-gray-400 uppercase tracking-widest mb-1'>Email</p>
                <p className='text-lg font-medium text-white'>support@oencart.com</p>
                <p className='text-sm text-gray-500'>Online Support</p>
              </div>
            </div>

            {/* Info Item 3 */}
            <div className='flex items-start gap-4'>
              <div className='p-3 bg-white/5 rounded-full text-pink-400'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <p className='text-sm text-gray-400 uppercase tracking-widest mb-1'>Headquarters</p>
                <p className='text-lg font-medium text-white'>123 Fashion Ave, NY</p>
                <p className='text-sm text-gray-500'>New York, USA</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder (Optional Decorative Element) */}
          <div className='w-full h-48 rounded-2xl overflow-hidden grayscale opacity-60 hover:opacity-100 transition-opacity'>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="map"
            ></iframe>
          </div>

        </div>

        {/* --- Right Side: Form --- */}
        <div className='bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm animate-fade-in [animation-delay:400ms]'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Name */}
              <div className='flex flex-col gap-2'>
                <label className='text-xs font-bold uppercase tracking-widest text-gray-500'>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className='w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-white/40 transition-colors'
                />
              </div>

              {/* Phone */}
              <div className='flex flex-col gap-2'>
                <label className='text-xs font-bold uppercase tracking-widest text-gray-500'>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className='w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-white/40 transition-colors'
                />
              </div>
            </div>

            {/* Email */}
            <div className='flex flex-col gap-2'>
              <label className='text-xs font-bold uppercase tracking-widest text-gray-500'>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className='w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-white/40 transition-colors'
              />
            </div>

            {/* Subject (The Extra Field) */}
            <div className='flex flex-col gap-2'>
              <label className='text-xs font-bold uppercase tracking-widest text-gray-500'>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Order #12345 / General Inquiry"
                className='w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-white/40 transition-colors'
              />
            </div>

            {/* Message */}
            <div className='flex flex-col gap-2'>
              <label className='text-xs font-bold uppercase tracking-widest text-gray-500'>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="How can we help you today?"
                required
                className='w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-white/40 transition-colors resize-none'
              ></textarea>
            </div>

            <button
              type="submit"
              className='mt-4 w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-gray-200 transition-all active:scale-[0.98]'
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default Contact