import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import AuthForm from "../pages/log-in/AuthForm";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useIsLoggedIn } from "./IsLoggedIn";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

const AppRoutes = () => {
    const { isLoggedIn } = useIsLoggedIn();
    const myRoutes = createBrowserRouter([
        { path: "/login", element: <AuthForm /> },
        
        {
            path: "/",
            element: isLoggedIn ? <Layout /> : <Navigate to="/login" />,
            children: [
                { path: "/", element: <Home /> },
                {
                    path: "/:category",
                    element: <Catalog />,
                    
                },
                { path: "/:category/:id", element: <Detail /> },
                { path: "/:category/search/:keyword", element: <Catalog /> }
            ],
        },
    ]);

    return <RouterProvider router={myRoutes} />;
};

export default AppRoutes;
// return (
//     <Routes>
//         <Route path='/:category/search/:keyword' element={<Catalog />} />
//         <Route path='/:category/:id' element={<Detail />} />
//         <Route path='/:category' element={<Catalog />} />
//         {/* <Route path='/login' element={<AuthForm />} /> */}
//         <Route path='/' element={<Home />} />
//     </Routes>
