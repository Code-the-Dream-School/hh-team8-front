import { Input, VStack, Button, Text } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
import { Field } from "./ui/field";
import { InputGroup } from "./ui/input-group";
import { LuUser } from "react-icons/lu";
import React, { useState } from "react";
const SignUp = ({ onFormSwitch }) => {
  const [value, setValue] = useState("");
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
          <Input placeholder="Username" w="408px" />
        </InputGroup>
      </Field>
      <Field
        marginTop="10px"
        label="Email"
        required
        helperText="We'll never share your email."
      >
        <InputGroup flex="1" startElement={<LuUser />}>
          <Input placeholder="Email" w="408px" />
        </InputGroup>
      </Field>
      <Field w="408px" marginTop="10px" label="Password" required>
        <PasswordInput
          placeholder="Password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Field>
      <Field w="408px" marginTop="10px" label="Confirm Password" required>
        <PasswordInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Confirm Password"
        />
      </Field>

      <Button
        backgroundColor="#CF64EE"
        width="408px"
        h="50px"
        borderRadius="100px"
        marginBottom="25px"
        marginTop="32px"
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
    </VStack>
  );
};

export default SignUp;
