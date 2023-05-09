import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { projectList } from "../utils/constants";
import { RouteNames } from "../router/RouteNames";
import PopUpModel from "../components/common/PopUpModel";
import TagsInput from "../components/common/TagsInput";
import { messages } from "../utils/messages";
import { endPoints } from "../api/endPoints";

const { REST_API, HOST_URL } = endPoints;

const Homepage = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Define initial state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [requirementsPerPage] = useState(5);

  const navigate = useNavigate();

  const getData = () => {
    const query = qs.stringify(
      {
        filters: {
          Project: {
            $contains: selectedProject,
          },
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    axios
      .get(`${HOST_URL}${REST_API.Projects.GetSelectedProject}${query}`)
      .then((response) => {
        const success = response.data.data;
        setData(success);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  //Load data from API when component mounts
  useEffect(() => {
    getData();
  }, [selectedProject]);

  // Define function to handle project selection
  const handleSelectProject = (projectId) => {
    setSelectedProject(projectId);
    setCurrentPage(1); // reset pagination to first page
  };

  // Calculate the index of the last requirement on the current page
  const lastIndex = currentPage * requirementsPerPage;

  // Calculate the index of the first requirement on the current page
  const firstIndex = lastIndex - requirementsPerPage;

  // Get the requirements for the current page
  const currentRequirements = data.slice(firstIndex, lastIndex);

  // Filter the requirements by the selected project, if one has been selected
  const filteredRequirements = selectedProject
    ? currentRequirements.filter(
        (requirement) => requirement.projectId === selectedProject
      )
    : currentRequirements;

  // Calculate the total number of pages based on the number of requirements and requirements per page
  const totalPages = Math.ceil(data.length / requirementsPerPage);

  // Define an array of page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  //onRowItemClick
  const onRowItemClick = (requirement) => {
    navigate(RouteNames.ProjectDetails, { data: requirement });
  };

  const handleEdit = (id) => {
    navigate(`/update-project/${id}`);
  };
  const handleRequirement = (id) => {
    navigate(`/project-requirements/${id}`);
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    axios
      .delete(`${HOST_URL}${REST_API.Projects.DeleteProject}${id}`)
      .then((response) => {
        const success = response.data;
        if (success) {
          setIsLoading(false);
          getData();
        } else {
          setIsError(true);
          console.log("Error deleting data:', error");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };

  const handleChangeStatus = (data) => {
    axios
      .put(`${HOST_URL}${REST_API.Projects.UpdateStatus}${data.id}`, {
        data: { ...data.attributes },
      })
      .then((response) => {
        const success = response.data;
        if (success) {
          getData();
        } else {
          console.log("Error Updating data:', error");
        }
      });
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Header*/}
      <header>
        <h1 className="px-4 py-6 font-bold">Projects</h1>
      </header>
      {/*tag input*/}
      <TagsInput />

      <main className="h-screen">
        {/* Filter by project */}
        <div className="float-right px-10 py-6">
          <label htmlFor="projectSelect" className="font-bold mx-4">
            Filter by project:
          </label>
          <select
            id="projectSelect"
            value={selectedProject}
            onChange={(e) => handleSelectProject(e.target.value)}
          >
            <option value="">Select a project</option>
            {projectList.map((project) => (
              <option key={project} value={project}>
                <span className="text-capitalize">{project}</span>
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
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white text-center">
            {data.map((requirement) => (
              <tr
                key={requirement.id}
                onClick={() => {
                  onRowItemClick(requirement);
                  handleRequirement(requirement.id);
                }}
              >
                <td className="border px-4 py-2">{requirement.id}</td>
                <td className="border px-4 py-2">
                  {requirement.attributes.Title}
                </td>
                <td className="border px-4 py-2">
                  <select
                    value={requirement.attributes.Status}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={(e) =>
                      handleChangeStatus({
                        ...requirement,
                        attributes: {
                          ...requirement.attributes,
                          Status: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>

                <td className="border px-4 py-2">
                  {requirement.attributes.Project}
                </td>
                <td className="border px-4 py-2">
                  {requirement.attributes.Content}
                </td>
                <td className="border px-4 py-2">
                  {requirement.attributes.Duedate}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-gray-800 hover:text-gray-300 text-gray-100 py-2 px-4 mx-2 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(requirement.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-gray-800 hover:text-gray-300 text-gray-100 py-2 px-4 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal();
                      handleDelete(requirement.id);
                    }}
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 016 12H2c0 2.981 1.655 5.597 4 6.975V17zm10-5.291a7.962 7.962 0 01-2 5.291v-1.725c1.345-.378 2.3-1.494 2.4-2.766h-2.4zm-8-3.518v1.725c-1.345.378-2.3 1.494-2.4 2.766h2.4A7.962 7.962 0 016 11.709z"
                        ></path>
                      </svg>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/*pagination*/}

        <div className="flex justify-center items-center space-x-2 mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`py-2 px-4 border ${
                number === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
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
            Showing {filteredRequirements.length} requirements on page{" "}
            {currentPage} of {totalPages}
          </p>
        </div>
      </main>
      {/*Pop-up modal*/}
      {isError && (
        <PopUpModel
          isOpen={isOpen}
          closeModal={closeModal}
          title={"Delete Project"}
          text={messages.showErrorMessage.errorBadRequest}
        />
      )}
    </>
  );
};

export default Homepage;
