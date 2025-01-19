import { Box, HStack, VStack, Image, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DialogBody,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogRoot,
  DialogFooter,
  DialogCloseTrigger,
  DialogTrigger,
  DialogActionTrigger,
} from "./ui/dialog";
import { useRef } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import "../styles/login.css";

const CardWithForm = ({ isAuthentificated }) => {
  const [formType, setFormType] = useState("login");
  const closeDialogRef = useRef(null); // Ref to programmatically trigger DialogCloseTrigger

  const storedAuth = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();
  /*const [isSignedIn, setIsSignedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("auth")) || false;
  });*/

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Clear auth data the logout api will be call here
    navigate("/"); // Redirect to Home
  };

  const handleClose = () => {
    if (closeDialogRef.current) {
      closeDialogRef.current.click(); // Programmatically trigger close button
    }
  };

  const renderFormContent = () => {
    switch (formType) {
      case "login":
        return (
          <Login
            onFormSwitch={setFormType}
            onLoginSuccess={handleClose}
            isAuthentificated={isAuthentificated}
          />
        );
      case "signup":
        return <SignUp onFormSwitch={setFormType} />;
      case "forgotPassword":
        return <ForgotPassword onFormSwitch={setFormType} />;
      default:
        return null;
    }
  };
  return (
    <>
      {storedAuth ? (
        <div>
          <DialogRoot role="alertdialog" placement="top">
            <DialogTrigger asChild>
              <a href="#" style={{ cursor: "pointer" }}>
                <img
                  className="usericon"
                  src="../images/user_icon.svg"
                  alt="User Icon"
                />
              </a>
            </DialogTrigger>
            <DialogContent
              className="dialog-container"
              backdropFilter="blur(10px)"
            >
              <DialogHeader>
                <DialogTitle>Confirm Logout</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <p>
                  Are you sure you want to log out? Your session will be ended,
                  and you’ll need to sign in again to access your account.
                </p>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button bg="whiteAlpha.500">Cancel</Button>
                </DialogActionTrigger>
                <Button bg="red.700" onClick={handleLogout}>
                  Log Out
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
        </div>
      ) : (
        <DialogRoot placement="center" id={"authDialog"}>
          <DialogTrigger>
            <a href="#" style={{ cursor: "pointer" }}>
              <img
                className="usericon"
                src="../images/user_icon.svg"
                alt="User Icon"
              />
            </a>
          </DialogTrigger>
          <DialogTrigger>
            <button style={{ display: "none" }} id="menu-signin-trigger">
              Open Sign In
            </button>
          </DialogTrigger>
          <DialogContent
            maxWidth="1100px"
            pt="16px"
            className="dialog-container"
            backdropFilter="blur(10px)"
          >
            <DialogBody Width="auto">
              <HStack spacing={8} align="stretch" wrap="wrap">
                {/* Left section with image */}
                <Box
                  width="54%" // Fixed width for the image container
                  height="auto" // Let height be controlled by right-hand content
                  borderRadius="12px"
                  overflow="hidden"
                  flexShrink={0} // Prevent shrinking of the container
                  marginRight="16px"
                  display={["none", "none", "flex"]}
                >
                  <Box
                    width="100%"
                    height="100%"
                    display="block"
                    position="relative"
                  >
                    <Image
                      src="../images/register.png"
                      alt="Code The Dream Logo"
                      objectFit="cover"
                      position="absolute"
                      top={0}
                      left={0}
                      width="100%"
                      height="100%"
                    />
                  </Box>
                </Box>
                {/* Right section with form */}
                <VStack spacing={4} align="start" flex="1">
                  {renderFormContent()}
                </VStack>
              </HStack>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger>
                <Button
                  as="div"
                  ref={closeDialogRef}
                  variant="outline"
                  display={"none"}
                />
                <DialogCloseTrigger size="md" bg="wheat" m="2" />
              </DialogActionTrigger>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      )}
    </>
  );
};

export default CardWithForm;
