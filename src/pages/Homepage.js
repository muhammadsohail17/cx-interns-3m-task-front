import React, { useState, useEffect } from 'react';
import { requirements } from '../utils/constants';



const Homepage = () => {
    const [requirements, setRequirements] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
  
    // Define initial state for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [requirementsPerPage] = useState(5);
  
    // Load data from API when component mounts
    useEffect(() => {
      fetchData();
    }, []);
  
    // Fetch requirements and projects data from API
    const fetchData = async () => {
      const requirementsResponse = requirements;
      const requirementsData = await requirementsResponse;
      setRequirements(requirementsData);
  
      const projectsResponse = requirements;
      const projectsData =  projectsResponse;
      setProjects(projectsData);
    };
  
    // Define function to handle status change
    const handleChangeStatus = (requirementId, newStatus) => {
      // Update the status of the requirement with the given ID
      const updatedRequirements = requirements.map(requirement => {
        if (requirement.id === requirementId) {
          requirement.status = newStatus;
        }
        return requirement;
      });
  
      setRequirements(updatedRequirements);
    };
  
    // Define function to handle project selection
    const handleSelectProject = projectId => {
      setSelectedProject(projectId);
      setCurrentPage(1); // reset pagination to first page
    };
  
    // Calculate the index of the last requirement on the current page
    const lastIndex = currentPage * requirementsPerPage;
    // Calculate the index of the first requirement on the current page
    const firstIndex = lastIndex - requirementsPerPage;
    // Get the requirements for the current page
    const currentRequirements = requirements.slice(firstIndex, lastIndex);
  
    // Filter the requirements by the selected project, if one has been selected
    const filteredRequirements = selectedProject
      ? currentRequirements.filter(requirement => requirement.projectId === selectedProject)
      : currentRequirements;
  
    // Calculate the total number of pages based on the number of requirements and requirements per page
    const totalPages = Math.ceil(requirements.length / requirementsPerPage);
  
    // Define an array of page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    // Render the requirements table
    return (
      <>
        <header>
          <h1 className="px-4 py-6 font-bold">projects</h1>
        </header>
  
        <main>
  
          {/* Filter by project */}
          <div className='float-right px-10 py-6'>
            <label htmlFor="projectSelect">Filter by project:</label>
            <select
              id="projectSelect"
              value={selectedProject}
              onChange={e => handleSelectProject(e.target.value)}
            >
              <option value="">All projects</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
  
          {/* Requirements table */}
        <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Project</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredRequirements.map(requirement => (
            <tr key={requirement.id}>
              <td className="border px-4 py-2">{requirement.id}</td>
              <td >{requirement.title}</td>
              <td>
                <select
                  value={requirement.status}
                  onChange={e => handleChangeStatus(requirement.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              <td>{projects.find(project => project.id === requirement.projectId)?.name}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


{/*pagination*/}

<div className="flex justify-center items-center space-x-2 mt-4">
  {pageNumbers.map(number => (
    <button
      key={number}
      className={`py-2 px-4 border ${
        number === currentPage ? "bg-blue-500 text-white" : "bg-white text-black"
      }`}
      onClick={() => setCurrentPage(number)}
      disabled={number === currentPage}
    >
      {number}
    </button>
  ))}
</div>

{/* Display current page and total pages */}

<div className="flex justify-center items-center mt-4">
    <p className="text-sm text-gray-600">
  Showing {filteredRequirements.length} requirements on page {currentPage} of {totalPages}
  </p>
</div>

</main>
</>
)


}

export default Homepage;