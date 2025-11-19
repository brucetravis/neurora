// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // use Link for routing
// import { Menu, X } from 'lucide-react'
// import './Header.css'
// import { useSpring, animated } from '@react-spring/web';
// import { useTrail } from '@react-spring/web';

// export default function Header() {

//   // import the useNavigate hook from the react router so that we can route to another page
//   const navigation = useNavigate()

//   // state to open and close the nav bar on a phone/small screen
//   const [ menuOpen, setMenuOpen ] = useState(false) // initial state is false


//   // React spring animation function
//   const menuAnimation = useSpring({
//     transform: menuOpen ? `translateX(0%)` : `translateX(100%)`,
//     opacity: menuOpen ? 1 : 0,
//     config: { tension: 220, friction: 20 }
//   })

//   const menuItems = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Services', path: '/services' },
//     { name: 'Why Us', path: '/whyus' },
//     { name: 'Prices', path: '/pricing' },
//     { name: 'Contact', path: '/contact' }
//   ]

//   const trail = useTrail(menuItems.length, {
//     opacity: menuOpen ? 1 : 0,
//     transform: menuOpen ? `translateX(0%)` : `translateX(20%)`,
//     from: { opacity: 0, transform: `translateX(20%)` },
//     config: { tension: 220, friction: 20 }
//   })

//   return (
//     <header>
//       <nav className="navbar">
//         <div className="logo">
//           <Link to="/">Neurora</Link>
//         </div>
//         <div className="nav-links">
//           <Link to="/">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/services">Services</Link>
//           <Link to="/whyus">Why Us</Link>
//           <Link to="/pricing">Prices</Link>
//           <Link to="/contact">Contact</Link>
//         </div>
        
//         <div 
//           className='hamburger-icon'
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? <X size={25} stroke="#fff" /> : <Menu size={25} stroke="#fff" />}
//         </div>
        
//         <animated.div 
//           className="mobile-menu" 
//           style={menuAnimation}
//         >
//           {/* <Link to='/' onClick={() => setMenuOpen(false)}>Home</Link>
//           <Link to='/about' onClick={() => setMenuOpen(false)}>About</Link>
//           <Link to='/services' onClick={() => setMenuOpen(false)}>Services</Link>
//           <Link to='/contact' onClick={() => setMenuOpen(false)}>Contact</Link> */}

//           <X 
//             size={25} 
//             stroke="#fff"
//             onClick={() => setMenuOpen(!menuOpen)}
//             className='close-nav' 
//           />

//           {trail.map((props, index) => (
//             <animated.div
//               key={menuItems[index].name}
//               style={props}
//             >
//               <Link
//                 to={menuItems[index].path}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {menuItems[index].name}
//               </Link>
//             </animated.div>
//           ))}

//           <animated.div style={trail[0]}>
//             <button 
//               className="btn-primary"
//               onClick={() => {
//                 navigation('/contact');
//                 setMenuOpen(false);
//               }}
//             >
//               Get Started
//             </button>
//           </animated.div>

//           {/* <button 
//             className="btn-primary"
//             onClick={() => {
//               navigation('/contact')
//               setMenuOpen(false)
//             }}
//           >
//             Get Started
//           </button> *
//         </animated.div>

//         <button 
//           className="btn-primary"
//           onClick={() => navigation('/contact')}
//         >
//           Get Started
//         </button>
        
//       </nav>
//     </header>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';
import { useSpring, animated, useTrail } from '@react-spring/web';

export default function Header() {
  const navigation = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // === Hide header on scroll logic ===
  const lastScroll = useRef(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll.current && currentScroll > 80) {
        // scrolling DOWN → hide header
        setShowHeader(false);
      } else {
        // scrolling UP → show header
        setShowHeader(true);
      }

      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth slide animation
  const headerSpring = useSpring({
    transform: showHeader ? "translateY(0%)" : "translateY(-120%)",
    config: { tension: 260, friction: 28 }
  });

  // === MENU ANIMATIONS ===
  const menuAnimation = useSpring({
    transform: menuOpen ? `translateX(0%)` : `translateX(100%)`,
    opacity: menuOpen ? 1 : 0,
    config: { tension: 220, friction: 20 }
  });

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Why Us', path: '/whyus' },
    { name: 'Prices', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  const trail = useTrail(menuItems.length, {
    opacity: menuOpen ? 1 : 0,
    transform: menuOpen ? `translateX(0%)` : `translateX(20%)`,
    from: { opacity: 0, transform: `translateX(20%)` },
    config: { tension: 220, friction: 20 }
  });

  return (
    <animated.header style={headerSpring}>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Neurora</Link>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/whyus">Why Us</Link>
          <Link to="/pricing">Prices</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div
          className="hamburger-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={25} stroke="#fff" /> : <Menu size={25} stroke="#fff" />}
        </div>

        <animated.div className="mobile-menu" style={menuAnimation}>
          <X
            size={25}
            stroke="#fff"
            onClick={() => setMenuOpen(false)}
            className="close-nav"
          />

          {trail.map((props, i) => (
            <animated.div key={i} style={props}>
              <Link to={menuItems[i].path} onClick={() => setMenuOpen(false)}>
                {menuItems[i].name}
              </Link>
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
    </animated.header>
  );
}
