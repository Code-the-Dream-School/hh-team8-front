import React, { useState, useEffect, useRef } from "react";
import { Box, VStack, HStack, Input, Button, Text } from "@chakra-ui/react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogCloseTrigger,
} from "./ui/dialog";
import { Toaster, toaster } from "../components/ui/toaster";
import { Alert } from "../components/ui/alert"
import { jwtDecode } from "jwt-decode";

const Comments = ({ projectId, userId: propUserId, username: propUsername, projectOwnerId }) => {
  const [comments, setComments] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef(null);
  const token = JSON.parse(localStorage.getItem("auth"));

  let userId = propUserId;
  let username = propUsername;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = propUserId || decodedToken.user_id;
      username = propUsername || decodedToken.username;
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  //console.log("Props received in Comments:", { projectId, userId, username });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8001/api/v1/comments/${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add token for authentication
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setComments(result.data || []);
        } else {
          console.error("Failed to fetch comments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [projectId, token]);

  const handleSend = async () => {
    if (!projectId) {
      console.error("Error: Project ID is undefined. Ensure projectId is passed as a prop.");
      return;
    }

    if (!token) {
      toaster.create({
        title: "Sign In Required!",
        description: "You must be signed in to send comments.",
        type: "warning",
        duration: 4000,
        action: {
          label: "x",
        },
      });
      return;
    }

    if (!currentMessage.trim()) {
      toaster.create({
        title: "Error",
        description: "Comment cannot be empty.",
        type: "error",
        duration: 4000,
        action: {
          label: "x",
        },
      });
      return;
    }
    try {
      console.log("Sending comment:", {
        url: `http://localhost:8001/api/v1/addcomment/${projectId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          user_id: userId,
          content: currentMessage.trim(),
        },
      });

      const response = await fetch(
        `http://localhost:8001/api/v1/addcomment/${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment_content: currentMessage.trim(),
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setComments((prevComments) => [
          ...prevComments,
          {
            comment_id: result.data.comment_id,
            user_id: userId,
            content: currentMessage.trim(),
            created_at: new Date().toISOString(),
            users: { username },
          },
        ]);
        setCurrentMessage("");
      } else {
        console.error(`Failed to send comment: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

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
        <DialogBody
          width="auto"
          height="100%"
          display="flex"
          flexDirection="column"
          marginTop="16px"
        >
          {/* Close Button */}
          <DialogCloseTrigger>
            <Button color="black" size="2xs" bg="wheat">
              X
            </Button>
          </DialogCloseTrigger>

          {/* Alert for Unauthenticated Users */}
          {!token && (
            <Box className="alertbox">
            <Alert status="error" mb={4} className='signin-alert'>
              You must be signed in to send comments.
            </Alert>
            </Box>
          )}

          {/* Comments List */}
          <Box
            flex="1"
            overflowY="auto"
            borderRadius="md"
            paddingRight="4"
            paddingLeft="4"
            marginBottom="8px"
            display="flex"
            flexDirection="column-reverse"
            color="black"
          >
            {comments.length === 0 ? (
              <Box textAlign="center" color="gray.500">
                No comments yet.
              </Box>
            ) : (
              <VStack spacing="4" align="start">
                {comments.map((comment) => (
                  <Box
                    key={comment.comment_id}
                    padding="2"
                    backgroundColor="blue.200"
                    borderRadius="md"
                    width="100%"
                    marginTop="4px"
                  >
                    <Text fontWeight="bold">
                      {comment.users.username}
                      {comment.user_id === projectOwnerId && " (Project Owner)⭐"}
                    </Text>
                    <Text>{comment.content}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(comment.created_at).toLocaleString()}
                    </Text>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </VStack>
            )}
          </Box>

          {/* Input and Send Button */}
          <HStack spacing="4" marginBottom="16px">
            <Input
              placeholder="Type your comment..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              flex="1"
            />
            <Button color="black" onClick={handleSend} size="sm" bg="wheat" m="2">
              Send
            </Button>
          </HStack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default Comments;
