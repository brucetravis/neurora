import React from 'react'
import './Contact.css'

export default function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-content">
        
        <h4 className="contact-kicker">Contact Us</h4>
        <h2 className="contact-heading">Help Us Help You</h2>
        <p className="contact-subtext">
          Tell us what you need — our team will respond within 24 hours.
        </p>

        <form className="contact-form">

          <div className="row">
            <div className="field">
              <label>First Name</label>
              <input type="text" placeholder="Enter your first name"/>
            </div>

            <div className="field">
              <label>Second Name</label>
              <input type="text" placeholder="Enter your second name"/>
            </div>
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="Enter your email"/>
          </div>

          <div className="field">
            <label>Subject</label>
            <input type="text" placeholder="Subject of your message"/>
          </div>

          <div className="field">
            <label>Your Message</label>
            <textarea placeholder="Write your message"></textarea>
          </div>

          <button className="contact-btn">Send Message</button>

        </form>
      </div>
    </section>
  )
}
