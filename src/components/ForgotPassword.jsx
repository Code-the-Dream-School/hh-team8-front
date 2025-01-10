import React from "react";
import { Input, Button, HStack, Link } from "@chakra-ui/react";
import { Field } from "./ui/field";
const ForgotPassword = ({ onFormSwitch }) => (
  <>
    <Field label="Email" required helperText="We'll never share your email.">
      <Input placeholder="Enter your email" />
    </Field>
    <Button bg="orange.700" width="100%" mt="4">
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
