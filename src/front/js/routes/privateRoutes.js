import React, { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoute = ({token}) => {
    return !token ? <Navigate to="/" /> : <Outlet />;
}