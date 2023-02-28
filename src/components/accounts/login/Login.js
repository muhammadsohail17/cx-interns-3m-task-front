import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../ContextApi";
import { messages } from "../../../utils/messages";
import PopUpModel from "../../common/PopUpModel";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(messages.validation.invalidEmail)
      .required(messages.validation.requiredEmail),
    password: Yup.string().required(messages.validation.requiredPassword),
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    axios
      .post("http://localhost:1337/api/auth/local", {
        identifier: values.email,
        password: values.password,
      })
      .then((response) => {
        const success = response.data;
        setAuth(response.data.jwt);
        setIsLoading(false);
        if (success) {
          navigate("/");
        } else {
          setIsError(true);
          console.log(messages.showErrorMessage.postData);
        }
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
        console.log(messages.showErrorMessage.postData, error);
      });
  };

  const handleCloseError = () => {
    setIsError(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="w-full max-w-md">
              <h2 className="text-xl font-bold text-center mb-6">Login</h2>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Field
                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                      errors.email && touched.email ? "border-red-500" : ""
                    } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Field
                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : ""
                    } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                    <span>Login</span>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {isError && (
          //   <div
          //     id="popup-modal"
          //     tabIndex="-1"
          //     className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
          //   >
          //     <div className="relative w-full h-full max-w-md md:h-auto">
          //       <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          //         <button
          //           type="button"
          //           className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          //           data-modal-hide="popup-modal"
          //         >
          //           <svg
          //             aria-hidden="true"
          //             className="w-5 h-5"
          //             fill="currentColor"
          //             viewBox="0 0 20 20"
          //             xmlns="http://www.w3.org/2000/svg"
          //           >
          //             <path
          //               fillRule="evenodd"
          //               d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          //               clipRule="evenodd"
          //             ></path>
          //           </svg>
          //           <span className="sr-only" onClose={handleCloseError}>
          //             Close modal
          //           </span>
          //         </button>
          //         <div className="p-6 text-center">
          //           <svg
          //             aria-hidden="true"
          //             className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
          //             fill="none"
          //             stroke="currentColor"
          //             viewBox="0 0 24 24"
          //             xmlns="http://www.w3.org/2000/svg"
          //           >
          //             <path
          //               strokeLinecap="round"
          //               strokeLinejoin="round"
          //               strokeWidth="2"
          //               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          //             ></path>
          //           </svg>
          //           <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          //             Are you sure you want to delete this product?
          //           </h3>
          //           <button
          //             data-modal-hide="popup-modal"
          //             type="button"
          //             onClose={handleCloseError}
          //             className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          //           >
          //             Yes, I'm sure
          //           </button>
          //           <button
          //             data-modal-hide="popup-modal"
          //             type="button"
          //             className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          //           >
          //             No, cancel
          //           </button>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          <PopUpModel />
        )}
      </>
    </div>
  );
};

export default Login;
