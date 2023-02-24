import React from 'react';
import { NavLink } from 'react-router-dom';
import { RouteNames } from '../../router/RouteNames';
import { useAuthContext } from '../ContextApi';
import { useNavigate } from "react-router-dom";

const HeaderView = () => {
  const navigate = useNavigate();
  const { auth,setAuth} = useAuthContext();

  const handleLogout = ()=>{
    setAuth(null);
    navigate('/login')
  }
    return (
        <nav className="bg-gray-800 px-4 py-4">
          <div className="container mx-auto flex justify-between items-center">
            <NavLink to={RouteNames.HomePage} className="text-gray-100 font-bold">CX PROJECT</NavLink>
            
            <ul className="flex">
              <li className="mr-6">
              <NavLink to={RouteNames.HomePage} className="text-gray-100 hover:text-gray-300">
                Home
              </NavLink>
              </li>
              <li className="mr-6">
                <NavLink to={RouteNames.CreateTask} className="text-gray-100 hover:text-gray-300">
                    Create Project
                </NavLink>
              </li>
              <li className="mr-6">
                <NavLink to={RouteNames.Contact} className="text-gray-100 hover:text-gray-300">
                Contact
                </NavLink>
              </li>
              {auth ? <li className="mr-6">
                <button onClick={handleLogout} className="text-gray-100 hover:text-gray-300">
                Logout
                </button>
              </li> : <li className="mr-6">
                <NavLink to={RouteNames.Register} className="text-gray-100 hover:text-gray-300 mr-6">
                Register
                </NavLink>
                <NavLink to={RouteNames.Login} className="text-gray-100 hover:text-gray-300">
                Login
                </NavLink>
              </li>}
            </ul>
          </div>
        </nav>
      );
}

export default HeaderView;