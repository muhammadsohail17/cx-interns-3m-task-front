const HOST_URL = "http://localhost:1337/api/";

export const endPoints = {
  HOST_URL,
  REST_API: {
    Account: {
      LogIn: "auth/local",
      Register: "auth/local/register",
    },
    Projects: {
      CreateProject: "tasks",
      UpdateProject: "tasks/",
      GetProjectDetail: "tasks/",
      DeleteProject: "tasks/",
      GetSelectedProject: "tasks?",
      UpdateStatus: "tasks/",
    },
  },
};
