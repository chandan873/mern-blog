import React from 'react'
import './Footer.css'
import IMG from '../assets/footer-logo.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer1">
        <img src={IMG} alt="" />
        <p className='ft1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo expedita minus dolorum error quos similique Lorem, ipsum dolor.</p>

        <p className='ctext'> <strong>Phone - +91 9736 780 5805</strong></p>
        <p className='ctext'> <strong>Mail ID - test@psychomail.com</strong></p>
      </div>
      <div className="footer1">
        <h1>Our Services</h1>
        <ul>
          <li> <p></p> Depression Treatment</li>
          <li> <p></p>Relationship Problems</li>
          <li><p></p>Sexual Counselling</li>
          <li><p></p>Personal Development</li>
          <li><p></p>Couples Counselling</li>
          <li><p></p>Anxiety Counselling</li>
        </ul>
      </div>
      <div className="footer1">
        <h1>Our Time Schedule</h1>
        <div className="sd1">
          <p>Monday - Friday</p>
          <span>8am to 6pm</span></div>

        <div className="sd1">
          <p>Saturday - Sunday</p>
          <span>9am to 4pm</span></div>
      </div>
      <div className="footer1">
        <div className="nlet">
          <h1>Newsletter</h1>
          <input type="text" placeholder='Your Email ID' />
        </div>
        <div className="social">
          <h1>Follow Us</h1>
          <div className="icon">
            <i class="fa-brands fa-facebook-f"></i>
            <i class="fa-brands fa-x-twitter"></i>
            <i class="fa-brands fa-google-plus-g"></i>
            <i class="fa-solid fa-rss"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-linkedin-in"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer