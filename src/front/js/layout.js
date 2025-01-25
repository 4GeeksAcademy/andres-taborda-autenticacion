import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { PublicRoutes } from "./routes/publicRoutes";
import { PrivateRoute } from "./routes/privateRoutes";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const { store } = useContext(Context); 
    const token = store.accsessToken

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="container">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    
                    <Routes>
                        
                        <Route element={<PublicRoutes token={token} />}>
                            <Route element={<Login />} path="/" />
                            <Route element={<Signup />} path="/signup" />
                        </Route>

                        <Route element={<PrivateRoute token={token} />}>
                            <Route element={<Home />} path="/home" />
                        </Route>
                        
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
