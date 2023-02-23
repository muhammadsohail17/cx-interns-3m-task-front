import { messages } from "./messages";

export class Common {

    static showErrorMessage(error, title = "Error") {
      let errorMsg = error;
      const { error403, error404, error400 } = messages.validation;
      if (error.message) {
        errorMsg = error.message;
      }
      if (errorMsg === "Unexpected end of JSON input") {
        errorMsg = error404;
      }
      if (errorMsg === "Request failed with status code 400") {
        errorMsg = error400;
      }
      if (errorMsg === "Un-Authorized Access") {
        errorMsg = error403;
      }
    }
  
    static showSuccessMessage(message, title = "Success") {
      this.isIE9() ? alert(message) : alert(title, message);
    }

  }
  

  