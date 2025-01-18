import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import LoginAuth from "./LoginAuth";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "../components/ui/menu";

const Navbar = () => {
  const storedAuth = JSON.parse(localStorage.getItem("auth"));
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("auth")) || false;
  });
  const handleLogout = () => {
    localStorage.removeItem("auth"); // Clear auth data the logout api will be call here
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
        <img src="./images/logo.png" className="logo" alt="Logo" />
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
              <MenuItem value="new-txt">About Us</MenuItem>
            </MenuContent>
          </MenuRoot>
        </div>
        <div className="menu">
          <a className="menulink" href="/home">
            HOME
          </a>
          <a className="menulink" href="">
            ABOUT US
          </a>
          <LoginAuth isAuthentificated={isAuthentificated} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
