import React from 'react';
import { BrowserRouter as Router, Route, Routes as AppRoutes } from "react-router-dom";
import { RouteNames } from './RouteNames';

//import pages and layouts
import Homepage from "../pages/Homepage";
import ReviewDetails from "../pages/ReviewDetails";
import Contact from "../pages/Contact";
import HeaderView from "../components/common/HeaderView";
import FooterView from '../components/common/FooterView';
import Registration from '../components/accounts/registration/Registration';
import Login from '../components/accounts/login/Login';


const Routes = () => {
  return (
    <Router>
    <div className='routes'>
        <HeaderView/>
        <AppRoutes>
            <Route exact path={RouteNames.HomePage} element={<Homepage/>}/>
            <Route path={RouteNames.ReviewDetails} element={<ReviewDetails/>}/>
            <Route path={RouteNames.Contact} element={<Contact/>}/>
            <Route path={RouteNames.Registration} element={<Registration/>}/>
            <Route path={RouteNames.Login} element={<Login/>}/>
        </AppRoutes>
        <FooterView/>
    </div>
    </Router>
  )
}

export default Routes;