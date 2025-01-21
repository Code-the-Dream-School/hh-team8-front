import React, { useState } from "react";
import {
  VStack,
  HStack,
  Box,
  Image,
  Stack,
  Button,
  Text,
  Group,
} from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
import { Field } from "./ui/field";
import { Toaster, toaster } from "../components/ui/toaster";
import { Alert } from "../components/ui/alert";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const token = new URLSearchParams(window.location.search).get("token");
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({
    password_hash: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password_hash: false,
    confirmPassword: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error message on input change
    if (name === "password_hash" || name === "confirmPassword") {
      setErrorMessage("");
    }
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Clear the error if the input is not empty
    if (value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // check if all fields are filled
    const { password_hash, confirmPassword } = userData;
    const newErrors = {
      password_hash: !password_hash,
      confirmPassword: !confirmPassword,
    };
    setErrors(newErrors);

    // Check if passwords match
    if (password_hash !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: true,
      }));
      setErrorMessage("Passwords do not match!");
      setLoading(false);
      return;
    }
    // If any field is missing, prevent user form submission
    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false);
      setMessage("all field is required");
      return;
    }
    try {
      console.log(token);
      console.log(userData.password_hash);
      const response = await fetch(
        `http://localhost:8001/api/v1/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: userData.password_hash }),
        }
      );

      if (response.ok) {
        setMessage("Password reset successful!");
        toaster.create({
          title: "Password reset",
          description: message,
          type: "success",
          duration: 4000,
          action: {
            label: "x",
          },
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Error resetting password.");
        console.error("Error resetting password");
        toaster.create({
          title: "Error resetting password",
          description: message,
          type: "error",
          action: {
            label: "x",
          },
        });
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
      console.error("An unexpected error occurred.");
      toaster.create({
        title: "An unexpected error occurred.",
        type: "error",
        action: {
          label: "x",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Group grow marginTop={"200px"}>
        <VStack>
          <Box>
            <Text
              fontWeight="800"
              fontSize="30px"
              letterSpacing="0.9px"
              color="white"
              marginTop={10}
            >
              Reset Password
            </Text>
          </Box>
          <Box>
            <Field w="308px" marginTop="10px" label="New Password" required>
              <PasswordInput
                placeholder="Password"
                name="password_hash"
                value={userData.password_hash}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password_hash ? "error" : ""}
              />
            </Field>
            <Field w="308px" marginTop="10px" label="Confirm Password" required>
              <PasswordInput
                placeholder="Confirm Password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.confirmPassword ? "error" : ""}
              />
            </Field>
            <br />
            {errorMessage && (
              <Stack gap="2" width="308px">
                <Alert status="error" title={errorMessage} />
              </Stack>
            )}
            {/* Display error message */}
            <br />
            <Button
              backgroundColor="#CF64EE"
              width="308px"
              h="50px"
              borderRadius="100px"
              marginBottom="25px"
              onClick={handleSubmit}
            >
              <Text
                fontWeight="800"
                fontSize="16px"
                letterSpacing="0.9px"
                color="white"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Text>
            </Button>
          </Box>
        </VStack>
      </Group>

      <Toaster />
    </>
  );
};

export default ResetPassword;
