import React from "react";
import "../styles/Navbar.css";
import LoginAuth from "./LoginAuth";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <img src="./images/logo.png" className="logo" alt="Logo" />
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
