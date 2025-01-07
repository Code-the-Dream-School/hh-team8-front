import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Box,
  Flex,
  VStack,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

const LoginAuth = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formType, setFormType] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderFormContent = () => {
    switch (formType) {
      case "login":
        return (
          <Login
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            onFormSwitch={setFormType}
          />
        );
      case "signup":
        return (
          <SignUp
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            onFormSwitch={setFormType}
          />
        );
      case "forgotPassword":
        return <ForgotPassword onFormSwitch={setFormType} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/*<Button onClick={onOpen}>Open Login Modal</Button>*/}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth="900px" padding="4">
          <Flex>
            <Box
              flex="1"
              bg="gray.100"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src="./images/CTDLogo.jpg"
                alt="Code The Dream Logo"
                boxSize="100%"
                objectFit="contain"
                width="100%"
                height="100%"
              />
            </Box>
            <Box flex="1" padding="6">
              <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">
                {formType === "login" && "Log In"}
                {formType === "signup" && "Sign Up"}
                {formType === "forgotPassword" && "Forgot Password"}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing="4">{renderFormContent()}</VStack>
              </ModalBody>
            </Box>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginAuth;
