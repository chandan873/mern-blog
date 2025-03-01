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
When I was a teenager, I needed someone to listen to me, but no psychologist would listen to a 15-year-old. On top of thattherapy costswere impossible to afford. That got me thinking, more than half our population needs therapy but they either won’t go because they think they don’t need it or maybe they can’t afford it like me.But with pseudo-psychology trends becoming popular it was easy to mixfiction with facts, so I took matters into my own hands, got a degree, started practising, and hired likeminded people from the same background.
That’s how mymindgarden took birth!our mission is to spread mental health awareness and give at leastthe basics of mindfulhacksto people whodon't want to indulge in therapy.Ourvision is to providequality therapy that is not only pocket-friendly but also available for all ages.


                   </p>

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
