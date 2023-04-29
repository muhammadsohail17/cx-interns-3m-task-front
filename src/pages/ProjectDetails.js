import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { endPoints } from "../api/endPoints";

const { REST_API, HOST_URL } = endPoints;

const ProjectDetails = () => {
  const [requirements, setRequirements] = useState([]);

  let { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      axios
        .get(`${HOST_URL}${REST_API.Projects.GetProjectDetail}${projectId}`)
        .then((response) => {
          const responseData = response?.data.data?.attributes;
          setRequirements(responseData?.Requirements || []);
        })
        .catch((error) => {
          console.log("Error fetching data from API:", error);
        });
    }
  }, [projectId]);

  return (
    <div className="container mx-auto py-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">Requirements</h1>
      <ul>
        {requirements.map((requirement, index) => (
          <li key={index} className="text-lg mb-2">
            {requirement}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;
