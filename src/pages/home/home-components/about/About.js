import React, { useState } from 'react'
import './About.css'
// import HologramSphere from '../../../../components/hologramsphere/HologramSphere'
import RobotGif from '../../../../videos/robot-unscreen.gif'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { useTexture } from '@react-three/drei'
// import * as THREE from 'three';

// function FloatingGif() {
  
//   const meshRef = React.useRef()
//   const texture = useTexture(RobotGif)
  

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime()

//     // Floating motion
//     meshRef.current.position.y = Math.sin(t * 1.5) * 0.15
//     // meshRef.current.position.y = Math.sin(t * 0.3) * 0.3
//     meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
  
//     // Pulsing glow for the hologram
//     meshRef.current.children[0].material.opacity = 0.1 + Math.sin(t * 3) * 0.05;
//   })


//   return (
//     // <mesh ref={meshRef}>
//     //   <planeGeometry args={[9, 10]} />
//     //   <meshBasicMaterial map={texture} transparent />


//     // </mesh>
//     <group ref={meshRef}>
//       {/* Hologram glow plane */}
//       <mesh scale={[1.1, 1.1, 1]}>
//         <planeGeometry args={[9, 10]} />
//         <meshBasicMaterial
//           color="#00ffff"
//           transparent
//           opacity={0.15}
//           toneMapped={false}
//           blending={THREE.AdditiveBlending}
//         />
//       </mesh>

//       {/* Robot GIF plane */}
//       <mesh>
//         <planeGeometry args={[9, 10]} />
//         <meshBasicMaterial map={texture} transparent />
//       </mesh>
//     </group>
//   )
// }
import { useSpring, animated, useInView } from '@react-spring/web'
// import HologramSphere from '../../../../components/hologramsphere/HologramSphere'

export default function About() {

  // states to control the section view
  const [ ref, inView ] = useInView({ triggerOnce: true, threshold: 0.2 })

  // // stagger: title then paragraph
  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(12px)',
    config: { tension: 200, friction: 22 },
    delay: 150
  });

  const paraSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(12px)',
    config: { tension: 200, friction: 22 },
    delay: 400
  });


  const imageSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0px)' : 'translateX(-30px)',
    // transform: inView ? 'transformX(0px)' : 'transformX(-30px)',
    config: { tension: 200, friction: 22 },
    delay: 250
  })

  return (
    <section className="about-hero" aria-labelledby='about-title' ref={ref}>
      
      <animated.h4 style={titleSpring} id="about-title" className="about-kicker">
        ABOUT NEURORA
      </animated.h4>
      
      <div
        className='about-inner container'
      >
        <div 
          className='about-left col-md-6 col-lg-6'
          // style={{ 
          //   backgroundImage: `url(${RobotGif})`,
          //   backgroundSize: "cover", 
          //   backgroundPosition: "center" 
          // }}
        >
          {/* <HologramSphere /> */}

          <animated.img 
            src={RobotGif} 
            alt="Robot animation" 
            style={{
              ...imageSpring,
              width: "100%", 
              height: "100%", 
              objectFit: "cover" 
            }} 
          />

          {/* <Canvas style={{ width: "100%", height: "400px" }}>
            <ambientLight intensity={1} />
            <FloatingGif />
          </Canvas> */}


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
