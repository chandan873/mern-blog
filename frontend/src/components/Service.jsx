import React from 'react'
import './Service.css'
import IMG from '../assets/banner-2.jpg'
import IMG2 from '../assets/doctor-signature.png'
import IMG3 from '../assets/icon-box-1.png'
import IMG4 from '../assets/icon-box-2.png'
import IMG5 from '../assets/icon-box-3.png'
import IMG6 from '../assets/icon-box-4.png'

const Service = () => {
    return (
        <div className='servicebox' id='services'>
            <div className="service_left">
                <div className="text">
                    <h1>The Real <strong>Experience</strong> </h1>
                    <p>BRANCHES ALL OVER THE WORLD</p>

                    <br />
                    <p className='quote'>“ To meet new shipper and consumer demands, modern warehouse design plans are larger, smarter, and more flexible. Also Intermodal rail moves supply chain efficiency in the right direction.”</p>
                    <br />
                    <p>Search our databases of the <strong>Top 100 providers</strong> in key segments of the supply chain industry.</p>
                    <br />
                    <div className="signs">
                        <img src={IMG2} alt="" />
                        <p>John McHill – <strong>Customer</strong> </p>
                    </div>
                </div>
                <div className="overlay2"></div> {/* Blue overlay placed after text */}
            </div>



            <div className="service_right">
                <div className="srvice_title">
                    <h1 className=''>Services for our best Psychiatrists</h1>
                    <p className='s_p'>physiotherapy professional, evidenced based treatment. We diagnose the cause and provide you with the best possible treatment.</p>
                </div>
                <div className="grid-container1">
                    <div className="s1">
                        <img src={IMG3} alt="" />
                        <p>Depression <br /> Treatment</p>
                    </div>
                    <div className="s1">
                        <img src={IMG4} alt="" />
                        <p>Relationship <br /> Problems</p>
                    </div>


                    <div className="s1">
                        <img src={IMG5} alt="" />
                        <p>Personal <br /> Development</p>
                    </div>
                    <div className="s1">
                        <img src={IMG6} alt="" />
                        <p>Couples <br /> Counselling</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service