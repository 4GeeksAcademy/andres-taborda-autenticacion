import React, { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom"

export const PublicRoutes = ({token}) => {
    return token ? <Navigate to="/home" /> : <Outlet />;
}