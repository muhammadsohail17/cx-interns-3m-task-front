import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../ContextApi";
import { messages } from "../../../utils/messages";
import { RouteNames } from "../../../router/RouteNames";

function Registration() {
    const navigate = useNavigate();
    const {setAuth} = useAuthContext();
    
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
    axios
  .post('http://localhost:1337/api/auth/local/register',{
   username:values.name, email:values.email, password:values.password
  })
  .then(response => {
    setAuth(response.data.jwt);
    navigate(RouteNames.HomePage)
  })
  .catch(error => {
    console.log(messages.showErrorMessage.postData, error);
  })
  };

  return (
    <div className="flex justify-center items-center h-screen pb-12">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="w-full max-w-md">
            <h2 className="text-xl font-bold text-center mb-6">Create an account</h2>

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
                    errors.password && touched.password ? "border-red-500" : ""
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign up
            </button>
          </div>
            </Form>
        )}
        </Formik>
        </div>
  )
}

export default Registration;
        
