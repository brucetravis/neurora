import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // use Link for routing
import { Menu, X } from 'lucide-react'
import './Header.css'
import { useSpring, animated } from '@react-spring/web';
import { useTrail } from '@react-spring/web';
import { useActive } from '../../contexts/active/ActiveContext';

export default function Header() {

  // get the active section from the active context
  const { activeSection } = useActive();

  // import the useNavigate hook from the react router so that we can route to another page
  const navigation = useNavigate()

  // state to open and close the nav bar on a phone/small screen
  const [ menuOpen, setMenuOpen ] = useState(false) // initial state is false


  // React spring animation function
  const menuAnimation = useSpring({
    transform: menuOpen ? `translateX(0%)` : `translateX(100%)`,
    opacity: menuOpen ? 1 : 0,
    config: { tension: 220, friction: 20 }
  })

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Why Us', path: '/whyus' },
    { name: 'Prices', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ]

  const trail = useTrail(menuItems.length, {
    opacity: menuOpen ? 1 : 0,
    transform: menuOpen ? `translateX(0%)` : `translateX(20%)`,
    from: { opacity: 0, transform: `translateX(20%)` },
    config: { tension: 220, friction: 20 }
  })

  // React spring for active nav links
  function useLinkSpring(isActive) {
    return useSpring({
      color: isActive ? '#c87cff' : '#fff', // purple when active, white when not
      textShadow: isActive
        ? '0 0 6px #c87cff, 0 0 12px #d5a0fa'
        : '0 0 0px #000, 0 0 0px #000',
      config: { tension: 200, friction: 20 } // smooth spring
    })
  }

  const AnimatedLink = animated(Link)

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Neurora</Link>
        </div>
        <div className="nav-links">
          <AnimatedLink 
            to="/"
            style={useLinkSpring(activeSection === 'hero')}
          >
            Home
          </AnimatedLink>

          <AnimatedLink 
            to="/about"
            style={useLinkSpring(activeSection === 'about')}
          >  
            About
          </AnimatedLink>

          <AnimatedLink 
            to="/services"
            style={useLinkSpring(activeSection === 'services')}
          >
            Services
          </AnimatedLink>
          
          <AnimatedLink 
            to="/whyus"
            style={useLinkSpring(activeSection === 'whyus')}
          >
            Why Us
          </AnimatedLink>
          
          <AnimatedLink 
            to="/pricing"
            style={useLinkSpring(activeSection === 'pricing')}
          >
            Prices
          </AnimatedLink>
          
          <AnimatedLink 
            to="/contact"
            style={useLinkSpring(activeSection === 'contact')}
          >
            Contact
          </AnimatedLink>
        
        </div>
        
        <div 
          className='hamburger-icon'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={25} stroke="#fff" /> : <Menu size={25} stroke="#fff" />}
        </div>
        
        <animated.div 
          className="mobile-menu" 
          style={menuAnimation}
        >
          <X 
            size={25} 
            stroke="#fff"
            onClick={() => setMenuOpen(!menuOpen)}
            className='close-nav' 
          />

          {trail.map((props, index) => (
            <animated.div
              key={menuItems[index].name}
              style={props}
            >
              <AnimatedLink
                to={menuItems[index].path}
                onClick={() => setMenuOpen(false)}
              >
                {menuItems[index].name}
              </AnimatedLink>
            </animated.div>
          ))}

          <animated.div style={trail[0]}>
            <button 
              className="btn-primary"
              onClick={() => {
                navigation('/contact');
                setMenuOpen(false);
              }}
            >
              Get Started
            </button>
          </animated.div>
          
        </animated.div>

        <button 
          className="btn-primary"
          onClick={() => navigation('/contact')}
        >
          Get Started
        </button>
        
      </nav>
    </header>
  );
}

