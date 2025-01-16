import { Input, VStack, Stack, Button, Text } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
import { Field } from "./ui/field";
import { InputGroup } from "./ui/input-group";
import { LuUser } from "react-icons/lu";
import React, { useState } from "react";
import { Toaster, toaster } from "../components/ui/toaster";
import { Alert } from "../components/ui/alert";
import "../styles/AddUserForm.css"; // Import custom CSS
// SignUp component
const SignUp = ({ onFormSwitch }) => {
  const url = "http://localhost:8001/api/v1/adduser";
  const [errorMessage, setErrorMessage] = useState("");
  //const [alertMessage, setAlertMessage] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password_hash: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
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
  const handleAddUserForm = async (e) => {
    e.preventDefault();

    // check if all fields are filled
    const { username, email, password_hash, confirmPassword } = userData;
    const newErrors = {
      username: !username,
      email: !email,
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
      return;
    }
    // If any field is missing, prevent user form submission
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password_hash: userData.password_hash,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        //alert(data.message);
        toaster.create({
          title: data.message,
          type: "success",
          duration: 4000,
          action: {
            label: "x",
          },
        });
        //setAlertMessage(data.message);
        console.log("Server Response:", data);
        setUserData({
          username: "",
          email: "",
          password_hash: "",
          confirmPassword: "",
        });
      } else {
        console.error("Failed to add user");
        toaster.create({
          title: "Failed to add user",
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
      <Text fontSize="36px" fontWeight="700" marginTop="16px">
        Register
      </Text>
      <Text fontSize="20px" marginTop="16px" opacity="0.72">
        Welcome to Code the Dream Project Review! Register to start your
        journey!
      </Text>
      <Text fontSize="20px" marginTop="16px" fontWeight="600">
        Already have an account?{" "}
        <Text
          as="a"
          href="#"
          color="#63E9EE"
          textDecoration="underline"
          fontWeight="600"
          cursor="pointer"
          display="inline" // Ensures it stays inline with the "New user?" text
          onClick={() => onFormSwitch("login")} // Switch to Sign Up form
        >
          Sign In→
        </Text>
      </Text>
      <Field marginTop="20px" label="Username" required>
        <InputGroup flex="1" startElement={<LuUser />}>
          <Input
            placeholder="Username"
            w="408px"
            name="username"
            value={userData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username ? "error" : ""}
          />
        </InputGroup>
      </Field>
      <Field
        marginTop="10px"
        label="Email"
        required
        helperText="We'll never share your email."
      >
        <InputGroup flex="1" startElement={<LuUser />}>
          <Input
            placeholder="Email"
            w="408px"
            name="email"
            value={userData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? "error" : ""}
          />
        </InputGroup>
      </Field>
      <Field w="408px" marginTop="10px" label="Password" required>
        <PasswordInput
          placeholder="Password"
          name="password_hash"
          value={userData.password_hash}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password_hash ? "error" : ""}
        />
      </Field>
      <Field w="408px" marginTop="10px" label="Confirm Password" required>
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
        <Stack gap="2" width="408px">
          <Alert status="error" title={errorMessage} />
        </Stack>
      )}
      {/* Display error message */}
      <Button
        backgroundColor="#CF64EE"
        width="408px"
        h="50px"
        borderRadius="100px"
        marginBottom="25px"
        marginTop="32px"
        onClick={handleAddUserForm}
      >
        <Text
          fontWeight="800"
          fontSize="16px"
          letterSpacing="0.9px"
          color="white"
        >
          REGISTER
        </Text>
      </Button>
      <Toaster />
    </VStack>
  );
};

export default SignUp;
