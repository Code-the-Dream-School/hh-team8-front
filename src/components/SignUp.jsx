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
  Button,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignUp = ({ showPassword, togglePasswordVisibility, onFormSwitch }) => (
  <>
    <FormControl>
      <FormLabel>Username</FormLabel>
      <Input placeholder="Enter your username" />
    </FormControl>
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
    <FormControl>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm your password"
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
    <Button colorScheme="teal" width="100%">
      Sign Up
    </Button>
    <HStack justifyContent="center">
      <Link color="teal.500" onClick={() => onFormSwitch("login")}>
        Already have an account? Sign in
      </Link>
    </HStack>
  </>
);

export default SignUp;
