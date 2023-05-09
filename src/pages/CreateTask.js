import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { projectList } from "../utils/constants";
import { RouteNames } from "../router/RouteNames";
import PopUpModel from "../components/common/PopUpModel";
import { messages } from "../utils/messages";
import { endPoints } from "../api/endPoints";
import EmojiPicker from "../components/messageReaction/EmojiPicker";

const { REST_API, HOST_URL } = endPoints;

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [project, setProject] = useState("");
  const [requirements, setRequirements] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  let { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      axios
        .get(`${HOST_URL}${REST_API.Projects.GetProjectDetail}${projectId}`)
        .then((response) => {
          const responseData = response?.data.data?.attributes;
          setTitle(responseData?.Title || "");
          setContent(responseData?.Content || "");
          setDueDate(responseData?.Duedate || "");
          setStatus(responseData?.Status || "");
          setProject(responseData?.Project || "");
          setRequirements(responseData?.Requirements || "");
          setIsLoading(false);
          setIsError(false);
        })
        .catch((error) => {
          setIsError(false);
          setIsLoading(false);
          console.log("Error fetching data from API:", error);
        });
    }
  }, [projectId]);

  const callApi = (formData) => {
    const apiMethod = projectId ? axios.put : axios.post;
    const apiEndpoint = projectId
      ? `${HOST_URL}${REST_API.Projects.UpdateProject}${projectId}` //update
      : `${HOST_URL}${REST_API.Projects.CreateProject}`; //create a new project

    return new Promise((resolve, reject) => {
      apiMethod(apiEndpoint, formData, {
        "content-type": "multipart/form-data",
      })
        .then((response) => {
          resolve(response.data);
          setIsLoading(false);
          setIsError(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          setIsError(true);
          reject(new Error("API call failed"));
        });
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError(false);
    // Send form data to backend here
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        Title: title,
        Content: content,
        Duedate: dueDate,
        Status: status,
        Project: project,
        Requirements: requirements,
      })
    );

    callApi(formData)
      .then((response) => {
        const success = response.data;
        if (success) {
          setIsLoading(false);
          setIsError(false);
          navigate(RouteNames.HomePage);
        } else {
          setIsLoading(false);
          console.log("Error");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (event, index) => {
    const newInputValues = [...requirements];
    newInputValues[index] = event.target.value;
    setRequirements(newInputValues);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleAddEmoji = (emoji) => {
    setTitle(title + emoji);
  };

  return (
    <div className="max-w-md mx-auto my-12 h-screen">
      <>
        <h1 className="text-2xl font-bold mb-4">Create Project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 font-bold text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              className="block w-full border-gray-400 rounded-lg shadow-sm py-2 px-4 mb-2"
            />
            {title && <EmojiPicker onEmojiSelect={handleAddEmoji} />}
          </div>

          <div>
            <label
              htmlFor="content"
              className="block mb-2 font-bold text-gray-700"
            >
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
              className="block w-full border-gray-400 rounded-lg shadow-sm py-2 px-4 mb-2"
            />
          </div>
          <div>
            <label
              htmlFor="requirements"
              className="block mb-2 font-bold text-gray-700"
            >
              Requirements:
            </label>
            {requirements.map((value, index) => (
              <textarea
                key={index}
                type="text"
                id="requirements"
                name="requirements"
                value={requirements}
                onChange={(event) => handleInputChange(event, index)}
                className="block w-full border-gray-400 rounded-lg shadow-sm py-2 px-4 mb-2"
              />
            ))}
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block mb-2 font-bold text-gray-700"
            >
              Due Date:
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="block w-full border-gray-400 rounded-lg shadow-sm py-2 px-4 mb-2"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block mb-2 font-bold text-gray-700"
            >
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="block w-full border-gray-400 rounded-lg shadow-sm py-2 px-4 mb-2"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="project"
              className="block mb-2 font-bold text-gray-700"
            >
              Project:
            </label>
            <select
              id="project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="block w-full border-gray-400 rounded-lg shadow-sm py-2 px-4 mb-2"
            >
              <option value="">Select a project</option>
              {projectList.map((project) => (
                <option key={project} value={project}>
                  <span className="text-capitalize">{project}</span>
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              onClick={openModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-4 px-4 rounded"
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
                `${projectId ? "Update" : "Create"}  Task`
              )}
            </button>
          </div>
        </form>
        {isError && (
          <PopUpModel
            isOpen={isOpen}
            closeModal={closeModal}
            title={"ERR_BAD_REQUEST"}
            text={messages.showErrorMessage.errorBadRequest}
          />
        )}
      </>
    </div>
  );
};

export default CreateTask;
