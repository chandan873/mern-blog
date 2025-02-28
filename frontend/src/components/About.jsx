import React from 'react'
import './About.css'
import Slider from "react-slick";
import IMG from '../assets/image-caption-1.jpg'
import IMG1 from '../assets/image-caption-2.jpg'
import IMG2 from '../assets/image-caption-3-1.jpg'

const About = () => {

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false
    };
    return (

        <div className='container1' id='about'>
            <div className="container1_left">
                <h1 className="underlined">Welcome To Psychological care</h1>

                <p>


                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, eum perspiciatis illum, enim atque optio libero officia deleniti accusamus nulla in facilis voluptates. Ea quo, qui labore id possimus hic. Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>

                <div className='btns'>
                    <button className='btn1'>Fix An Appointment</button>
                    <button className='btn2'>Learn More</button>
                </div>
            </div>
            <div className="container1_right">
                <div className="slider-container">
                    <Slider {...settings}>
                        <div>
                            <div className="image-wrapper">
                                <img src={IMG} alt="Image 1" />
                                <div className="overlay default">Default Text for Image 1</div>
                                <div className="overlay hover">Hover Text for Image 1</div>
                            </div>
                        </div>
                        <div>
                            <div className="image-wrapper">
                                <img src={IMG1} alt="Image 2" />
                                <div className="overlay default">Default Text for Image 2</div>
                                <div className="overlay hover">Hover Text for Image 2</div>
                            </div>
                        </div>
                        <div>
                            <div className="image-wrapper">
                                <img src={IMG2} alt="Image 3" />
                                <div className="overlay default">Default Text for Image 3</div>
                                <div className="overlay hover">Hover Text for Image 3</div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>

    )
}

export default About