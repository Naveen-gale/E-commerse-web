import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/usercontext'
import { useAuth } from '../context/authContext'
import axios from 'axios'

const Cart = () => {
  const navigate = useNavigate()
  const { cart, fetchCart, addToCart, userdta } = useUserContext()
  const { serverurl } = useAuth()

  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: userdta?.email || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  })

  // --- Calculations ---
  const cartItems = cart?.products?.filter(item => item.product) || []
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  const shippingThreshold = 200
  const shippingCost = subtotal > shippingThreshold ? 0 : 15
  const total = subtotal + shippingCost
  const progressPercent = Math.min((subtotal / shippingThreshold) * 100, 100)

  // --- Handlers ---
  const updateQuantity = async (productId, currentQty, change) => {
    const newQty = currentQty + change
    if (newQty < 1) return;
    try {
      await axios.put(`${serverurl}/api/cart/update`, { productId, quantity: newQty }, { withCredentials: true })
      fetchCart()
    } catch (error) {
      console.error("Update error", error)
    }
  }

  const removeItem = async (productId) => {
    try {
      await axios.post(`${serverurl}/api/cart/remove`, { productId }, { withCredentials: true })
      fetchCart()
    } catch (error) {
      console.error("Remove error", error)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) return;

    try {
      const items = cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      }))

      // Create Order with Address
      const res = await axios.post(`${serverurl}/api/orders/place`, {
        items,
        totalAmount: total,
        shippingAddress: formData
      }, { withCredentials: true })

      if (res.status === 201) {
        setShowCheckoutForm(false)
        fetchCart() // Clear cart
        navigate("/thank-you")
      }
    } catch (error) {
      console.error("Checkout error", error)
      alert("Order Failed: " + (error.response?.data?.message || "Unknown error"))
    }
  }

  const onCheckoutClick = () => {
    if (!userdta) {
      alert("Please Login to Checkout")
      navigate('/login')
      return
    }
    setShowCheckoutForm(true)
  }

  return (
    <div className='w-full min-h-screen bg-[#050505] text-white pt-[100px] pb-20 px-4 md:px-12 font-sans'>

      <div className='max-w-[1200px] mx-auto'>

        {/* Header */}
        <h1 className='text-4xl md:text-5xl font-serif font-bold mb-8 tracking-tight'>
          Your Bag <span className='text-gray-500 text-2xl font-sans font-normal'>({cartItems.length} items)</span>
        </h1>

        {cartItems.length > 0 ? (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>

            {/* --- Left Column: Cart Items --- */}
            <div className='lg:col-span-2 space-y-6'>

              {/* Free Shipping Progress Bar */}
              <div className='bg-white/5 border border-white/10 p-6 rounded-xl mb-6'>
                <div className='flex justify-between text-sm mb-2'>
                  <span className='text-gray-400'>
                    {subtotal >= shippingThreshold
                      ? "You've unlocked Free Shipping!"
                      : `Spend $${shippingThreshold - subtotal} more for Free Shipping`}
                  </span>
                  <span className='font-bold'>{Math.round(progressPercent)}%</span>
                </div>
                <div className='w-full h-2 bg-gray-800 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out'
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className='space-y-4'>
                {cartItems.map((item) => (
                  <div key={item._id} className='flex gap-4 md:gap-6 bg-white/5 border border-white/5 p-4 rounded-xl hover:border-white/20 transition-colors group'>

                    {/* Image */}
                    <div className='w-24 h-32 md:w-32 md:h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-900'>
                      <img src={item.product.image} alt={item.product.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                    </div>

                    {/* Details */}
                    <div className='flex-1 flex flex-col justify-between py-1'>
                      <div>
                        <div className='flex justify-between items-start'>
                          <h3 className='text-lg font-bold text-white'>{item.product.name}</h3>
                          <p className='text-lg font-semibold'>${item.product.price * item.quantity}</p>
                        </div>
                        <p className='text-sm text-gray-400 mt-1'>{item.size || 'M'}</p>
                      </div>

                      {/* Controls */}
                      <div className='flex justify-between items-end mt-4'>
                        {/* Quantity Counter */}
                        <div className='flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/10'>
                          <button onClick={() => updateQuantity(item.product._id, item.quantity, -1)} className='w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors'>-</button>
                          <span className='text-sm font-medium w-4 text-center'>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product._id, item.quantity, 1)} className='w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors'>+</button>
                        </div>

                        {/* Remove Button */}
                        <button onClick={() => removeItem(item.product._id)} className='text-xs text-red-400 hover:text-red-300 underline underline-offset-4 decoration-red-400/30'>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Right Column: Order Summary --- */}
            <div className='lg:col-span-1'>
              <div className='bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 sticky top-[100px]'>
                <h2 className='text-xl font-serif font-bold mb-6'>Order Summary</h2>

                <div className='space-y-4 text-sm text-gray-300 border-b border-white/10 pb-6 mb-6'>
                  <div className='flex justify-between'>
                    <span>Subtotal</span>
                    <span className='text-white'>${subtotal}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? 'text-green-400' : 'text-white'}>
                      {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Tax Estimate</span>
                    <span className='text-white'>Calculated at checkout</span>
                  </div>
                </div>

                <div className='flex justify-between items-center mb-8'>
                  <span className='text-lg font-bold'>Total</span>
                  <span className='text-2xl font-bold'>${total}</span>
                </div>

                <button
                  onClick={onCheckoutClick}
                  className='w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all active:scale-[0.98] shadow-lg shadow-white/10 mb-4'
                >
                  Proceed to Checkout
                </button>

                <div className='flex items-center justify-center gap-2 text-xs text-gray-500'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  Secure Checkout
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* --- Empty State --- */
          <div className='flex flex-col items-center justify-center py-24 text-center space-y-6'>
            <div className='w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-2'>
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            </div>
            <h2 className='text-2xl font-bold'>Your bag is empty</h2>
            <p className='text-gray-400 max-w-sm'>Looks like you haven't added anything to your cart yet.</p>
            <button onClick={() => navigate('/collection')} className='px-8 py-3 border border-white/20 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all'>
              Start Shopping
            </button>
          </div>
        )}

        {/* --- Checkout Form Modal --- */}
        {showCheckoutForm && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto'>
            <div className='bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl my-8 relative'>

              {/* Close Button */}
              <button onClick={() => setShowCheckoutForm(false)} className='absolute top-4 right-4 text-gray-400 hover:text-white p-2'>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <div className='p-8 md:p-10'>
                <h2 className='text-3xl font-serif font-bold mb-2'>Shipping Details</h2>
                <p className='text-gray-400 mb-8 text-sm'>Please enter your delivery address.</p>

                <form onSubmit={handlePlaceOrder} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <label className='text-xs uppercase tracking-wider text-gray-500 font-bold'>First Name</label>
                      <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className='w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all' placeholder='John' />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-xs uppercase tracking-wider text-gray-500 font-bold'>Last Name</label>
                      <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className='w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all' placeholder='Doe' />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <label className='text-xs uppercase tracking-wider text-gray-500 font-bold'>Email</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className='w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all' placeholder='john@example.com' />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-xs uppercase tracking-wider text-gray-500 font-bold'>Phone</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className='w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all' placeholder='+1 234 567 890' />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-xs uppercase tracking-wider text-gray-500 font-bold'>Street Address</label>
                    <input required name="street" value={formData.street} onChange={handleInputChange} className='w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all' placeholder='123 Main St, Apt 4B' />
                  </div>

                  <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                    <div className='col-span-2 space-y-2'>
                      <label className='text-xs uppercase tracking-wider text-gray-500 font-bold'>City</label>
                      <input required name="city" value={formData.city} onChange={handleInputChange} className='w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all' placeholder='New York' />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-xs uppercase tracking-wider text-gray-500 font-bold'>State</label>
                      <input required name="state" value={formData.state} onChange={handleInputChange} className='w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all' placeholder='NY' />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-xs uppercase tracking-wider text-gray-500 font-bold'>Zip</label>
                      <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} className='w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all' placeholder='10001' />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-xs uppercase tracking-wider text-gray-500 font-bold'>Country</label>
                    <input required name="country" value={formData.country} onChange={handleInputChange} className='w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all' placeholder='United States' />
                  </div>

                  {/* Payment Info Static */}
                  <div className='p-4 bg-white/5 rounded-lg border border-white/10 mt-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-4 h-4 rounded-full bg-green-500 border border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]'></div>
                      <span className='font-bold text-sm'>Payment: Cash on Delivery</span>
                    </div>
                  </div>

                  <div className='pt-4'>
                    <button type="submit" className='w-full py-4 bg-white text-black font-bold text-sm tracking-widest uppercase rounded-xl hover:bg-gray-200 transition-all shadow-lg active:scale-[0.99]'>
                      Place Order - ${total}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Cart