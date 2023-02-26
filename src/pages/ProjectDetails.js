import React,{ useState } from 'react';
import { projects,requirements } from '../utils/constants';


const ProjectDetails = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectChange = (event) => {
      setSelectedProject(parseInt(event.target.value));
    };
  
    const filteredRequirements = requirements.filter((requirement) => {
      return requirement.projectId === selectedProject;
    });

  return (
    <div>
    <label htmlFor="project" className='font-bold mx-4'>Select a project:</label>
    <select id="project" onChange={handleProjectChange}>
      <option value="">Select a project</option>
      {projects.map((project) => (
        <option key={project.id} value={project.id}>
          {project.name}
        </option>
      ))}
    </select>

    <h2 className='font-medium mx-4 my-6'>Requirements for {selectedProject ? projects.find((p) => p.id === selectedProject).name : 'selected project:'}</h2>
    <ul>
      {filteredRequirements.map((requirement) => (
        <li key={requirement.id } className='mx-4'>{requirement.name}</li>
      ))}
    </ul>
  </div>
  )
}

export default ProjectDetails;