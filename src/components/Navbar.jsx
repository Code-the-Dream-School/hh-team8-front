import React from "react";
import "../styles/Navbar.css";
import { useDisclosure } from "@chakra-ui/react";
import LoginAuth from "./LoginAuth"; // Import LoginAuth modal component
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          {/* I am using a User profile icon triggers modal */}
          <a href="#" onClick={(e) => e.preventDefault() || onOpen()}>
            <img
              className="usericon"
              src="./images/user_icon.svg"
              alt="User Icon"
            />
          </a>
        </div>
      </div>
      {/* I am Rendering the LoginAuth modal here */}
      <LoginAuth isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Navbar;
