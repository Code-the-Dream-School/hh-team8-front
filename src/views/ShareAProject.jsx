import React, { useState } from "react";
import "../styles/ShareAProject.css";
import {
  Input,
  CheckboxGroup,
  Fieldset,
  Textarea,
  Button,
  Link,
  Stack,
} from "@chakra-ui/react";
import { Alert } from "../components/ui/alert";
import { LuExternalLink } from "react-icons/lu";
import { Field } from "../components/ui/field";
import { Checkbox } from "../components/ui/checkbox";
import { Toaster, toaster } from "../components/ui/toaster";

const ShareAProject = () => {
  const token = JSON.parse(localStorage.getItem("auth"));
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    github_link: "",
    youtube_video_link: "",
    tags: [],
  });
  const [hasError, setHasError] = useState(false); // Validation state
  const [errors, setErrors] = useState({
    github_link: "",
    youtube_video_link: "",
  });

  const validateUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-.]*)*(\?.+)?$/;
    return urlPattern.test(url);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newProject.tags.length === 0) {
      setHasError(true); // Show error if no checkbox is selected
      toaster.create({
        title: "Please select at least one framework/language.",
        type: "warning",
        duration: 4000,
        action: {
          label: "x",
        },
      });
      //console.log("Please select at least one framework/language.");
      return;
    }
    const newErrors = {};

    // Validate GitHub URL (Required)
    if (!newProject.github_link || !validateUrl(newProject.github_link)) {
      newErrors.github_link = "Please provide a valid GitHub repository URL.";
    }

    // Validate Live Demo URL (Optional, only if provided)
    if (
      newProject.youtube_video_link &&
      !validateUrl(newProject.youtube_video_link)
    ) {
      newErrors.youtube_video_link = "Please provide a valid Live Demo URL.";
    }
    console.log(Object.keys(newErrors).length);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Display errors

      if (newErrors.github_link) {
        console.log(newErrors.github_link);
        toaster.create({
          title: newErrors.github_link,
          type: "warning",
          duration: 4000,
          action: {
            label: "x",
          },
        });
      }
      if (newErrors.youtube_video_link) {
        console.log(newErrors.youtube_video_link);
        toaster.create({
          title: newErrors.youtube_video_link,
          type: "warning",
          duration: 4000,
          action: {
            label: "x",
          },
        });
      }
      return;
    }
    try {
      const response = await fetch("http://localhost:8001/api/v1/addProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(newProject),
      });
      if (response.ok) {
        toaster.create({
          title: "Project submitted succesfully!",
          type: "success",
          duration: 8000,
          action: {
            label: "x",
          },
        });
        setNewProject({
          name: "",
          description: "",
          github_link: "",
          youtube_video_link: "",
          tags: [],
        });
      } else {
        console.error("Failed to add project:", response.statusText);
        //console.error("Failed to submit project");
      }
    } catch (error) {
      toaster.create({
        title: `Error submitting project: ${error.message}`,
        type: "error",
        duration: 4000,
        action: {
          label: "x",
        },
      });
    }
  };

  const handleCheckboxChange = (value) => {
    setNewProject((prev) => ({
      ...prev,
      tags: prev.tags.includes(value)
        ? prev.tags.filter((tags) => tags !== value)
        : [...prev.tags, value],
    }));
    setHasError(false); // Clear error on any selection
  };
  //const isSubmitEnabled = newProject.tags.length > 0;
  return (
    <form onSubmit={handleSubmit}>
      <div className="share-project-container">
        <div className="sp-info-container">
          <p className="sp-form-header-responsive">Share Your Project</p>
          <div className="sp-info-text-area">
            <p className="sp-info-header">Start Your Journey with Us</p>
            <div className="sp-info-text-responsive">
              <p className="sp-info-text">
                Submit your project and take the next step in your learning
                journey with us. Whether you're looking to refine your skills or
                showcase your progress, we're here to guide you through each
                stage, helping you turn your ideas into impactful solutions.
              </p>
            </div>
            <img
              className="thumbs-up"
              src="./images/thumbs-up.svg"
              alt="thumbs-up"
            ></img>
          </div>
        </div>

        <div className="sp-form-container">
          <p className="sp-form-header">Share Your Project</p>
          <Field
            marginTop="36px"
            label={<span style={{ fontSize: "20px" }}>Project Title</span>}
            required
            errorText="This field is required"
          >
            <Input
              marginTop="20px"
              width="100%"
              height="52px"
              backgroundColor="rgba(255, 255, 255, 0.16)"
              placeholder="Enter your Project"
              borderRadius="8px"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
            />
          </Field>
          <Field
            marginTop="36px"
            label={<span style={{ fontSize: "20px" }}>Description</span>}
            required
            helperText="Max 500 characters."
          >
            <Textarea
              variant="subtle"
              marginTop="20px"
              width="100%"
              height="212px"
              backgroundColor="rgba(255, 255, 255, 0.16)"
              placeholder="Why did you develop this project?"
              borderRadius="8px"
              border="2px solid white"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />
          </Field>
          <Fieldset.Root>
            <CheckboxGroup
              key={newProject.tags.length}
              defaultValue={newProject.tags}
              name="framework"
            >
              <Fieldset.Legend
                mb="2"
                color="white"
                marginTop="36px"
                marginBottom="20px"
                fontSize="21px"
              >
                Frameworks / Languages
              </Fieldset.Legend>
              <Fieldset.Content gap="16px">
                <Checkbox
                  value="React"
                  colorPalette="cyan"
                  variant="solid"
                  checked={newProject.tags.includes("React")}
                  onChange={() => handleCheckboxChange("React")}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    React
                  </span>
                </Checkbox>
                <Checkbox
                  value="Node.js"
                  colorPalette="green"
                  variant="solid"
                  checked={newProject.tags.includes("Node.js")}
                  onChange={() => handleCheckboxChange("Node.js")}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Node.js
                  </span>
                </Checkbox>
                <Checkbox
                  value="HTML / CSS"
                  colorPalette="purple"
                  variant="solid"
                  checked={newProject.tags.includes("HTML / CSS")}
                  onChange={() => handleCheckboxChange("HTML / CSS")}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    HTML / CSS
                  </span>
                </Checkbox>
              </Fieldset.Content>
            </CheckboxGroup>
          </Fieldset.Root>
          <Field
            marginTop="36px"
            label={
              <span style={{ fontSize: "20px" }}>Github Repository URL</span>
            }
            required
            errorText="This field is required"
          >
            <Input
              marginTop="20px"
              width="100%"
              height="52px"
              backgroundColor="rgba(255, 255, 255, 0.16)"
              placeholder="Enter your Github repository URL"
              borderRadius="8px"
              value={newProject.github_link}
              onChange={(e) =>
                setNewProject({ ...newProject, github_link: e.target.value })
              }
            />
          </Field>
          <Field
            marginTop="36px"
            label={
              <span style={{ fontSize: "20px" }}>Live Demo URL (Optional)</span>
            }
            errorText="This field is required"
          >
            <Input
              marginTop="20px"
              width="100%"
              height="52px"
              backgroundColor="rgba(255, 255, 255, 0.16)"
              placeholder="Enter your Live Demo URL (Optional)"
              borderRadius="8px"
              value={newProject.youtube_video_link}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  youtube_video_link: e.target.value,
                })
              }
            />
          </Field>
          <Field marginBottom={"20%"} marginTop={10}>
            <Stack direction="row" h="20">
              <Button
                className="sp-button"
                variant="solid"
                type="submit"
                //disabled={!isSubmitEnabled}
              >
                SUBMIT PROJECT
              </Button>
              <Link
                style={{ fontSize: "20px", color: "#63E9EE", padding: "40px" }}
                href="/explore-project"
              >
                Go to explore projects <LuExternalLink />
              </Link>
            </Stack>
          </Field>
          <Toaster />
        </div>
      </div>
      <img className="ctd-logo" src="./images/ctd-logo.png"></img>
    </form>
  );
};

export default ShareAProject;
