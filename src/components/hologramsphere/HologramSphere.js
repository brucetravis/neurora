// import React from 'react'
// import './HologramSphere.css'

// export default function HologramSphere({ size = 420 }) {
//   // This is a CSS + SVG-based hologram sphere illusion:
//   // - layered radial gradients for glow
//   // - animated rotating wireframe (SVG)
//   // Replace with a real 3D Canvas later if you want.
//   return (

//     <div className="holo-wrap" style={{ width: size, height: size }}>
//       <div className="holo-glow" />
//       <svg viewBox="0 0 200 200" className="holo-svg" aria-hidden>
//         <defs>
//           <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
//             <stop offset="0%" stopColor="#c87cff" stopOpacity="0.9" />
//             <stop offset="100%" stopColor="#6a33ff" stopOpacity="0.6" />
//           </linearGradient>
//         </defs>

//         {/* rotating grid circles */}
//         <g className="holo-grid">
//           <circle cx="100" cy="100" r="72" fill="none" stroke="url(#g1)" strokeOpacity="0.12" strokeWidth="0.8"/>
//           <circle cx="100" cy="100" r="52" fill="none" stroke="url(#g1)" strokeOpacity="0.14" strokeWidth="0.9"/>
//           <circle cx="100" cy="100" r="32" fill="none" stroke="url(#g1)" strokeOpacity="0.16" strokeWidth="1"/>
//           {/* cross lines */}
//           <path d="M20 100 H180" stroke="url(#g1)" strokeOpacity="0.06" strokeWidth="0.6"/>
//           <path d="M100 20 V180" stroke="url(#g1)" strokeOpacity="0.06" strokeWidth="0.6"/>
//         </g>

//         {/* inner glow core */}
//         <g className="holo-core">
//           <circle cx="100" cy="100" r="10" fill="#c87cff" fillOpacity="0.85" />
//           <circle cx="100" cy="100" r="4" fill="#fff" fillOpacity="0.95" />
//         </g>
//       </svg>

//       <div className="holo-reflection" />
//     </div>
//   )
// }

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

// Custom hook to load GLB
function RobotModel(props) {
  const { scene } = useGLTF('/models/robot_one.glb')
  return <primitive object={scene} {...props} />
}

export default function RobotScene() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <RobotModel scale={1.5} position={[0, -1, 0]} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
