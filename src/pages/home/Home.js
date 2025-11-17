import React from 'react'
import './Home.css'
import Hero from './home-components/hero/Hero'
import About from './home-components/about/About'
import Services from './home-components/services/Services'
import WhyUs from './home-components/whyus/WhyUs'

export default function Home() {
  return (
    <div>
        <Hero />
        <About />
        <Services />
        <WhyUs />
    </div>
  )
}
