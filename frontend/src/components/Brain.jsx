import React, { useState } from 'react';
import './Brain.css';
import IMG from '../assets/services-img.png'

function Brain() {
    const [hoveredDotText, setHoveredDotText] = useState('');

    const dots = [
        { id: 1, color: '#FF5733', text: 'Mature Development' },
        { id: 2, color: '#33FF57', text: 'Anti-anxiety Treatments' },
        { id: 3, color: '#3357FF', text: 'Antipsychotic Medications' },
        { id: 4, color: '#F1C40F', text: 'Mature Development' },
        { id: 5, color: '#9B59B6', text: 'Anti-anxiety Treatments' },
        { id: 6, color: '#1ABC9C', text: 'Problem Solving' },
        { id: 7, color: '#E74C3C', text: 'Antipsychotic Medications' },
        { id: 8, color: '#F39C12', text: 'Movement' },
    ];

    const handleDotHover = (text) => {
        setHoveredDotText(text);
    };

    const handleDotLeave = () => {
        setHoveredDotText('');
    };

    return (

        <div className="main_con_brain">
            <div className="title_brain">
                <p className='underline-text'>Peace of Mind</p>
                <h1>Understanding your Brain</h1>
            </div>
            <div className="circle-container">

                <div className="leftdata">
                    <div className='con_1'>
                        <h4>Mature <strong>Development</strong> <span>.01</span> </h4>
                        <p>The best contact you will get here <br /> lorem ipsum dolor sit amet</p>
                    </div>
                    <div className='con_1'>
                        <h4>Anti-anxiety <strong>Treatments</strong> <span>.02</span> </h4>
                        <p>The best contact you will get here <br /> lorem ipsum dolor sit amet</p>
                    </div>
                    <div className='con_1'>
                        <h4>Antipsychotic <strong>Medications</strong> <span>.03</span> </h4>
                        <p>The best contact you will get here <br /> lorem ipsum dolor sit amet</p>
                    </div>
                </div>
                <div className="circle">
                    {dots.map((dot, index) => {
                        const angle = (index * 46); // Divide the circle into 8 sections
                        return (
                            <div
                                key={dot.id}
                                className="dot"
                                style={{
                                    backgroundColor: dot.color,
                                    transform: `rotate(${angle}deg) translate(0, -175px)`,
                                    transformOrigin: 'center center',
                                }}
                                onMouseEnter={() => handleDotHover(dot.text)}
                                onMouseLeave={handleDotLeave}
                            />
                        );
                    })}
                    <img src={IMG} alt="Brain" className="brain-img" />
                </div>
                {hoveredDotText && <div className="text-overlay">{hoveredDotText}</div>}

                <div className="rightdata">
                    <div className='con_1'> <h4> <span>04.</span>  Mature <strong>Development</strong> </h4>
                        <p>The best contact you will get here <br /> lorem ipsum dolor sit amet</p></div>
                    <div className='con_1'><h4> <span>05.</span>  Anti-anxiety <strong>Treatments</strong> </h4>
                        <p>The best contact you will get here <br /> lorem ipsum dolor sit amet</p></div>
                    <div className='con_1'>
                        <h4> <span>06.</span>  Antipsychotic <strong>Medications</strong> </h4>
                        <p>The best contact you will get here <br /> lorem ipsum dolor sit amet</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Brain;
