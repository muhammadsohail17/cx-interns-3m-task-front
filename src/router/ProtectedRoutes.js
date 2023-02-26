import React from 'react';
import { RouteNames } from './RouteNames';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../components/ContextApi';


const ProtectedRoutes = () => {
    const { auth } = useAuthContext();
    return auth ? <Outlet/> : <Navigate to={RouteNames.Login} />;
}

export default ProtectedRoutes;