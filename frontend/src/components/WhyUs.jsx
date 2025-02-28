import React, { useState } from 'react';
import './WhyUs.css';
import IMG from '../assets/psychiatristportfolio4.jpg';
import IMG2 from '../assets/psychiatristportfolio6.jpg';
import IMG3 from '../assets/psychiatristportfolio8.jpg';

const WhyUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { img: IMG, title: "Ricky and Martin's Story", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolor incidunt ratione sunt illo minima assumenda accusamus modi, laborum, aut asperiores fugit hic obcaecati libero." },
    { img: IMG2, title: "John and Sarah's Journey", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolor incidunt ratione sunt illo minima assumenda accusamus modi, laborum, aut asperiores fugit hic obcaecati libero." },
    { img: IMG3, title: "Sophia's Experience", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolor incidunt ratione sunt illo minima assumenda accusamus modi, laborum, aut asperiores fugit hic obcaecati libero." }
  ];

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  // Logic to check if the current slide should have the image on the left or right
  const isImageOnLeft = currentSlide % 2 === 0;

  return (
    <div className='story'>
      <div className={`slide1 ${isImageOnLeft ? 'image-left' : 'image-right'}`}>
        <div className="img">
          <img src={slides[currentSlide].img} alt="Slide Image" />
        </div>
        <div className="text1">
          <h1>Successful Stories</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur</p><br />
          <h6><strong>{slides[currentSlide].title}</strong></h6>
          <p>{slides[currentSlide].text}</p>

          <button>Read More Stories</button>
        </div>
        
      </div>
      <div className="controls1">
        <div className="triangle-left" onClick={handlePrevSlide}></div>
        <span></span>
        <div className="triangle-right" onClick={handleNextSlide}></div>
      </div>
    </div>
  );
};

export default WhyUs;
