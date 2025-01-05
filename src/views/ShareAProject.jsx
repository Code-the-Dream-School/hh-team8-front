import React, { useState } from 'react'
import "../styles/ShareAProject.css";
import { Input, CheckboxGroup, Fieldset, Textarea, Button } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { Checkbox } from "../components/ui/checkbox"

const ShareAProject = () => {

    const [newProject, setNewProject] = useState({
        title: '',
        githubURL: '',
        description: '',
        frameworks: [],
        liveDemoURL: '',
        comments: '',
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:8001/projects', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject),
          });
    
          if (response.ok) {
            console.log('Project submitted successfully:', newProject);
            setNewProject({
              title: '',
              githubURL: '',
              description: '',
              frameworks: [],
              liveDemoURL: '',
              comments: '',
            });
          } else {
            console.error('Failed to submit project');
          }
        } catch (error) {
          console.error('Error submitting project:', error);
        }
      };
    
      const handleCheckboxChange = (value) => {
        setNewProject((prev) => ({
          ...prev,
          frameworks: prev.frameworks.includes(value)
            ? prev.frameworks.filter((framework) => framework !== value)
            : [...prev.frameworks, value],
        }));
      };

    return(
        <form onSubmit={handleSubmit}>
        <div className='share-project-container'>
            <div className='sp-info-container'>
                <div className='sp-info-text-area'>
                    <p className='sp-info-header'>Start Your
                    Journey with Us</p>
                    <p className='sp-info-text'>Submit your project and take the next step in your learning journey with us. Whether you're looking to refine your skills or showcase your progress, we're here to guide you through each stage, helping you turn your ideas into impactful solutions.</p>
                    <img className="thumbs-up" src="./images/thumbs-up.svg" alt='thumbs-up'></img>
                </div>
            </div>
            <div className='sp-form-container'>
                <p className='sp-form-header'>Share Your Project</p>
                <Field
                marginTop="36px"
                label={<span style={{ fontSize: "20px"}}>Project Title</span>} required
                errorText="This field is required">
                    <Input
                        marginTop="20px"
                        width="617px"
                        height="52px"
                        backgroundColor="rgba(255, 255, 255, 0.16)"
                        placeholder="Enter your email"
                        borderRadius='8px'
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    />
                </Field>
                <Field 
                marginTop='36px'
                label={<span style={{ fontSize: "20px"}}>Description</span>} required helperText="Max 500 characters.">
                    <Textarea 
                        variant="subtle" 
                        marginTop="20px"
                        width="617px"
                        height="212px"
                        backgroundColor="rgba(255, 255, 255, 0.16)"
                        placeholder="Why did you develop this project?"
                        borderRadius='8px'
                        border='2px solid white'
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    />
                </Field>
                <Fieldset.Root>
                    <CheckboxGroup defaultValue={newProject.frameworks} name="framework">
                        <Fieldset.Legend mb="2" color='white' marginTop='36px' marginBottom='20px' fontSize='21px'>
                        Frameworks / Languages
                        </Fieldset.Legend>
                        <Fieldset.Content gap='16px'>
                            <Checkbox value="react" colorPalette='cyan' variant='solid'
                            checked={newProject.frameworks.includes('React')}
                            onChange={() => handleCheckboxChange('React')}>                         
                            <span style={{ fontSize: "20px", display: 'flex', alignItems: 'center'}}>React</span>
                            </Checkbox>
                            <Checkbox value="node.js" colorPalette='green' variant='solid'
                            checked={newProject.frameworks.includes('Node.js')}
                            onChange={() => handleCheckboxChange('Node.js')}>
                            <span style={{ fontSize: "20px", display: 'flex', alignItems: 'center'}}>Node.js</span>
                            </Checkbox>
                            <Checkbox value="htmlcss" colorPalette='purple' variant='solid'
                            checked={newProject.frameworks.includes('HTML / CSS')}
                            onChange={() => handleCheckboxChange('HTML / CSS')}>
                            <span style={{ fontSize: "20px", display: 'flex', alignItems: 'center'}}>HTML / CSS</span>
                            </Checkbox>
                        </Fieldset.Content>
                    </CheckboxGroup>
                </Fieldset.Root>
                <Field
                marginTop="36px"
                label={<span style={{ fontSize: "20px"}}>Github Repository URL</span>} required
                errorText="This field is required">
                    <Input
                        marginTop="20px"
                        width="617px"
                        height="52px"
                        backgroundColor="rgba(255, 255, 255, 0.16)"
                        placeholder="Enter your Github repository URL"
                        borderRadius='8px'
                        value={newProject.githubURL}
                        onChange={(e) => setNewProject({ ...newProject, githubURL: e.target.value })}
                    />
                </Field>
                <Field
                marginTop="36px"
                label={<span style={{ fontSize: "20px"}}>Live Demo URL (Optional)</span>}
                errorText="This field is required">
                    <Input
                        marginTop="20px"
                        width="617px"
                        height="52px"
                        backgroundColor="rgba(255, 255, 255, 0.16)"
                        placeholder="Enter your Live Demo URL (Optional)"
                        borderRadius='8px'
                        value={newProject.liveDemoURL}
                        onChange={(e) => setNewProject({ ...newProject, liveDemoURL: e.target.value })}
                    />
                </Field>
                <Field 
                marginTop='36px'
                label={<span style={{ fontSize: "20px"}}>Comments (Optional)</span>}>
                    <Textarea 
                        variant="subtle" 
                        marginTop="20px"
                        width="617px"
                        height="212px"
                        backgroundColor="rgba(255, 255, 255, 0.16)"
                        placeholder="Do you have any comments? (Optional)"
                        borderRadius='8px'
                        border='2px solid white'
                        value={newProject.comments}
                        onChange={(e) => setNewProject({ ...newProject, comments: e.target.value })}
                    />
                    <Button className='sp-button' variant="solid" type="submit">SUBMIT PROJECT</Button>
                </Field>
            </div>
        </div>
        <img className="ctd-logo" src="./images/ctd-logo.png"></img>
        </form>
        
    );
}

export default ShareAProject;