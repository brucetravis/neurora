import React from 'react';
import { animated } from '@react-spring/web';

export default function ServiceCard({ icon, title, description, prices, cardSpring }) {

  return (
    <animated.div 
      style={{
        ...cardSpring
      }} 
      
      className="service-card"
    >
      <div className="icon-wrapper">{icon}</div>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{description}</p>
      <p className="service-amount">{prices}</p>
    </animated.div>
  );
}
