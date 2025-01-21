import React, { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Button } from "../components/ui/button";
import "../styles/Homepage.css";
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "../components/ui/toaster";
const HomePage = () => {
  const storedAuth = JSON.parse(localStorage.getItem("auth"));
  const [databoard, setDataboard] = useState({
    projects: 0,
    users: 0,
    comments: 0,
  });
  const navigate = useNavigate();

  const handleAuthentificationCheck = () => {
    if (!storedAuth) {
      toaster.create({
        title: "Sign In Required!",
        description: "You must be signed in to proceed with this request.",
        type: "warning",
        duration: 4000,
        action: {
          label: "x",
        },
      });
      return;
    } else {
      navigate("/share-project");
    }
  };

  useEffect(() => {
    // Fetch data from JSON Server
    const fetchDashboardData = async () => {
      try {
        //const response = await fetch("http://localhost:8001/api/v1/dashboard");
        const url = "http://localhost:8001/api/v1/dashboard";
        //const token = JSON.parse(localStorage.getItem("auth"));
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        if (response.ok) {
          const dashboardData = await response.json();
          setDataboard(dashboardData.data);
        } else {
          console.error("Failed to get dashboard data from the db");
        }
      } catch (error) {
        console.error("Error get dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []); // Run only once when the component mounts
  return (
    <div className="sections-container">
      <div className="section1">
        <div className="content-area">
          <div className="content-area-responsive">
            <div className="title-responsive">
              <div className="build-title">
                <img className="cycle" src="./images/cycle.png"></img>
                <h1>
                  Build.
                  <br /> Share.
                  <br /> Review.
                  <br /> Repeat.
                </h1>
              </div>
              <p className="top-text">
                Showcase your work and connect with peers who can help you reach
                the next level.
              </p>
            </div>
            <div className="button-area">
              <button
                className="share-button"
                onClick={() => handleAuthentificationCheck()}
              >
                SHARE A PROJECT
              </button>
              <button
                className="explore-button"
                onClick={() => navigate("/explore-project")}
              >
                EXPLORE PROJECTS
              </button>
            </div>
          </div>
        </div>
        <img className="section-image" src="./images/sectionimg-1.png"></img>
      </div>
      <p className="top-text-2">
        Showcase your work and connect with peers who can help you reach the
        next level.
      </p>
      <div className="home-data-rectangle">
        <p>PROJECTS SHARED: {databoard.projects}</p>
        <p>REVIEWS GIVEN: {databoard.comments} </p>
        <p>ACTIVE STUDENTS: {databoard.users} </p>
      </div>
      <div className="section2">
        <img className="section-image" src="./images/sectionimg-2.png"></img>
        <div className="content-area paddingfix">
          <p className="section2-title">Welcome to CTD Project Review</p>
          <div className="info-text">
            <p>
              The Ultimate Collaboration Hub for Students! <br />
              <br /> At CTD Project Review, we bring developers, designers, and
              innovators together to share their projects, gain valuable
              feedback, and grow. With a community that has celebrated over 200
              React and 150 Node.js projects, we’re proud to be a platform where
              ideas flourish and collaboration drives success.
              <br />
              <br />
              Ready to make an impact? Join us today, share your project, and
              connect with like-minded creators shaping the future! 🚀
            </p>
          </div>
        </div>
      </div>
      <div className="register-rectangle">
        <div className="text-area-register">
          <p className="register-title">Stay Updated on the Latest Projects!</p>
          <p className="register-info-text">
            Don’t miss out on exciting new ideas and creative works from our
            vibrant
            <br />
            community.
          </p>
        </div>
        <div className="email-area-register">
          <Field className="register-email" label="Email" required>
            <Input
              className="register-emailbox"
              placeholder="Enter your email"
            />
          </Field>
          <Button className="register-button" size="md">
            Register NOW!
          </Button>
          <Toaster />
        </div>
      </div>
      <img className="ctd-logo" src="./images/ctd-logo.png"></img>
    </div>
  );
};

export default HomePage;
