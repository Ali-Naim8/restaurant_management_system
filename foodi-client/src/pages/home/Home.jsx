import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'
import Testimonials from './Testimonials'
import OurServices from './OurServices'
import Footer from '../../components/Footer'
import Reviews from './Reviews'

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <SpecialDishes />
      <Testimonials />
      <Reviews />
      <OurServices />
    </div>
  )
}

export default Home