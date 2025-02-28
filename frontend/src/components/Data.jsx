import React from 'react'
import './Data.css'

const Data = () => {
    return (
        <div className='data'>
            <div className="data_box">
                <div className="data_box1">
                    <i class="fa-solid fa-house-medical"></i>
                    <h1>100+</h1>
                    <p>In-house Doctors</p>
                </div>
                <div className='data_box1'>
                    <i class="fa-solid fa-earth-americas"></i>
                    <h1>30+</h1>
                    <p>Medical Branches</p>
                </div>
                <div className='data_box1'>
                    <i class="fa-regular fa-circle"></i>
                    <h1>4010+</h1>
                    <p>Successful Therapy</p>
                </div>

            </div>
            <p><strong>Best in class</strong> psychiatric therapy conducted in traditional <br /> and the <strong>most advanced methods</strong> </p>


            <button>Talk to Us  <i class="fa-solid fa-comments"></i></button>


        </div>
    )
}

export default Data