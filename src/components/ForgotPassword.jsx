import React, { useState } from "react";
import {
  Input,
  Button,
  HStack,
  Link,
  Text,
  Group,
  VStack,
} from "@chakra-ui/react";
import { Field } from "./ui/field";
import { Toaster, toaster } from "../components/ui/toaster";
const ForgotPassword = ({ onFormSwitch }) => {
  const url = "http://localhost:8001/api/v1/forgot-password";
  //const [error, setError] = useState("This field is required");
  const [userEmail, setUserEmail] = useState({
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserEmail((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleOnClickLoginBT = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail.email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Server Response:", data);
        setUserEmail({
          email: "",
        });
        toaster.create({
          title: "Password reset email sent!",
          type: "success",
          duration: 4000,
          action: {
            label: "x",
          },
        });
      } else {
        console.error("Failed to reset password!");
        toaster.create({
          title: "Password reset unsuccessful",
          description: "Please verify your email and try again.",
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
    <>
      <Group mx="auto">
        <VStack>
          <Field
            marginTop="32px"
            label="Email"
            //errorText={error}
            helperText="We'll send you instructions for renewing your password."
          >
            <Input
              placeholder="Enter your email"
              w="308pxpx"
              name="email"
              required
              invalid
              value={userEmail.email}
              onChange={handleChange}
            />
          </Field>
          <Button
            backgroundColor="orange.700"
            h="50px"
            borderRadius="100px"
            marginTop="32px"
            width="308px"
            onClick={handleOnClickLoginBT}
          >
            <Text
              fontWeight="800"
              fontSize="16px"
              letterSpacing="0.9px"
              color="white"
            >
              SEND EMAIL
            </Text>
          </Button>
        </VStack>
      </Group>
      <HStack justifyContent="center" mt="4">
        <Link
          color="teal.500"
          onClick={() => onFormSwitch("login")}
          marginBottom="25px"
          fontWeight="700"
        >
          Back to Sign In
        </Link>
      </HStack>
      <Toaster />
    </>
  );
};

export default ForgotPassword;
