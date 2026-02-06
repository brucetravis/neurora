import React, { useEffect, useRef, useState } from 'react';
import { Link} from 'react-router-dom'; // use Link for routing
import { Menu, X } from 'lucide-react'
import './Header.css'
import { useSpring, animated } from '@react-spring/web';
import { useTrail } from '@react-spring/web';
import { useActive } from '../../contexts/active/ActiveContext';
import { useScrollRefs } from '../contexts/scrollContext';

export default function Header() {

  // get the active section from the active context
  const { activeSection } = useActive();

  // get the sctollToSection function from the header so that a user can scroll to a section when a link is clicked
  const { scrollToSection } = useScrollRefs()

  // state to open and close the nav bar on a phone/small screen
  const [ menuOpen, setMenuOpen ] = useState(false) // initial state is false

  // state to control header visiblility on page scroll
  const [ show, setShow ] = useState(true) // initially show the header

  // state to track the page position on scroll
  const [ lastScrollY, setLastScrollY ] = useState(0) // initial state is 0

  // useEffect to keep watch of teh page position on scroll
  useEffect(() => {
    // mobile logic
    if (menuOpen) return // exit theh function

    // function to keep track of the page position on scroll
    const handleScroll = () => {
      // current scrolling position
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        // hide the header
        setShow(false)
      } else {
        //show the header
        setShow(true)
      }


      setLastScrollY(currentScrollY)
    }

    
    // Track the scrol event through an event listener
    window.addEventListener("scroll", handleScroll)
    // clean up
    return () => window.removeEventListener("scroll", handleScroll)

  }, [lastScrollY, menuOpen]) // watch out for the position


  // React spring animation function
  const menuAnimation = useSpring({
    transform: menuOpen ? `translateX(0%)` : `translateX(100%)`,
    opacity: menuOpen ? 1 : 0,
    config: { tension: 220, friction: 20 }
  })

  const menuItems = [
    { name: 'Home', path: '/', id: 'hero' },
    { name: 'About', path: '/about', id: 'about' },
    { name: 'Services', path: '/services', id: 'services' },
    { name: 'Why Us', path: '/whyus', id: 'whyus' },
    { name: 'Prices', path: '/pricing', id: 'pricing' },
    { name: 'Contact', path: '/contact', id: 'contact' }
  ]

  const trail = useTrail(menuItems.length, {
    opacity: menuOpen ? 1 : 0,
    transform: menuOpen ? `translateX(0%)` : `translateX(20%)`,
    from: { opacity: 0, transform: `translateX(20%)` },
    config: { tension: 220, friction: 20 }
  })

  // React spring for active nav links
  function getLinkSpring(isActive) {
    return {
      color: isActive ? '#c87cff' : '#fff', // purple when active, white when not
      textShadow: isActive
        ? '0 0 6px #c87cff, 0 0 12px #d5a0fa'
        : '0 0 0px #000, 0 0 0px #000',
      config: { tension: 200, friction: 20 } // smooth spring
    }
  }

  const AnimatedLink = animated(Link)

  // const headerSpring = useSpring({
  //   transform: showHeader ? 'translateY(0%)' : 'translateY(-100%)',
  //   config: { tension: 220, friction: 20}
  // })

  return (
    <header 
      // style={headerSpring}
      className={`header ${show ? 'show' : 'hide'}`}
    >
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Neurora</Link>
        </div>
        <div className="nav-links">
          <AnimatedLink 
            to="/"
            style={getLinkSpring(activeSection === 'hero')}
            onClick={() => scrollToSection('hero')}
          >
            Home
          </AnimatedLink>

          <AnimatedLink 
            style={getLinkSpring(activeSection === 'about')}
            onClick={() => scrollToSection('about')}
          >  
            About
          </AnimatedLink>

          <AnimatedLink 
            style={getLinkSpring(activeSection === 'services')}
            onClick={() => scrollToSection('services')}
          >
            Services
          </AnimatedLink>
          
          <AnimatedLink 
            style={getLinkSpring(activeSection === 'whyus')}
            onClick={() => scrollToSection('whyus')}
          >
            Why Us
          </AnimatedLink>
          
          <AnimatedLink 
            style={getLinkSpring(activeSection === 'pricing')}
            onClick={() => scrollToSection('pricing')}
          >
            Prices
          </AnimatedLink>
          
          <AnimatedLink 
            style={getLinkSpring(activeSection === 'contact')}
            onClick={() => scrollToSection('contact')}
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
                style={getLinkSpring(
                  activeSection === menuItems[index].id
                )}

                onClick={() => {
                  scrollToSection(menuItems[index].id)
                  setMenuOpen(false)
                }}
              >
                {menuItems[index].name}
              </AnimatedLink>
            </animated.div>
          ))}

          <animated.div style={trail[0]}>
            <button 
              className="btn-primary"
              onClick={() => {
                window.open('https://calendly.com/neurora4/30min', '_blank')
                setMenuOpen(false);
              }}
            >
              Get Started
            </button>
          </animated.div>
          
        </animated.div>

        <button 
          className="btn-primary"
          onClick={() => window.open('https://calendly.com/neurora4/30min', '_blank')}
        >
          Get Started
        </button>
        
      </nav>
    </header>
  );
}

