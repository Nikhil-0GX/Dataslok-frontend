import React, { createContext, useState, useContext } from 'react';

const ProjectContext = createContext();

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  /**
   * Select a project
   */
  const selectProject = (project) => {
    setSelectedProject(project);
    // Store in local storage for persistence
    if (project) {
      localStorage.setItem('selected_project', JSON.stringify(project));
    } else {
      localStorage.removeItem('selected_project');
    }
  };

  /**
   * Update projects list
   */
  const updateProjects = (newProjects) => {
    setProjects(newProjects);
  };

  /**
   * Add a project to the list
   */
  const addProject = (project) => {
    setProjects((prev) => [project, ...prev]);
  };

  /**
   * Remove a project from the list
   */
  const removeProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));

    // If removed project was selected, clear selection
    if (selectedProject?.id === projectId) {
      selectProject(null);
    }
  };

  /**
   * Update a project in the list
   */
  const updateProject = (projectId, updates) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...updates } : p))
    );

    // Update selected project if it's the one being updated
    if (selectedProject?.id === projectId) {
      setSelectedProject((prev) => ({ ...prev, ...updates }));
    }
  };

  const value = {
    selectedProject,
    projects,
    selectProject,
    updateProjects,
    addProject,
    removeProject,
    updateProject
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export default ProjectContext;
