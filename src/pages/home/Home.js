import React, { useEffect, useRef } from 'react'
import './Home.css'
import Hero from './home-components/hero/Hero'
import About from './home-components/about/About'
import Services from './home-components/services/Services'
import WhyUs from './home-components/whyus/WhyUs'
import Pricing from './home-components/pricing/Pricing'
import Contact from './home-components/contact/Contact'
import { useActive } from '../../contexts/active/ActiveContext'

export default function Home() {

  const { setActiveSection } = useActive()

  const heroRef = useRef()
  const aboutRef = useRef()
  const servicesRef = useRef()
  const whyUsRef = useRef()
  const pricingRef = useRef()
  const contactRef = useRef()


  useEffect(() => {

    const sections = [
      { ref: heroRef, id: 'hero' },
      { ref: aboutRef, id: 'about' },
      { ref: servicesRef, id: 'services' },
      { ref: whyUsRef, id: 'whyus' },
      { ref: pricingRef, id: 'pricing' },
      { ref: contactRef, id: 'contact' }
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 } // triggers when 50% of the section is visible 
    )

    sections.forEach(section => {
      if (section.ref.current) {
        section.ref.current.id = section.id //assign an Id for teh observer
        observer.observe(section.ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    
    // deay to ensure browser layout is ready before scrolling
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, smooth: 0 })
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <section ref={heroRef}><Hero /></section>
      <section ref={aboutRef}><About /></section>
      <section ref={servicesRef}><Services /></section>
      <section ref={whyUsRef}><WhyUs /></section>
      <section ref={pricingRef}><Pricing /></section>
      <section ref={contactRef}><Contact /></section>
    </div>
  )
}
