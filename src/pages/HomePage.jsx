import React from 'react'
import "../styles/components/HomePage/index.scss";
import brandBanner from "../assets/next-bot-desktop.png";
import Nlogo from "../assets/N.png";
import brandLogo from "../assets/automation.png";

function HomePage() {
    return (
        <div className="banner">
            <div className="banner-img">
                <div className='banner-img-container'>
                    {/* <img src={brandLogo} height={80} /> */}
                    <div className="banner-title">
                        <img src={Nlogo} height={32} width={32} />EXT AutoFit Nexus
                    </div>
                </div>

                <img src={brandBanner} height="80%" />
                <div className="banner-text">
                    <h1>Take Guesswork Out Of Automation</h1>
                </div>
            </div>
        </div>
    )
}

export default HomePage