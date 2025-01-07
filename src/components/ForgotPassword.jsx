import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  Link,
} from "@chakra-ui/react";

const ForgotPassword = ({ onFormSwitch }) => (
  <>
    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input placeholder="Enter your email" />
    </FormControl>
    <Button colorScheme="teal" width="100%" mt="4">
      Send Link
    </Button>
    <HStack justifyContent="center" mt="4">
      <Link color="teal.500" onClick={() => onFormSwitch("login")}>
        Back to Sign In
      </Link>
    </HStack>
  </>
);

export default ForgotPassword;
