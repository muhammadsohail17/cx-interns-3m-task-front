import React,{ useState } from 'react';
import { projects,requirementForProject } from '../utils/constants';


const ProjectDetails = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectChange = (event) => {
      setSelectedProject(parseInt(event.target.value));
    };
  
    const filteredRequirements = requirementForProject.filter((requirement) => {
      return requirement.projectId === selectedProject;
    });

  return (
    <div>
    <label htmlFor="project">Select a project:</label>
    <select id="project" onChange={handleProjectChange}>
      <option value="">Select a project</option>
      {projects.map((project) => (
        <option key={project.id} value={project.id}>
          {project.name}
        </option>
      ))}
    </select>

    <h2>Requirements for {selectedProject ? projects.find((p) => p.id === selectedProject).name : 'selected project'}</h2>
    <ul>
      {filteredRequirements.map((requirement) => (
        <li key={requirement.id}>{requirement.name}</li>
      ))}
    </ul>
  </div>
  )
}

export default ProjectDetails;