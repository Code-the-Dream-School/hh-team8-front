import React, {useEffect, useState} from 'react';
import "../styles/ExploreProjects.css";
import { Badge, Button } from "@chakra-ui/react"

const ExploreProjects = () => {
  
    const [projects, setProjects] = useState([]);

    useEffect(() => {
    // Fetch data from JSON Server
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8001/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
    }, []); // Run only once when the component mounts

  return (
    <div className="explore-projects-container">
        <p className='ep-header'>Explore Projects</p>
        <div className='projects-grid'>
            {projects.map((project, index) => (
            <div key={index} 
            className='project-tile'>
                <div className='project-details'>
                    <p className='project-date'
                    style={{ color: 'rgba(255, 255, 255, 0.48)' }}>
                        {new Date(project.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        })}
                    </p>
                    <p className='project-name'>{project.title}</p>
                    <p className='ep-username'>Username</p>
                    <div className="framework-badges">
                    {project.frameworks
                        ?.sort((a, b) => {
                            const order = ["React", "Node.js", "HTML / CSS"];
                            return order.indexOf(a) - order.indexOf(b);
                        })
                        .map((framework) => {
                            let colorPalette = "gray";
                            if (framework === "React") colorPalette = "cyan";
                            else if (framework === "Node.js") colorPalette = "green";
                            else if (framework === "HTML / CSS") colorPalette = "purple";

                        return (
                            <Badge
                            key={framework}
                            variant="solid"
                            colorPalette={colorPalette}
                            size="lg"
                            >
                            {framework}
                            </Badge>
                        );
                        })}
                    </div>
                    <div className='tile-buttons'>
                        <Button className='live-demo-button' variant="solid" type="button"
                        onClick={() => {
                            const url = project.liveDemoURL.startsWith('http://') || project.liveDemoURL.startsWith('https://')
                              ? project.liveDemoURL
                              : `https://${project.liveDemoURL}`;
                            console.log("Opening Live Demo URL:", url);
                            window.open(url, '_blank');
                          }}
                        disabled={!project.liveDemoURL}>
                        Live Demo
                        <img className="external-link" src="./images/external-link.svg" alt='thumbs-up'></img>
                        </Button>
                        <Button className='git-link-button' variant="solid" type="submit">
                            View on Github
                            <img className="github-link" src="./images/github.svg" alt='github'></img>
                        </Button>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default ExploreProjects;
