import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../ContextApi";
import { messages } from "../../../utils/messages";
import { RouteNames } from "../../../router/RouteNames";
import PopUpModel from "../../common/PopUpModel";
import { endPoints } from "../../../api/endPoints";

const { REST_API, HOST_URL } = endPoints;

function Registration() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(messages.validation.requiredName),
    email: Yup.string()
      .email(messages.validation.invalidEmail)
      .required(messages.validation.requiredEmail),
    password: Yup.string()
      .min(8, messages.validation.minimumPassword)
      .required(messages.validation.requiredPassword),
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    axios
      .post(`${HOST_URL}${REST_API.Account.Register}`, {
        username: values.name,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        setIsLoading(false);
        setAuth(response.data.jwt);
        setIsError(true);
        navigate(RouteNames.HomePage);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(messages.showErrorMessage.postData, error);
      });
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="flex justify-center items-center h-screen pb-12">
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="w-full max-w-md">
              <h2 className="text-xl font-bold text-center mb-6">
                Create an account
              </h2>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <Field
                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                      errors.name && touched.name ? "border-red-500" : ""
                    } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>

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
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="email"
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

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  onClick={openModal}
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
                    <span>Sign Up</span>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {isError && (
          <PopUpModel
            isOpen={isOpen}
            closeModal={closeModal}
            title={"Registration Invalid"}
            text={messages.validation.invalid}
          />
        )}
      </>
    </div>
  );
}

export default Registration;
