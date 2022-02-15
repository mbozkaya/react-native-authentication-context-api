import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = (props) => {
    const [authState, setAuthState] = useState({
        isAuth: false,
    });
    const { children } = props;
    debugger;
    return (<AuthContext.Provider
        value={{
            ...authState,
        }}>
        {children}
    </AuthContext.Provider>);
};

export { AuthProvider, AuthContext };