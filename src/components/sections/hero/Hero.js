import React, { useEffect, useState } from 'react';
import './Hero.css';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import StarField from '../../starfield/StarField';

export default function Hero() {
    // inView state
    const [ ref, inView ] = useInView({
        triggerOnce: false, // view will be triggered even after the section is out of view
        threshold: 0.1 // content will be shown when the section is 10% visible
    })

    // function for the hero title spring
    const heroTitleSpring= useSpring({
        transform: inView ? 'translateY(0%)' : 'translateY(100%)',
        opacity: inView ? 1 : 0,
        delay: 200, //staggered paragraph comes slightly after the heading
        config: { mass: 1, tension: 80, friction: 25 }
    })

    // function for the text
    const heroTextSpring = useSpring({
        transform: inView ? 'translateX(0%)' : 'translateX(100%)',
        opacity: inView ? 1 : 0,
        delay: 200, //staggered paragraph comes slightly after the heading
        config: { mass: 1, tension: 80, friction: 25 }
    })

    // state to control what happends when we hover over the stars
    const [ mousePos, setMousePos ] = useState({ x: 0.5, y: 0.5 })

    // track the mouse movement
    useEffect(() => {
        
        // function to control the mouse hovering
        const handleMouseMove = (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientX / window.innerHeight;
        setMousePos({ x, y })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)

    }, []) // empty dependency array


  return (
    <section className="hero" ref={ref}>
      <div className="overlay"></div>

      <StarField count={500} mousePos={mousePos} /> {/* Dynamic stars */}
      
      <div className="hero-content">

        <animated.h3 style={{
          ...heroTitleSpring
        }}>
          Welcome to Neurora
        </animated.h3>
        
        <animated.h1 style={{
          ...heroTitleSpring
        }}>
          Helping African Businesses <span className="highlight">Adopt AI</span>
        </animated.h1>

        <animated.p style={{
            ...heroTextSpring
        }}>
          Neurora offers an <strong className='highlight'>AI adoption platform</strong> that helps African businesses adopt, adapt, and 
          manage AI tools. The platform guides which features to use, tracks performance, provides insights, and recommends actions to 
          maximize growth and efficiency.
        </animated.p>


      </div>
    </section>
  );
}
