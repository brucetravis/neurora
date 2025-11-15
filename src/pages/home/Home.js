import React from 'react'
import './Home.css'
import Hero from './home-components/hero/Hero'
import About from './home-components/about/About'
import Services from './home-components/services/Services'

export default function Home() {
  return (
    <div>
        <Hero />
        <About />
        <Services />
    </div>
  )
}
