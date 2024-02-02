import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";
import {AuthProviderProps} from "./AuthContext.tsx";
import React from "react";

const ProtectedRoute: React.FC<AuthProviderProps> = ({ children }) => {
    const { user } = useAuth(); // Current Logged in User

    if (!user) {
        return <Navigate to={"/login"}/>;
    } else {
        return children;
    }

};

export default ProtectedRoute;
