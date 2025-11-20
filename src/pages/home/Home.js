import React, { useEffect } from 'react'
import './Home.css'
import Hero from './home-components/hero/Hero'
import About from './home-components/about/About'
import Services from './home-components/services/Services'
import WhyUs from './home-components/whyus/WhyUs'
import Pricing from './home-components/pricing/Pricing'
import Contact from './home-components/contact/Contact'

export default function Home() {

  useEffect(() => {
    
    // deay to ensure browser layout is ready before scrolling
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, smooth: 0 })
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Pricing />
        <Contact />
    </div>
  )
}
