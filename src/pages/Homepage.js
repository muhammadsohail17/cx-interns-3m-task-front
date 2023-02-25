import React, { useState, useEffect,  } from 'react';
import { useNavigate, useParams  } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';
import { projectList } from '../utils/common';



const Homepage = () => {
    const [requirements, setRequirements] = useState([]);
    // const [projects, setProjects] = useState([]);
 
    const [selectedProject, setSelectedProject] = useState('');
    const [data, setData] = useState([]);
  
    // Define initial state for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [requirementsPerPage] = useState(5);

    const navigate = useNavigate();
    let { projectId } = useParams();

    const getData = () => {
      const query = qs.stringify({
        filters: {
          Project: {
            $contains: selectedProject
          },
        },
      }, {
        encodeValuesOnly: true, // prettify URL
      });

      axios
        .get(`http://localhost:1337/api/tasks?${query}`)
        .then(response => {
            const success = response.data.data;
            setData(success);
        })
        .catch(error => {
          console.log('Error fetching data from API:', error);
        })
    }
  
    //Load data from API when component mounts
    useEffect(() => {
      getData();
    }, [selectedProject]);
  
  
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

    const handleEdit = (id)=> {
      navigate(`/update-project/${id}`)
    }

    const handleDelete = (id) => {
    axios
        .delete(`http://localhost:1337/api/tasks/${id}`)
        .then(response => {
            const success = response.data;
            if(success){
              getData();
            } else {
                console.log("Error Updating data:', error");
            }
        });
    }

    const onRowItemClick = (event, requirement) => {
      navigate('/projectdetails', {data:requirement})
      
    }

    const handleSubmit = (data) => {

      axios
        .put(`http://localhost:1337/api/tasks/${data.id}`,{data: {...data.attributes}},
        )
        .then(response => {
            const success = response.data;
            if(success){
              getData();
            } else {
                console.log("Error Updating data:', error");
            }
        });
    };

    return (
      <>
        <header>
          <h1 className="px-4 py-6 font-bold">projects</h1>
        </header>
  
        <main>
  
          {/* Filter by project */}
          <div className='float-right px-10 py-6'>
            <label htmlFor="projectSelect" className='font-bold mx-4'>Filter by project:</label>
            <select
              id="projectSelect"
              value={selectedProject}
              onChange={e => handleSelectProject(e.target.value)}
            >
              <option value="">Select a project</option>
              {projectList.map(project => (
                <option key={project} value={project}>
                  <span className='text-capitalize'>{project}</span>
                </option>
              ))}
            </select>
          </div>
  
          {/* Requirements table */}
        <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Project</th>
            <th className="border px-4 py-2">Content</th>
            <th className="border px-4 py-2">DueDate</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white text-center">
          {data.map(requirement => (
            <tr key={requirement.id} onClick={(event) => onRowItemClick(event, requirement)} >
              <td className="border px-4 py-2">{requirement.id}</td>
              <td className="border px-4 py-2">{requirement.attributes.Title}</td>
              <td className="border px-4 py-2">
                <select
                  value={requirement.attributes.Status}
                  onClick={(e)=> {e.stopPropagation()}}
                  onChange={e => handleSubmit({...requirement,attributes:{...requirement.attributes, Status:e.target.value}})}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              {/* <td>{projects.find(project => project.id === requirement.projectId)?.name}</td> */}
              <td className="border px-4 py-2">{requirement.attributes.Project}</td>
              <td className="border px-4 py-2">{requirement.attributes.Content}</td>
              <td className="border px-4 py-2">{requirement.attributes.Duedate}</td>
              <td className="border px-4 py-2">
                <button className="bg-gray-800 hover:text-gray-300 text-gray-100 py-2 px-4 mx-2 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(requirement.id);
                }}
                >Edit</button>
                <button className='bg-gray-800 hover:text-gray-300 text-gray-100 py-2 px-4 rounded'
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(requirement.id);
                }}
                >Delete</button>
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