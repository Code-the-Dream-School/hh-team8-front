import React, { useEffect, useState } from "react";
import "../styles/ExploreProjects.css";
import { Badge, Button, IconButton, Stack } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "../components/ui/menu";
import { StatRoot, StatValueText } from "../components/ui/stat"
import Comments from "../components/Comments";
import { Toaster, toaster } from "../components/ui/toaster";
import { jwtDecode } from "jwt-decode";

const ExploreProjects = () => {
  const [projects, setProjects] = useState([]);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeProjectOwnerId, setActiveProjectOwnerId] = useState(null);
  const token = JSON.parse(localStorage.getItem("auth"));
  const rawToken = localStorage.getItem("auth");
  const { user_id: userId, username } = rawToken ? jwtDecode(rawToken) : {};

  // Fetch all projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/v1/projects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && Array.isArray(result.data)) {
            const projectsWithLikes = await Promise.all(
              result.data.map(async (project) => {
                const likesResponse = await fetch(
                  `http://localhost:8001/api/v1/likes/${project.project_id}`,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                const likesResult = await likesResponse.json();
                const likeCount = likesResult.success
                  ? likesResult.data.length
                  : 0;
                const isLiked = likesResult.success
                  ? likesResult.data.some((like) => like.user_id === userId)
                  : false;

                return { ...project, isLiked, likeCount };
              })
            );


            setProjects(projectsWithLikes);
          } else {
            console.error("Unexpected response structure:", result);
          }
        } else {
          console.error("Failed to fetch projects:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [token, userId]);

  const openCommentsModal = (projectId, ownerId) => {
    setActiveProjectId(projectId);
    setActiveProjectOwnerId(ownerId);

    setTimeout(() => {
      const triggerButton = document.getElementById("comments-trigger");
      if (triggerButton) {
        triggerButton.click();
      } else {
        console.error("Trigger button not found");
      }
    }, 0);
  };

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/deleteproject/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setProjects((prev) =>
          prev.filter((project) => project.project_id !== projectId)
        );
      } else {
        console.error("Failed to delete project:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const addLike = async (projectId) => {
    if (!token) {
          toaster.create({
            title: "Sign In Required!",
            description: "You must be signed in to like a project.",
            type: "warning",
            duration: 4000,
            action: {
              label: "x",
            },
          });
          return;
        }

    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/addlike/${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const result = await response.json();
      if (response.ok && result.success) {
        // Update the UI immediately after the like is added
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.project_id === projectId
              ? { ...project, isLiked: true, likeCount: project.likeCount + 1 }
              : project
          )
        );
        console.log(`User ${userId} added like to project ${projectId}`);
      } else {
        console.error("Failed to add like:", result.message);
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };
  
  const removeLike = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/removelike/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const result = await response.json();
      if (response.ok && result.success) {
        // Update the UI immediately after the like is removed
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.project_id === projectId
              ? { ...project, isLiked: false, likeCount: project.likeCount - 1 }
              : project
          )
        );
        console.log(`User ${userId} removed like from project ${projectId}`);
      } else {
        console.error("Failed to remove like:", result.message);
      }
    } catch (error) {
      console.error("Error removing like:", error);
    }
  };
  
  const handleLikeToggle = (projectId, isLiked) => {
    if (isLiked) {
      removeLike(projectId);
    } else {
      addLike(projectId);
    }
  };
  

  return (
    <div className="page-wrapper">
    <div className="explore-projects-container">
      <p className="ep-header">Explore Projects</p>
      <div className="projects-grid">
        {projects.map((project, index) => {
          // console.log("Logged-in User ID:", userId);
          // console.log(
          //   `Project ID: ${project.project_id}, Created By: ${project.created_by}`
          // );

          return (
            <div key={index} className="project-tile">
              <div className="project-details">
                <div className="like-comment-details">
                  <Stack>
                    <IconButton className="details-button" variant="unstyled">
                      <MenuRoot>
                        <MenuTrigger asChild>
                          <img
                            className="details-img"
                            src="./images/details.svg"
                            alt="details"
                          ></img>
                        </MenuTrigger>
                        <MenuContent className="menu-content">
                          {Number(userId) === Number(project.created_by) && (
                            <>
                              <MenuItem
                                onClick={() =>
                                  handleDelete(project.project_id)
                                }
                              >
                                Remove
                              </MenuItem>
                              <MenuSeparator />
                            </>
                          )}
                          <MenuItem value="new-txt2" as="a">
                            Report ⚠️
                          </MenuItem>
                        </MenuContent>
                      </MenuRoot>
                    </IconButton>
                    <div className="like-container">
                      <StatRoot className="like-count">
                        <StatValueText>{project.likeCount}</StatValueText>
                      </StatRoot>
                      
                      <IconButton
                        className="like-button"
                        variant="unstyled"
                        onClick={() => handleLikeToggle(project.project_id, project.isLiked)}
                      >
                        <img
                          className="like-img"
                          src={
                            project.isLiked
                              ? "./images/likeed.svg" // Show "liked" icon if already liked
                              : "./images/likee.svg" // Show "like" icon otherwise
                          }
                          alt="like"
                        />
                      </IconButton>
                    </div>
                    
                    <IconButton
                      className="comment-button"
                      variant="unstyled"
                      onClick={() =>
                        openCommentsModal(
                          project.project_id,
                          project.created_by
                        )
                      }
                    >
                      <img
                        className="comments-img"
                        src="./images/comments.svg"
                        alt="comments"
                      ></img>
                    </IconButton>
                  </Stack>
                </div>
                <p
                  className="project-date"
                  style={{ color: "rgba(255, 255, 255, 0.48)" }}
                >
                  {new Date(project.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="project-name">{project.name}</p>
                <p className="ep-username">{project.users.username}</p>
                <div className="framework-badges">
                  {project.tags
                    ?.sort((a, b) => {
                      const order = ["React", "Node.js", "HTML / CSS"];
                      return order.indexOf(a) - order.indexOf(b);
                    })
                    .map((framework) => {
                      let colorPalette = "gray";
                      if (framework === "React") colorPalette = "cyan";
                      else if (framework === "Node.js")
                        colorPalette = "green";
                      else if (framework === "HTML / CSS")
                        colorPalette = "purple";

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
                <div className="tile-buttons">
                  <Button
                    className="live-demo-button"
                    variant="solid"
                    type="button"
                    onClick={() => {
                      const url =
                        project.youtube_video_link.startsWith("http://") ||
                        project.youtube_video_link.startsWith("https://")
                          ? project.youtube_video_link
                          : `https://${project.youtube_video_link}`;
                      console.log("Opening Live Demo URL:", url);
                      window.open(url, "_blank");
                    }}
                    disabled={!project.youtube_video_link}
                  >
                    Live Demo
                    <img
                      className="external-link"
                      src="./images/external-link.svg"
                      alt="thumbs-up"
                    ></img>
                  </Button>
                  <Button
                    className="git-link-button"
                    variant="solid"
                    type="submit"
                  >
                    View on Github
                    <img
                      className="github-link"
                      src="./images/github.svg"
                      alt="github"
                    ></img>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Render Comments Component */}
      {activeProjectId && (
        <Comments
          projectId={activeProjectId}
          userId={userId}
          username={username}
          projectOwnerId={activeProjectOwnerId}
        />
      )}
      <Toaster />
      </div>
      <footer>
      <img className="ctd-logo" src="./images/ctd-logo.png" alt="CTD Logo" />
      </footer>   
    </div>
  );
};

export default ExploreProjects;
