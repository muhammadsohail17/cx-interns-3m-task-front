import React from 'react';
import { NavLink } from 'react-router-dom';
import { RouteNames } from '../../router/RouteNames';

const HeaderView = () => {
    return (
        <nav className="bg-gray-800 px-4 py-4">
          <div className="container mx-auto flex justify-between items-center">
            <NavLink to={RouteNames.HomePage} className="text-gray-100 font-bold">CX TASK</NavLink>
            
            <ul className="flex">
              <li className="mr-6">
              <NavLink to={RouteNames.HomePage} className="text-gray-100 hover:text-gray-300">
                Home
              </NavLink>
              </li>
              <li className="mr-6">
                <NavLink to={RouteNames.ReviewDetails} className="text-gray-100 hover:text-gray-300">
                    ReviewDetails
                </NavLink>
              </li>
              <li className="mr-6">
                <NavLink to={RouteNames.Contact} className="text-gray-100 hover:text-gray-300">
                Contact
                </NavLink>
              </li>
              <li>
                <NavLink to={RouteNames.Login} className="text-gray-100 hover:text-gray-300">
                Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      );
}

export default HeaderView;