import React from "react";
import { Input, VStack, Link, Button, Text } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
import { Field } from "./ui/field";
import { InputGroup } from "./ui/input-group";
import { LuUser } from "react-icons/lu";
import { useState } from "react";
const Login = ({ onFormSwitch }) => {
  const [value, setValue] = useState("");
  return (
    <VStack spacing={4} align="start" w="100%">
      <Text fontSize='36px' fontWeight='700' marginTop='16px'>Sign In</Text>
      <Text fontSize='20px' marginTop='16px' opacity='0.72'>Welcome to Code the Dream Project Review! Register to start your journey!</Text>
      <Text fontSize='20px' marginTop='16px' fontWeight='600'>New user? {" "}
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

      <Field marginTop='32px'>
        <Text fontSize='18px' fontWeight='400'>Username</Text>
        <InputGroup flex="1" startElement={<LuUser />}>
          <Input placeholder="Username" w='406px'/>
        </InputGroup>
      </Field>
      <Field marginTop='24px'>
        <Text fontSize='18px' fontWeight='400'>Password</Text>
        <PasswordInput w='406px'
          placeholder='Password'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Field>
        <Link color="teal.500" onClick={() => onFormSwitch("forgotPassword")} fontWeight='700'>
          Forgot Password?
        </Link>
      

      <Button backgroundColor='#183961' width="406px" h='70px' borderRadius='100px' marginBottom='20px'>
        <Text fontWeight='800' fontSize='16px' letterSpacing='0.9px' color='#63E9EE'>SIGN IN</Text>
      </Button>
    </VStack>
  );
};

export default Login;
