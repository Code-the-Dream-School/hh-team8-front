import { Input, HStack, VStack, Link, Button } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
import { Field } from "./ui/field";
import { InputGroup } from "./ui/input-group";
import { LuUser } from "react-icons/lu";
import React, { useState } from "react";
const SignUp = ({ onFormSwitch }) => {
  const [value, setValue] = useState("");
  return (
    <VStack spacing={4} align="start" w="100%">
      <Field label="Username" required>
        <InputGroup flex="1" startElement={<LuUser />}>
          <Input placeholder="Username" />
        </InputGroup>
      </Field>
      <Field label="Email" required helperText="We'll never share your email.">
        <Input placeholder="Enter your email" />
      </Field>
      <Field label="Password" required>
        <PasswordInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Field>
      <Field label="Confirm Password" required>
        <PasswordInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Field>

      <Button bg="orange.700" width="100%">
        Sign Up
      </Button>

      <HStack justifyContent="center">
        <Link color="teal.500" onClick={() => onFormSwitch("login")}>
          Already have an account? Sign in
        </Link>
      </HStack>
    </VStack>
  );
};

export default SignUp;
