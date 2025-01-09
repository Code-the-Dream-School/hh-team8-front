import React from "react";
import { Input, HStack, VStack, Link, Button } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
import { Checkbox } from "./ui/Checkbox";
import { Field } from "./ui/field";
import { InputGroup } from "./ui/input-group";
import { LuUser } from "react-icons/lu";
import { useState } from "react";
const Login = ({ onFormSwitch }) => {
  const [value, setValue] = useState("");
  return (
    <VStack spacing={4} align="start" w="100%">
      <Field label="Username">
        <InputGroup flex="1" startElement={<LuUser />}>
          <Input placeholder="Username" />
        </InputGroup>
      </Field>
      <Field label="Password">
        <PasswordInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Field>
      <HStack justifyContent="space-between" width="100%">
        <Link color="teal.500" onClick={() => onFormSwitch("forgotPassword")}>
          Forgot Password?
        </Link>
        <Checkbox color="teal.500">Remember me</Checkbox>
      </HStack>

      <Button bg="orange.700" width="100%">
        Login
      </Button>

      <HStack justifyContent="center">
        <Link color="teal.500" onClick={() => onFormSwitch("signup")}>
          New user? Sign up
        </Link>
      </HStack>
    </VStack>
  );
};

export default Login;
