import { Box, HStack, VStack, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { useRef } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import "../styles/login.css";


const CardWithForm = () => {
  const ref = useRef < HTMLInputElement > null;
  const [formType, setFormType] = useState("login");
  const renderFormContent = () => {
    switch (formType) {
      case "login":
        return <Login onFormSwitch={setFormType} />;
      case "signup":
        return <SignUp onFormSwitch={setFormType} />;
      case "forgotPassword":
        return <ForgotPassword onFormSwitch={setFormType} />;
      default:
        return null;
    }
  };
  return (
    
    <DialogRoot placement="center" initialFocusEl={() => ref.current}>
      <DialogTrigger asChild>
        <a href="#" style={{ cursor: "pointer" }}>
          <img
            className="usericon"
            src="../images/user_icon.svg"
            alt="User Icon"
          />
        </a>
      </DialogTrigger>
      <DialogContent maxWidth="1100px" pt="16px" className='dialog-container' backdropFilter="blur(10px)">
        <DialogBody>
          <HStack spacing={8} align="stretch" h="auto">
            {/* Left section with image */}
            <Box
              width="54%" // Fixed width for the image container
              height="auto" // Let height be controlled by right-hand content
              borderRadius="12px"
              overflow="hidden"
              flexShrink={0} // Prevent shrinking of the container
              marginRight='16px'
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
      </DialogContent>
    </DialogRoot>



  );
};

export default CardWithForm;
