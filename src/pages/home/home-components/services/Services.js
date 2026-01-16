import React from 'react'
import './Services.css'
import { Cpu, Monitor, Settings, Smartphone, Zap } from 'lucide-react'
import ServiceCard from '../../../../components/cards/servicecard/ServiceCard'
import { useInView, useSpring, animated, useTrail } from '@react-spring/web'

export default function Services() {

  const [ ref, inView ] = useInView({ triggerOnce: true, threshold: 0.2 })

  // an array of services
  const services = [
    { icon: <Monitor size={32} color="#c87cff" />, title: 'AI-Powered Web Development', description: 'Responsive websites, custom interfaces, and e-commerce solutions integrated with AI.' },
    { icon: <Smartphone size={32} color="#c87cff" />, title: 'Smart Mobile Apps', description: 'Feature-rich **AI-integrated mobile apps** for iOS and Android platforms.' },
    { icon: <Cpu size={32} color="#c87cff" />, title: 'Machine Learning Tools', description: 'Predictive analytics and **AI-powered software solutions** to optimize business workflows.' },
    { icon: <Settings size={32} color="#c87cff" />, title: 'Automation Solutions', description: 'Intelligent automation for streamlining business processes efficiently.' },
    { icon: <Zap size={32} color="#c87cff" />, title: 'AI Subscriptions & Rentals', description: 'Pay-as-you-go **AI software solutions** and tools for businesses.' },
  ]


  // Animate heading + lead text
  const textSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    config: { tension: 200, friction: 20 },
  });

  // Animate service cards with stagger
  const trail = useTrail(services.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    config: { mass: 1, tension: 280, friction: 20 },
  });

  return (
    <section
      className="services-hero" aria-labelledby='services-title' ref={ref}
    >
      <animated.h4 style={textSpring} className='services-kicker'>
        WHAT WE OFFER
      </animated.h4>
      
      <div
        className="section-inner"
      >
        <animated.h2 style={textSpring} className='services-heading' id="services-title">
          AI-Powered Software Solutions and Intelligent Tools for Your Business
        </animated.h2>

        <animated.p style={textSpring} className='services-lead'>
          At Neurora, we deliver **AI-powered software solutions**, **smart software tools**, and **intelligent digital systems** 
          that help businesses scale effortlessly, streamline workflows, and achieve measurable growth. From **web development** 
          and **smart mobile apps** to **automation solutions** and **AI subscriptions**, we design technology tailored for startups, 
          SMEs, and enterprises.
        </animated.p>

        <div className='services-grid'>
          {trail.map((props, index) => (
            <animated.div style={props} key={index}>
              <ServiceCard 
                icon={services[index].icon}
                title={services[index].title}
                description={services[index].description}
              />
            </animated.div>
          ))}
        </div>
      </div>

    </section>
  )
}
