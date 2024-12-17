import React from "react";
import "../styles/Homepage.css";

const HomePage = () => {
    return(
    <div className="section1-container">
        <div className = 'section1'>
            <img className="cycle" src="./images/cycle.png"></img>
            <div className="content-area">
                <h1>Build.<br /> Share.<br /> Review.<br /> Repeat.</h1>
                <p className="top-text">Showcase your work and connect with peers who can help you reach the next level.</p>
                <div className="buton-area">
                    <button class = "share-button">SHARE A PROJECT</button>
                    <button class = "explore-button">EXPLORE PROJECTS</button>
                </div>            
            </div>
            <img class="section-image" src="./images/sectionimg-1.png"></img>
        </div>
    </div>

    );
}

export default HomePage;