import React from 'react'
import './WhyUs.css'
import DancingRobotGif from '../../../videos/robot-unscreen.gif'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useSpring, animated, useTrail } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'


export default function WhyUs() {

  // states to control the section view
  const [ ref, inView ] = useInView({ 
    triggerOnce: false, // will be triggered even after the section is out of view 
    threshold: 0.1 // content in the section will be visible when the section is 10% visisble
  })

  // Floating GIF component (Three.js animation)
  function FloatingGif() {
    const meshRef = React.useRef()
    const texture = useTexture(DancingRobotGif)

    useFrame(({ clock }) => {
      const t = clock.getElapsedTime()
      if (!meshRef.current) return
      meshRef.current.position.y = Math.sin(t * 1.5) * 0.15
      meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.1

      // Safely update material opacity
      const material = meshRef.current.children[0]?.material
      if (material) material.opacity = 0.1 + Math.sin(t * 3) * 0.05
    })

    return (
      <group ref={meshRef}>
        <mesh scale={[1.1, 1.1, 1]}>
          <planeGeometry args={[9, 10]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <planeGeometry args={[9, 10]} />
          <meshBasicMaterial map={texture} transparent />
        </mesh>
      </group>
    )
  }

  // Points for trail animation
  const points = [
    'Guided AI adoption for African businesses',
    'AI management and subscription in one platform',
    'Real-time analytics & actionable insights',
    'Recommendations for growth and optimization'
  ]

  // React Spring for smooth, non-conflicting animations
  const titleSpring = useSpring({
    transform: inView ? 'translateY(0)' : 'translateY(100%)',
    opacity: inView ? 1 : 0,
    config: { mass: 1, tension: 80, friction: 25 },
    delay: 200
  });

  const trail = useTrail(points.length, {
    opacity: inView ? 1 : 0,
    x: inView ? 0 : -20,
    config: { mass: 1, tension: 260, friction: 20 },
    pause: !inView,
    immediate: !inView
  })

  const titleSpring2 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0%)' : 'translateX(100%)', //from the right
    config: { mass: 1, tension: 80, friction: 25 },
    delay: 200
  });

  const imageSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0%)' : 'translateX(-100%)', //from the left
    config: { mass: 1, tension: 80, friction: 25 },
    delay: 200
  })

  const rightSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0%)' : 'translateX(100%)', //from the right
    config: { mass: 1, tension: 80, friction: 25 },
    delay: 200
  });

  return (
    <section className="whyus-hero" ref={ref}>
      <animated.h4 
        style={{
          ...titleSpring
        }}
        className="whyus-title"
      >
        Why Neurora
      </animated.h4>

      <animated.h2 
        style={{
          ...titleSpring2
        }}

        className="whyus-heading"
      >
        Simplifying AI adoption and Growth for <span className="accent">African Businesses</span>
      </animated.h2>

      <div className="whyus-inner">
        <animated.div 
          style={{
          ...imageSpring
          }} 
          className="whyus-left"
        >
          <Canvas style={{ width: '100%', height: '400px', pointerEvents: 'none' }}>
          <ambientLight intensity={1} />
          <FloatingGif />
          </Canvas>
        </animated.div>

        <animated.div 
          style={{
            ...rightSpring
          }} 
          className="whyus-right"
        >
          {trail.map((props, index) => (
            <animated.div key={index} style={props} className="whyus-point">
                {points[index]}
            </animated.div>
          ))}
        </animated.div>
      </div>
    </section>
  )
}
