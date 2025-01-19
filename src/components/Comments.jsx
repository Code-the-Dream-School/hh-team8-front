import React, { useState, useEffect, useRef } from "react";
import { Box, VStack, HStack, Input, Button, Text } from "@chakra-ui/react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogCloseTrigger,
} from "./ui/dialog";

const Comments = () => {
  const [messages, setMessages] = useState([]); 
  const [currentMessage, setCurrentMessage] = useState(""); 
  const messagesEndRef = useRef(null); 

  const handleSend = () => {
    if (currentMessage.trim()) {
      const now = new Date();
      const formattedDate = now.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages([
        ...messages,
        { text: currentMessage.trim(), timestamp: formattedDate },
      ]); 
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <DialogRoot placement="center" initialFocusEl={() => null}>
      <DialogTrigger>
        <Button id="comments-trigger" style={{ display: "none" }}>
          Open Comments
        </Button>
      </DialogTrigger>

      <DialogContent
        width={["90%", "80%", "500px"]} 
        height="400px"
        className="dialog-container"
        backdropFilter="blur(10px)"
        borderRadius="8px"
      >
        <DialogBody width="auto" height="100%" display="flex" flexDirection="column" marginTop='16px'>
          {/* Close Button */}
          <DialogCloseTrigger>
          <Button color="black" onClick={handleSend} size='2xs' bg='wheat'>
              X
            </Button>
          </DialogCloseTrigger>
          {/* Messages List */}
          <Box
            flex="1"
            overflowY="auto"
            borderRadius="md"
            paddingRight='4'
            paddingLeft='4'
            marginBottom="8px"
            display="flex"
            flexDirection="column-reverse"
            color="black"
          >
            {messages.length === 0 ? (
              <Box textAlign="center" color="gray.500">
                No comments yet.
              </Box>
            ) : (
              <VStack spacing="4" align="start">
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    padding="2"
                    backgroundColor="blue.200"
                    borderRadius="md"
                    width="100%"
                    marginTop='4px'
                  >
                    <Text>username:</Text>
                    {msg.text}
                    <Text
                      fontSize="sm"
                      color="gray.500"
                
                      bottom="4px"
                      right="8px"
                      textAlign="right"
                    >
                      {msg.timestamp}
                    </Text>
                  </Box>
                ))}
                {/* Scroll target element */}
                <div ref={messagesEndRef} />
              </VStack>
            )}
          </Box>

          {/* Input and Send Button */}
          <HStack spacing="4" marginBottom='16px'>
            <Input
              placeholder="Type your comments..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              flex="1"
            />
            <Button color="black" onClick={handleSend} size='sm' bg='wheat' m='2'>
              Send
            </Button>
          </HStack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default Comments;
