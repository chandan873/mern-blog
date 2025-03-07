import React from 'react'
import IMG from '../assets/slider1.jpg'
import IMG2 from '../assets/slider2.jpg'
import IMG3 from '../assets/slider3.jpg'
import IMG4 from '../assets/icon2.png'
import IMG5 from '../assets/icon1.png'
import "./Hero.css"
import Slider from "react-slick";

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows: false
  };
  return (
    <Slider {...settings}>
      <div className="slider-item" id='home'>
        <img className='SIMG1' src={IMG} alt="Slide 1" />
        <div className="slider-text">
          <svg width="60" height="60" viewBox="0 0 24 24">
            <path d="M 14.017 18 L 14.017 10.609 C 14.017 4.905 17.748 1.039 23 0 L 23.995 2.151 C 21.563 3.068 20 5.789 20 8 H 24 V 18 H 14.017 Z M 0 18 V 10.609 C 0 4.905 3.748 1.038 9 0 L 9.996 2.151 C 7.563 3.068 6 5.789 6 8 H 9.983 L 9.983 18 L 0 18 Z" fill="#E5C37B" />
          </svg>

          <h1 className='animate__animated animate__fadeInDown' >Nature your mind like a garden <br/> watch your self flourish</h1> <p className='animate__animated animate__backInLeft'>Create a life that looks good on the <strong>inside,</strong> not one <br />that just looks good on the <strong>outside</strong></p>

          <div className='herobtns animate__animated animate__backInUp '>
            <button className='btn1'>Fix an Appointment</button> <button className='btn2'>View Servics</button>
          </div>
        </div>


      </div>

 
      <div className="slider-item2">
        <img className='s2img' src={IMG2} alt="Slide 2" />
        <div className="slider-text2">
          <img src={IMG4} alt="" />
          <p>Accredited by <strong>American Psychiatric Association</strong> </p>
          <h1>Get your Issues Sorted</h1>
          <p>get your life back, lead a fresh new life</p>

          <div className='herobtns'><button className='btn1'>Choose Theme</button></div>

        </div>
      </div>


      <div className="slider-item">
        <img className='S3IMG' src={IMG3} alt="Slide 3" />
        <div className="slider-text3">
          <img  src={IMG5} alt="" />
          <p>OVER <span>97%</span> <p2>CASE SOLVED</p2>  </p>
          <p>The <strong>Best Succes Rate</strong>  in Numbers</p>
          <h1>Award Winning Psychiatrist</h1>
          <div className='herobtns'><button className='btn1'>Choose Theme</button> <button className='btn2'>View Demo</button></div>
        </div>
      </div>

    </Slider>
  );
}
