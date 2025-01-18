import React from "react";
import { Input, VStack, Box, Link, Button, Text, Group } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
import { Field } from "./ui/field";
import { InputGroup } from "./ui/input-group";
import { LuUser } from "react-icons/lu";
import { useState } from "react";
const Login = ({ onFormSwitch }) => {
  const [value, setValue] = useState("");
  return (
    <VStack spacing={4} align="start" w="100%">
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
        <Group mx="auto">
          <VStack>
        <Field marginTop="20px" label="Username" required>
                <InputGroup flex="1" startElement={<LuUser />}>
                  <Input
                    placeholder="Username"
                    w="308px"
                    name="username"
                  />
                </InputGroup>
        </Field>

        <Field w="308px" marginTop="10px" label="Password" required>
                <PasswordInput
                  placeholder="Password"
                  name="password_hash"
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
          borderRadius="100px"
          marginBottom="20px"
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
        </VStack>
        </Group>
    </VStack>
  );
};

export default Login;
