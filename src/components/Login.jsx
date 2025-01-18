import React from "react";
import { Input, VStack, Box, Link, Button, Text } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
import { Field } from "./ui/field";
import { InputGroup } from "./ui/input-group";
import { LuUser } from "react-icons/lu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "../components/ui/toaster";
const Login = ({ onFormSwitch, onLoginSuccess, isAuthentificated }) => {
  const navigate = useNavigate();
  const url = "http://localhost:8001/api/v1/login";
  const [userData, setUserData] = useState({
    username: "",
    password_hash: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnClickLoginBT = async (e) => {
    e.preventDefault();
    try {
      console.log(userData);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          password_hash: userData.password_hash,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("auth", JSON.stringify(data.token));
        isAuthentificated();
        console.log(data.token);
        console.log("Server Response:", data);
        setUserData({
          username: "",
          password_hash: "",
        });

        if (onLoginSuccess) {
          onLoginSuccess(); // Notify the parent to close the dialog
        }
        navigate("/"); // Redirect to share-project after successful login
        toaster.create({
          title: "Login successful!",
          type: "success",
          duration: 8000,
          action: {
            label: "x",
          },
        });
      } else {
        console.error("Failed to login, please review your credentials");
        toaster.create({
          title: "Login unsuccessful",
          description: "Please verify your credentials and try again.",
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
  return (
    <VStack spacing={4} align="start" w="100%">
      <Box>
        <Text fontSize="36px" fontWeight="700" marginTop="16px">
          Sign In
        </Text>
        <Text fontSize="20px" marginTop="16px" opacity="0.72">
          Welcome to Code the Dream Project Review! Register to start your
          journey!
        </Text>
        <Text fontSize="20px" marginTop="16px" fontWeight="600">
          New user?{" "}
          <Text
            as="a"
            href="#"
            color="pink.500"
            textDecoration="underline"
            fontWeight="600"
            cursor="pointer"
            display="inline" // Ensures it stays inline with the "New user?" text
            onClick={() => onFormSwitch("signup")} // Switch to Sign Up form
          >
            Sign up→
          </Text>
        </Text>

        <Field marginTop="32px">
          <Text fontSize="18px" fontWeight="400">
            Username
          </Text>
          <InputGroup flex="1" startElement={<LuUser />}>
            <Input
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder="Username"
              w="308px"
            />
          </InputGroup>
        </Field>
        <Text marginTop="10px" fontSize="18px" fontWeight="400">
          Password
        </Text>

        <Field w="308px">
          <PasswordInput
            label="Password"
            placeholder="Password"
            name="password_hash"
            value={userData.password_hash}
            onChange={handleChange}
            w="308px"
          />
        </Field>
        <Link
          color="teal.500"
          onClick={() => onFormSwitch("forgotPassword")}
          fontWeight="700"
          marginTop="10px"
        >
          Forgot Password?
        </Link>
        <br />
        <Button
          backgroundColor="#183961"
          width="308px"
          h="50px"
          id={"btlogin"}
          borderRadius="100px"
          marginBottom="20px"
          marginTop="32px"
          onClick={handleOnClickLoginBT}
        >
          <Text
            fontWeight="800"
            fontSize="16px"
            letterSpacing="0.9px"
            color="#63E9EE"
          >
            SIGN IN
          </Text>
        </Button>
      </Box>
      <Toaster />
    </VStack>
  );
};

export default Login;
