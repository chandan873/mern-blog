import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: '',
    doctor: '',
    phone: '',
    date: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // You can add your form submission logic here
  };

  return (
    <div id='contact' className='contact_box'>
      <div className="overlay"></div>
      <div className="form_container">
        <div className="form">
          <h1>Fix An Appointment</h1>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form_group">
              <label htmlFor="name">Name</label>
              <input
                placeholder='Your Name'
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form_group">
              <label htmlFor="email">Email</label>
              <input
                placeholder='Your Email'
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form_group">
              <label htmlFor="phone">Phone</label>
              <input
                placeholder='Your Phone'
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form_group">
              <label htmlFor="serviceType">Service Type</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
              >
                <option value="">Any Service</option>
                <option value="consultation">Consultation</option>
                <option value="surgery">Surgery</option>
                <option value="checkup">Regular Checkup</option>
              </select>
            </div>
            <div className="form_group">
              <label htmlFor="doctor">Select Doctor</label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
              >
                <option value="">Select Doctor</option>
                <option value="dr_smith">Dr. Smith</option>
                <option value="dr_johnson">Dr. Johnson</option>
                <option value="dr_williams">Dr. Williams</option>
              </select>
            </div>

            <div className="form_group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form_group message">
              <label htmlFor="message">Message</label>
              <textarea
                placeholder='Your Message'
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required

              />
            </div>
            <button type="submit" className="submit_btn">See Availability</button>
          </form>
        </div>

        <div className="form_right">
          <h1>Contact Info</h1>
          <button>Talk to a Consultant <i class="fa-solid fa-comments"></i> </button>
          <div className="contact_info">
            <p>Need to discuss before treatment?</p>


            <div className="cont1">
              <i class="fa-solid fa-phone"></i><div className="contdel">
                <p>+123456789</p>
                <p>+123456789</p>
              </div>
            </div>

            <div className="cont1">
              <i class="fa-solid fa-location-dot"></i> <div className="contdel">
                <p>3554 Deerfeild drive</p>
                <p>Valdosta, GA 31601</p>
              </div>
            </div>
            <br /> <br />
            <p>The best contact you will get here lorem ipsum dolor sit amet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;