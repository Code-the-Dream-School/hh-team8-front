import React from "react";
import { Box, VStack, Text, Button } from "@chakra-ui/react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogCloseTrigger,
} from "./ui/dialog";

const Details = ({ project }) => {
  return (
    <DialogRoot placement="center" initialFocusEl={() => null}>
      <DialogTrigger>
        <Button id="details-trigger" style={{ display: "none" }}>
          Open Details
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

          {/* Project Details */}
          <Box
            flex="1"
            borderRadius="md"
            overflowY="auto" // Enable vertical scrolling
            paddingRight="4"
            paddingLeft="4"
            paddingTop='24px'
            marginBottom="8px"
            paddingBottom='24px'
            color="black"

          >
            <VStack spacing="4" align="start" color='white' gap='28px' wordBreak="break-word">
              <Text fontWeight="bold" mx='auto' fontSize='40px' lineHeight='40px' textAlign='center'>
                {project.name}
              </Text>
              <Text>
                <strong>Description:</strong> {project.description}
              </Text>
              <Text>
                <strong>Frameworks/Languages:</strong> {project.tags.join(", ")}
              </Text>
              {project.github_link && (
                <Text>
                  <strong>GitHub:</strong>{" "}
                  <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                    {project.github_link}
                  </a>
                </Text>
              )}
              {project.youtube_video_link && (
                <Text>
                  <strong>Live Demo:</strong>{" "}
                  <a href={project.youtube_video_link} target="_blank" rel="noopener noreferrer">
                    {project.youtube_video_link}
                  </a>
                </Text>
              )}
            </VStack>
          </Box>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default Details;
