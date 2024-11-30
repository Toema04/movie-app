import React, { createContext, useContext, useState } from "react";

const IsLoggedInContext = createContext();

const IsLoggedIn = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </IsLoggedInContext.Provider>
    );
};

export default IsLoggedIn;
export const useIsLoggedIn = () => useContext(IsLoggedInContext);
