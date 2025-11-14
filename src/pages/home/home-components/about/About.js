import React from 'react'
import './About.css'
import { useSpring, animated } from '@react-spring/web'
import HologramSphere from '../../../../components/hologramsphere/HologramSphere'

export default function About() {

  // // stagger: title then paragraph
  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(12px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { opacity: 0, transform: 'translateY(12px)' },
    delay: 150
  })

  const paraSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(12px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 22 },
    delay: 400
  })


  return (
    <section className="about-hero" aria-labelledby='about-title'>
      
      <animated.h4 style={titleSpring} id="about-title" className="about-kicker">
        ABOUT NEURORA
      </animated.h4>
      
      <div
        className='about-inner container'
      >
        <div className='about-left col-md-6 col-lg-6'>
          <HologramSphere />
        </div>

        <div
          className='about-right col-md-6 col-lg-6'
        >

          <animated.h2 style={titleSpring} className="about-heading" >
            Scaling Your Business With <span className="accent">Intelligent Software</span>
          </animated.h2>

          <animated.p style={paraSpring} className="about-lead">
            At Neurora, we create AI-powered software and smart digital solutions that help businesses scale effortlessly. 
            From intuitive websites and feature-rich mobile apps to advanced machine learning tools, tailored automation, 
            and AI solutions available for subscription or rental, we design technology that streamlines workflows, 
            boosts efficiency, and drives measurable growth. Our offerings empower startups, SMEs, and enterprises 
            to turn ideas into results, optimize operations, and transform visitors into loyal customers.
          </animated.p>
        </div>

      </div>
    </section>
  )
}
