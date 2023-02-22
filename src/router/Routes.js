import React from 'react';
import { BrowserRouter as Router, Route, Routes as AppRoutes } from "react-router-dom";
import { RouteNames } from './RouteNames';

//import pages and layouts
import Homepage from "../pages/Homepage";
import ReviewDetails from "../pages/ReviewDetails";
import Category from "../pages/Category";
import HeaderView from "../components/common/HeaderView";
import FooterView from '../components/common/FooterView';


const Routes = () => {
  return (
    <Router>
    <div className='routes'>
        <HeaderView/>
        <AppRoutes>
            <Route exact path={RouteNames.HomePage} element={<Homepage/>}/>
            <Route path={RouteNames.ReviewDetails} element={<ReviewDetails/>}/>
            <Route path={RouteNames.Category} element={<Category/>}/>
        </AppRoutes>
        <FooterView/>
    </div>
    </Router>
  )
}

export default Routes;