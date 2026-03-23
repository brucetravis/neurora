import React, { useEffect } from 'react'
import './Landing.css'
import Hero from '../../components/sections/hero/Hero'
import { useScrollRefs } from '../../contexts/scroll/ScrollContext'
import { useActive } from '../../contexts/active/ActiveContext'
import About from '../../components/sections/about/About'
import Services from '../../components/sections/services/Services'
import Software from '../../components/sections/software/Software'
import WhyUs from '../../components/sections/whyus/WhyUS'

export default function Landing() {
    const { setActiveSection } = useActive()

    // get the scroll references from the context
    const { sectionRefs } = useScrollRefs()

    // get each section id
    const { hero, about, services, software, whyus } = sectionRefs

    useEffect(() => {

        const sections = [
            { ref: hero, id: 'hero' }
        ]

        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id)
            }
            })
        },

        { 
            threshold: 0.3,
            rootMargin: "-80px 0px 0px 0px"
        } // triggers when 30% of the section is visible 
        )

        sections.forEach(section => {
        if (section.ref.current) {
            section.ref.current.id = section.id //assign an Id for teh observer
            observer.observe(section.ref.current)
        }
        })

        return () => observer.disconnect()

    }, [hero, about, services, software, whyus, setActiveSection])

  return (
    <div className='landing-page'>
        <section ref={hero}><Hero /></section>
        <section ref={about}><About /></section>
        <section ref={services}><Services /></section>
        <section ref={software}><Software /></section>
        <section ref={whyus}><WhyUs /></section>
    </div>
  )
}
