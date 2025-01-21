import React from 'react';
import "../styles/AboutUs.css";
import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { Separator } from "@chakra-ui/react"
import { FaTools, FaShareAlt, FaSearch, FaRedo } from "react-icons/fa"; // Example icons
import { Grid, GridItem, Icon } from "@chakra-ui/react";


const AboutUs = () => {
    const values = [
        {
          title: "Build",
          description:
            "Lay the foundation by creating innovative projects that solve real-world problems and inspire learning.",
          icon: FaTools,
        },
        {
          title: "Share",
          description:
            "Exchange ideas and solutions by sharing knowledge and projects with the community to foster collaboration.",
          icon: FaShareAlt,
        },
        {
          title: "Review",
          description:
            "Provide constructive feedback to refine ideas and approaches, ensuring quality and innovation.",
          icon: FaSearch,
        },
        {
          title: "Repeat",
          description:
            "Iterate on processes and projects to continuously improve and achieve even greater results.",
          icon: FaRedo,
        },
      ];
    


    return(
        <div className='about-us-container'>
            <p className='about-us-header'>About Us</p>
            <p className='about-us-header-below'>Build. Share. Review. Repeat.</p>
            <div className='about-us-img-container'>
            <img className="about-us-img" src="./images/hh-team8.png"></img>
            </div>
            <div className='about-us-text-area'>
            <Text fontSize="lg" marginBottom="4" marginTop='40px'>
            Welcome to our collaborative project-sharing platform! Our mission is
            to empower developers, designers, and creatives to showcase their
            work, get feedback, and inspire others in the community.
            </Text>
            
            <Box textAlign="center" py={5} px={4} className='grid-box'>
            <Heading className='our-values-header'>
                Our Values
            </Heading>
            <Text maxW="700px" mx="auto" mb={10} color="gray.500" fontSize='16px' className='our-values-below'>
                Our process revolves around these core principles: Build, Share, Review, and Repeat.
            </Text>
            <Grid
                templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
                gap={6}
            >
                {values.map((value, index) => (
                <GridItem
                    key={index}
                    bg="blue.50"
                    borderRadius="22px"
                    p={6}
                    boxShadow="md"
                    transition="all 0.3s"
                    _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
                >
                    <VStack spacing={4} align="center">
                    <Icon fontSize="4xl" color="blue.500">
                        <value.icon />
                    </Icon>
                    <Heading as="h3" size="md" color="blue.700">
                        {value.title}
                    </Heading>
                    <Text color="gray.600" textAlign={{lg: "left"}} fontSize='18px' lineHeight='30px' className='box-text'>
                        {value.description}
                    </Text>
                    </VStack>
                </GridItem>
                ))}
            </Grid>
            </Box>
            <Text fontSize="lg" marginBottom="4">
            With features like project discovery, real-time commenting, and
            dynamic engagement, we aim to create a vibrant ecosystem where ideas
            thrive and collaborations flourish.
            </Text>
            <Text fontSize="lg" marginBottom="8">
            Our team is passionate about building tools that connect people and
            drive innovation. Join us in making this platform a hub for creative
            expression and growth.
            </Text>
            <Separator size="xs" marginBottom='20px'/>
            <Text fontSize="lg" marginBottom="8">
            Ready to make an impact? Join us today, share your project, and connect with like-minded creators shaping the future! 🚀
            </Text>
            </div>
            <footer>
                <img className="ctd-logo" src="./images/ctd-logo.png" alt="CTD Logo" />
            </footer> 
        </div>
    )
}
export default AboutUs;