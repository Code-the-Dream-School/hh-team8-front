import React from "react";
import "../styles/Navbar.css";
import LoginAuth from "./LoginAuth";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "../components/ui/menu"


const Navbar = () => {

  const openSignInModal = () => {
    const triggerButton = document.getElementById("menu-signin-trigger");
    if (triggerButton) {
      triggerButton.click(); // Programmatically "click" the hidden DialogTrigger
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <img src="./images/logo.png" className="logo" alt="Logo" />
        <div className="hamburger-menu">
        <MenuRoot>
          <MenuTrigger asChild>
            <img src="./images/hambuger-menu3.svg" className="burger-logo" alt="Logo" />
          </MenuTrigger>
          <MenuContent className="menu-content">
              <MenuItem as='a' onClick={openSignInModal}>
                Sign In
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
          <LoginAuth />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
