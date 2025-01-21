import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import LoginAuth from "./LoginAuth";
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "../components/ui/toaster";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "../components/ui/menu";

const Navbar = () => {
  const storedAuth = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();
  const url = "http://localhost:8001/api/v1/logout";
  const token = JSON.parse(localStorage.getItem("auth"));

  const [isSignedIn, setIsSignedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("auth")) || false;
  });

  const handleSignOut = async () => {
    //e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        toaster.create({
          title: "Logout",
          description: data.message,
          type: "success",
          duration: 4000,
          action: {
            label: "x",
          },
        });
      } else {
        console.error("Failed to logout!");
        toaster.create({
          title: "Logut unsuccessful",
          type: "error",
          action: {
            label: "x",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toaster.create({
        title: error,
        type: "error",
        action: {
          label: "x",
        },
      });
    }
  };

  const handleLogout = () => {
    handleSignOut();
    localStorage.removeItem("auth"); // Clear auth data the logout api will be call here
    navigate("/"); // Redirect to Home
  };
  const isAuthentificated = () => {
    setIsSignedIn(true); //update the data to true if the authentification is successfully in the login component.
  };

  const handleMenuItemClick = () => {
    if (isSignedIn) {
      handleLogout();
      setIsSignedIn(false);
    } else {
      if (!storedAuth) {
        const triggerButton = document.getElementById("menu-signin-trigger");
        triggerButton.click(); // Programmatically "click" the hidden DialogTrigger
      } else {
        setIsSignedIn(false);
      }
    }
  };

  useEffect(() => {
    const authState = JSON.parse(localStorage.getItem("auth"));
    setIsSignedIn(authState || false);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <a href='/home'>
        <img src="./images/logo.png" className="logo" alt="Logo" />
        </a>
        <div className="hamburger-menu">
          <MenuRoot>
            <MenuTrigger asChild>
              <img
                src="./images/hambuger-menu3.svg"
                className="burger-logo"
                alt="Logo"
              />
            </MenuTrigger>
            <MenuContent className="menu-content">
              <MenuItem
                as="a"
                onClick={handleMenuItemClick}
                id="menu-auth-trigger"
              >
                {isSignedIn ? "Log Out" : "Sign In"}
              </MenuItem>
              <MenuSeparator />
              <MenuItem value="new-txt2" as="a" href="/home">
                Home
              </MenuItem>
              <MenuItem value="new-txt" as="a" href="/about-us">About Us</MenuItem>
            </MenuContent>
          </MenuRoot>
        </div>
        <div className="menu">
          <a className="menulink" href="/home">
            HOME
          </a>
          <a className="menulink" href="/about-us">
            ABOUT US
          </a>
          <LoginAuth isAuthentificated={isAuthentificated} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Navbar;
