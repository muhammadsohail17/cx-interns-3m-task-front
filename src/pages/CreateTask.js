import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { projectList } from "../utils/constants";
import { RouteNames } from "../router/RouteNames";

const CreateTask = () => {
  const navigate = useNavigate();
  let { projectId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [project, setProject] = useState("");

  useEffect(() => {
    if (projectId) {
      axios
        .get(`http://localhost:1337/api/tasks/${projectId}`)
        .then((response) => {
          const responseData = response?.data.data?.attributes;
          setTitle(responseData?.Title || "");
          setContent(responseData?.Content || "");
          setDueDate(responseData?.Duedate || "");
          setStatus(responseData?.Status || "");
          setProject(responseData?.Project || "");
        })
        .catch((error) => {
          console.log("Error fetching data from API:", error);
        });
    }
  }, [projectId]);

  const callApi = (formData) => {
    const apiMethod = projectId ? axios.put : axios.post;
    const apiEndpoint = projectId
      ? `http://localhost:1337/api/tasks/${projectId}`
      : "http://localhost:1337/api/tasks";

    return new Promise((resolve, reject) => {
      apiMethod(apiEndpoint, formData, {
        "content-type": "multipart/form-data",
      })
        .then((response) => {
          console.log(response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(new Error("API call failed"));
        });
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      })
    );

    callApi(formData)
      .then((response) => {
        const success = response.data;
        if (success) {
          navigate(RouteNames.HomePage);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="max-w-md mx-auto my-12 h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2 font-bold text-gray-700">
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-4 px-4 rounded"
          >{`${projectId ? "Update" : "Create"}  Task`}</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
