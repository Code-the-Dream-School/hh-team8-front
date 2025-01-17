import React from "react";
import { Input, Button, HStack, Link, Text } from "@chakra-ui/react";
import { Field } from "./ui/field";
const ForgotPassword = ({ onFormSwitch }) => (
  <>
    <Field
      marginTop="32px"
      label="Email"
      required
      helperText="We'll send you instructions for renewing your password."
    >
      <Input placeholder="Enter your email" w="308pxpx" />
    </Field>
    <Button
      backgroundColor="orange.700"
      width="308pxpx"
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
        SEND EMAIL
      </Text>
    </Button>
    <HStack justifyContent="center" mt="4">
      <Link
        color="teal.500"
        onClick={() => onFormSwitch("login")}
        marginBottom="25px"
        fontWeight="700"
      >
        Back to Sign In
      </Link>
    </HStack>
  </>
);

export default ForgotPassword;
