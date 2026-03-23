import React from 'react'
import './About.css'
import RobotGif from '../../../videos/robot-unscreen.gif'

import { useSpring, animated, useInView } from '@react-spring/web'

export default function About() {

  // states to control the section view
  const [ ref, inView ] = useInView({ 
    triggerOnce: false, // will be triggered even after the section is out of view 
    threshold: 0.1 // content in the section will be visible when the section is 10% visisble
  })

  // // stagger: title then paragraph
  const titleSpring = useSpring({
    transform: inView ? 'translateY(0)' : 'translateY(100%)',
    opacity: inView ? 1 : 0,
    config: { mass: 1, tension: 80, friction: 25 },
    delay: 200
  });

  const rightSpring = useSpring({
    transform: inView ? 'translateX(0%)' : 'translateX(100%)',
    opacity: inView ? 1 : 0,
    config: { mass: 1, tension: 80, friction: 25 },
    delay: 200
  });


  const leftSpring = useSpring({
    transform: inView ? 'translateX(0%)' : 'translateX(-100%)',
    opacity: inView ? 1 : 0,
    config: { mass: 1, tension: 80, friction: 25 },
    delay: 200
  })

  return (
    <section className="about-hero" aria-labelledby='about-title' ref={ref}>
      <animated.h4 
        style={{
          ...titleSpring
        }} 
        id="about-title" 
        className="about-kicker"
      >
        ABOUT NEURORA
      </animated.h4>
      
      <div
        className='about-inner-content'
      >
        <animated.div
          style={{
            ...leftSpring
          }}

          className='about-left-column'
        >
          <img 
            src={RobotGif} 
            alt="Neurora AI software Illustrution" 
          />
        </animated.div>

        <animated.div
          style={{
            ...rightSpring
          }}
          className='about-right-column'
        >

          <h2 
            className="about-heading"
          >
            Scaling Your Business With <span className="accent">Intelligent Software</span>
          </h2>

          <p className="about-lead">
            Neurora is a <strong>Software and Robotics company</strong> leveraging <strong>Artificial Intelligence</strong> 
            to drive innovation across Africa. Our platform helps <strong className="accent">African businesses</strong> adopt 
            and integrate AI efficiently, offering guidance on the right tools, tracking performance, and delivering actionable insights. 
            From early-stage adoption to subscription management, real-time analytics, and strategic growth recommendations, Neurora empowers 
            startups, SMEs, and enterprises to make data-driven decisions, optimize operations, and achieve measurable results.
          </p>
        </animated.div>
      </div>
    </section>
  )
}
