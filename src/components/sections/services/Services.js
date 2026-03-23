import React from 'react'
import './Services.css'
import { Compass, BarChart2, Settings, CreditCard, TrendingUp } from 'lucide-react'
import ServiceCard from '../../../components/cards/servicecard/ServiceCard'
import { useInView, useSpring, animated } from '@react-spring/web'

export default function Services() {

    const [ ref, inView ] = useInView({ 
        triggerOnce: false, // trigger when inView and out of view
        threshold: 0.1 // trigger when 10% visible
    })

    // an array of services
    const services = [
        { 
            icon: <Compass size={32} color="#c87cff" />, 
            title: 'Entry-Level Guidance', 
            description: 'Get step-by-step recommendations on which AI tools to adopt for your specific business and industry.' 
        },
        { 
            icon: <CreditCard size={32} color="#c87cff" />, 
            title: 'Subscription Management', 
            description: 'Easily subscribe, manage, and consolidate AI tools in one platform, ensuring you never lose track of your investments.' 
        },
        { 
            icon: <BarChart2 size={32} color="#c87cff" />, 
            title: 'Analytics & Insights', 
            description: 'Track AI performance in real time, understand what works, and make data-driven decisions to optimize ROI.' 
        },
        { 
            icon: <Settings size={32} color="#c87cff" />, 
            title: 'Automation & Efficiency', 
            description: 'Implement AI-driven automation that improves workflow efficiency while monitoring impact and adoption.' 
        },
        { 
            icon: <TrendingUp size={32} color="#c87cff" />, 
            title: 'Growth Recommendations', 
            description: 'Receive tailored suggestions on which AI features to scale, helping your business grow strategically and sustainably.' 
        },
    ]

    // Animate heading + lead text
    const textSpring1 = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0%)' : 'translateY(100%)',
        config: { mass: 1, tension: 80, friction: 25 },
        delay: 200
    });

    const textSpring2 = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0%)' : 'translateX(-100%)', //from the left
        config: { mass: 1, tension: 80, friction: 25 },
        delay: 200
    });

    const textSpring3 = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0%)' : 'translateX(100%)', //from the right
        config: { mass: 1, tension: 80, friction: 25 },
        delay: 200
    });

    const upSpring = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0%)' : 'translateY(-100%)', // from down
        config: { mass: 1, tension: 80, friction: 25 },
        delay: 200
    });

    const downSpring = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0%)' : 'translateY(100%)', // from the up
        config: { mass: 1, tension: 80, friction: 25 },
        delay: 200
    });

    const upSpringIds = [1, 3, 5]

  return (
    <section
      className="services-hero" aria-labelledby='services-title' ref={ref}
    >
        <animated.h4 
            style={{
                ...textSpring1
            }} 
            className='services-kicker'
        >
            WHAT WE OFFER
        </animated.h4>
      
        <div
            className="section-inner"
        >
            <animated.h2 
                style={{
                    ...textSpring2
                }}

                className='services-heading' 
                id="services-title"
            >
                AI adoption for African Businesses
            </animated.h2>

            <animated.p 
                style={{
                    ...textSpring3
                }}

                className='services-lead'
            >
                Neurora offers an <strong>AI-powered platform</strong> that guides businesses on which tools to adopt, 
                tracks performance, and provides actionable insights to optimize growth, efficiency, and ROI.
            </animated.p>

            <div className='services-grid'>
                {services.map((props, index) => (
                    <animated.div style={props} key={index}>
                        <ServiceCard
                            icon={services[index].icon}
                            title={services[index].title}
                            description={services[index].description}
                            cardSpring={upSpringIds.includes(index) ? upSpring : downSpring }
                        />
                    </animated.div>
                ))}
            </div>
        </div>

    </section>
  )
}
