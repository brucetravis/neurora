import React from 'react'
import './StarField.css'

export default function StarField({ count = 50, mousePos }) {

    // generate an array with 'count' stars
    const stars = Array.from({ length: count })

  return (
    <div
        className="starfield"
    >
        {stars.map((_, i) => {
            const size = Math.random() * 2 + 1; // 1px to 3px
            const top = Math.random() * 100; // %
            const left = Math.random() * 100; // %
            const dx = (Math.random() * 20 - 10) + (mousePos.x - 0.5) * 30; // parallax x 
            const dy = (Math.random() * 20 - 10) + + (mousePos.x - 0.5) * 30; // parallax y
            const duration = Math.random() * 30 + 20; // seconds
            const delay = Math.random() * 5; // seconds

            return (
                <div
                    key={i}
                    className='star'
                    style={{
                        top: `${top}%`,
                        left: `${left}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        '--dx': `${dx}px`,
                        '--dy': `${dy}px`,
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                    }} 
                />
            )
        })}

    </div>
  )
}
