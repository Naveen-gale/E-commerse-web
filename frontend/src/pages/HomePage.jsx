import React from 'react'
import NaveBar from '../components/NaveBar'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import TrendingProducts from '../components/Trending products'
import NewArrivals from '../components/Newarrivals'
import Footer from '../components/Footer'
const HomePage = () => {
  return (
    <>
    <NaveBar />
    <Hero />
    <Categories />
    <TrendingProducts />
    <NewArrivals />
    <Footer />
    </>
  )
}

export default HomePage