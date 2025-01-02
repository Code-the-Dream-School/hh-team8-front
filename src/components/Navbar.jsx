import React from "react";
import "../styles/Navbar.css";

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
          <a className="menulink" href="/">
            Logout
          </a>
          <a href="">
            <img
              className="usericon"
              src="./images/user_icon.svg"
              alt="User Icon"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
