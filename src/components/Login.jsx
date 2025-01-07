import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  HStack,
  Link,
  Checkbox,
  Button,
  Divider,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

const Login = ({ showPassword, togglePasswordVisibility, onFormSwitch }) => (
  <>
    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input placeholder="Enter your email" />
    </FormControl>
    <FormControl>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
        />
        <InputRightElement>
          <IconButton
            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            onClick={togglePasswordVisibility}
            size="sm"
            variant="ghost"
            aria-label="Toggle Password Visibility"
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
    <HStack justifyContent="space-between" width="100%">
      <Link color="teal.500" onClick={() => onFormSwitch("forgotPassword")}>
        Forgot Password?
      </Link>
      <Checkbox>Remember me</Checkbox>
    </HStack>
    <Button colorScheme="teal" width="100%">
      Login
    </Button>
    <HStack justifyContent="center">
      <Link color="teal.500" onClick={() => onFormSwitch("signup")}>
        New user? Sign up
      </Link>
    </HStack>
    <Divider />
    <HStack justifyContent="center" spacing="4">
      <Button
        leftIcon={<FaGoogle />}
        colorScheme="red"
        variant="outline"
        size="sm"
      >
        Google
      </Button>
      <Button
        leftIcon={<FaFacebook />}
        colorScheme="facebook"
        variant="outline"
        size="sm"
      >
        Facebook
      </Button>
      <Button
        leftIcon={<FaGithub />}
        colorScheme="gray"
        variant="outline"
        size="sm"
      >
        GitHub
      </Button>
    </HStack>
  </>
);

export default Login;
