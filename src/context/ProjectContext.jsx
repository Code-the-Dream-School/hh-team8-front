import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  // Fetch projects from the JSON server on load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8001/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Add a project to the server and update the context
  const addProject = async (project) => {
    try {
      const response = await axios.post('http://localhost:8001/projects', project, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setProjects((prevProjects) => [...prevProjects, response.data]);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
