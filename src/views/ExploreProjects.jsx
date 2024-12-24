import React, { useEffect, useState } from 'react';
import "../styles/ExploreProjects.css";
import { Badge, Button } from "@chakra-ui/react"

const ExploreProjects = () => {
  

  return (
    <div className="explore-projects-container">
        <p className='ep-header'>Explore Projects</p>
        <div className='projects-grid'>
            <div className='project-tile'>
                <div className='project-details'>
                    <p className='project-date'>Dec 17, 2024</p>
                    <p className='project-name'>To-Do List</p>
                    <p className='ep-username'>Username</p>
                    <div className='framework-badges'>
                    <Badge variant="solid" colorPalette="cyan" size='lg'>React</Badge>
                    <Badge variant="solid" colorPalette="green" size='lg'>Node.js</Badge>
                    <Badge variant="solid" colorPalette="purple" size='lg'>HTML / CSS</Badge>
                    </div>
                    <div className='tile-buttons'>
                        <Button className='live-demo-button' variant="solid" type="submit">
                        Live Demo
                        <img className="external-link" src="./images/external-link.svg" alt='thumbs-up'></img>
                        </Button>
                        <Button className='git-link-button' variant="solid" type="submit">
                            View on Github
                            <img className="github-link" src="./images/github.svg" alt='thumbs-up'></img>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ExploreProjects;
