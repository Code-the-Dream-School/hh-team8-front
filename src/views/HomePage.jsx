import React from "react";
import { Input } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { Button } from "../components/ui/button"
import "../styles/Homepage.css";
import {useNavigate} from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    return(
    <div className="section1-container">
        <div className = 'section1'>
            <img className="cycle" src="./images/cycle.png"></img>
            <div className="content-area">
                <div className="build-title">
                <h1>Build.<br /> Share.<br /> Review.<br /> Repeat.</h1>
                </div>
                <p className="top-text">Showcase your work and connect with peers who can help you reach the next level.</p>
                <div className="buton-area">
                    <button
                    class = "share-button"
                    onClick={() => navigate('/share-project')}
                    >SHARE A PROJECT</button>
                    <button class = "explore-button">EXPLORE PROJECTS</button>
                </div>            
            </div>
            <img class="section-image" src="./images/sectionimg-1.png"></img>
        </div>
        <div className="home-data-rectangle">
            <p>PROJECTS SHARED: 1,024+</p>
            <p>REVIEWS GIVEN: 5,678+ </p>
            <p>ACTIVE STUDENTS: 856+ </p>
        </div>
        <div className = 'section2'>
        <img class="section-image2" src="./images/sectionimg-2.png"></img>
            <div className="content-area-2">
                <p className="section2-title">Welcome to CTD Project Review</p>
                <div className="info-text">
                <p>
                The Ultimate Collaboration Hub for Students! <br /><br /> At CTD Project Review, we bring developers, designers, and innovators together to share their projects, gain valuable feedback, and grow. With a community that has celebrated over 200 React and 150 Node.js projects, we’re proud to be a platform where ideas flourish and collaboration drives success.<br /><br />Ready to make an impact? Join us today, share your project, and connect with like-minded creators shaping the future! 🚀
                </p>
                </div>         
            </div>
        </div>
        <div className="register-rectangle">
            <div className="text-area-register">
                <p className="register-title">Stay Updated on the Latest Projects!</p>
                <p>Don’t miss out on exciting new ideas and creative works from our vibrant<br />community.</p>
            </div>
            <div className="email-area-register">
                <Field className="register-email" label="Email" required>
                    <Input className="register-emailbox" placeholder="Enter your email" />
                </Field>
                <Button className="register-button" size="md">Register NOW!</Button>
            </div>
        </div>
        <img className="ctd-logo" src="./images/ctd-logo.png"></img>
    </div>
    );
}

export default HomePage;