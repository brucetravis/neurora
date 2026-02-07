import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { animated } from '@react-spring/web'
import { useActive } from '../../contexts/active/ActiveContext'
// import { Menu, X } from 'lucide-react'

export default function Header() {

  // get the activeSection state from the context
  const { activeSection } = useActive()

  // state to track the last scrolling position
  const [ lastScrollY, setLastScrollY ] = useState(0)

  // state to display and hide the header
  const [ show, setShow ] = useState(true) // the header is initilly visible

  // state to open and close the menu on mobile
  // const [ menuOpen, setMenuOpen] = useState(false) // initially, the menu is closed

  // header links on phone
  // const menuItems = [
  //   { name: 'Home', path: '/', id: 'hero' },
  //   { name: 'About', path: '/about', id: 'about' },
  //   { name: 'Services', path: '/services', id: 'services' },
  //   { name: 'Why Us', path: '/whyus', id: 'whyus' },
  //   { name: 'Prices', path: '/pricing', id: 'pricing' },
  //   { name: 'Contact', path: '/contact', id: 'contact' }
  // ]

  // useEffect to apply side effects when the user scrolls up and down
  useEffect(() => {

    // function to appy the scroll effect
    const handleScroll = () => {
      // current scrolling position
      const currentScrollY = window.scrollY

      // if the current Scrolling position is greater than the last scrolling position
      if (currentScrollY > lastScrollY) {
        // hide the header
        setShow(false)

      } else {
        //  display the header
        setShow(true)
      }

      setLastScrollY(currentScrollY)
    }


    // listen for the scroll event
    window.addEventListener("scroll", handleScroll)

    // clean up the listener
    return () => window.removeEventListener('scroll', handleScroll)

  }, [lastScrollY]) // watch out for the last scrolled position


  // function containing the link styles for when a section is active and inActive
  function getLinkSpring(isActive) {
    return {
      color: isActive ? '#c87cff' : '#fff', // purple when active, white when a section is inactive
      textShadow: isActive 
        ? '0 0 6px #c87cff, 0 0 12px #d5a0fa'
        : '0 0 0px #000, 0 0 0px #000',
      config: { tension: 200, friction: 20 } // smooth spring
    }
  }


  const AnimatedLink = animated(Link)


  return (
    <header
      className={ show ? "show" : "hide" }
    >
      <nav
        className='navbar'
      >
        <div
          className='logo'
        >
          <Link to="/">
            <img 
              src={require('../../images/neurora-removebg-preview.png')}
              alt="Neurora"
            />
          </Link>
        </div>

        <div
          className='nav-links'
        >
          <AnimatedLink
            style={getLinkSpring(activeSection === 'hero')}
          >
            Home
          </AnimatedLink>

          <AnimatedLink
            style={getLinkSpring(activeSection === 'about')}
          >
            About
          </AnimatedLink>

          <AnimatedLink
            style={getLinkSpring(activeSection === 'services')}
          >
            Services
          </AnimatedLink>

          <AnimatedLink
            style={getLinkSpring(activeSection === 'whyUs')}
          >
            Why Us
          </AnimatedLink>

          <AnimatedLink
            style={getLinkSpring(activeSection === 'pricing')}
          >
            Prices
          </AnimatedLink>

          <AnimatedLink
            style={getLinkSpring(activeSection === 'contact')}
          >
            Contact
          </AnimatedLink>
        </div>

        {/* {menuOpen ? (
          <Menu
            size={25}
            stroke='#fff'
            onClick={() => setMenuOpen(true)}
          />
        ) : (
          <X
            size={25}
            stroke="fff"
            onClick={() => setMenuOpen(false)}
          />
        )} */}
        
        <div>
          <button
            className='get-started'
            onClick={() => window.open('https://calendly.com/neurora4/30min', '_blank')}
          >
            Get Started
          </button>
        </div>

        {/* {menuItems.map((item) => (
          <div
            key={item.id}
            className='mobile-menu'
          >
            {item.name}
          </div>
        ))} */}
      </nav>
    </header>
  )
}
