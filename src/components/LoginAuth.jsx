import { Box, HStack, VStack, Image } from "@chakra-ui/react";
import { useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useRef } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
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
    <DialogRoot placement="bottom" initialFocusEl={() => ref.current}>
      <DialogTrigger asChild>
        <a href="#" style={{ cursor: "pointer" }}>
          <img
            className="usericon"
            src="../images/user_icon.svg"
            alt="User Icon"
          />
        </a>
      </DialogTrigger>
      <DialogContent maxWidth="900px" padding="4" bg="blue.950">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogBody>
          <HStack spacing={8} align="start">
            {/* Left section with image and text */}
            <VStack spacing={4} align="start" w="100%">
              <Box
                flex="1"
                bg="gray.100"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src="../images/CTDLogo.jpg"
                  alt="Code The Dream Logo"
                  boxSize="100%"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </Box>
            </VStack>
            {/* Right section with login form */}
            <VStack spacing={4} align="start" w="100%">
              {renderFormContent()}
            </VStack>
          </HStack>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default CardWithForm;
