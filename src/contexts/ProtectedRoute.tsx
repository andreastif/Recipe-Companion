import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";
import {AuthProviderProps} from "./AuthContext.tsx";
import React from "react";

const ProtectedRoute: React.FC<AuthProviderProps> = ({ children }) => {
    const { user } = useAuth(); // Current Logged in User

    // Om man inte är inloggad redirect Login sidan
    if (!user) {
        return <Navigate to={"/"} />;
    }

    // Annars return sidan
    return children
};

export default ProtectedRoute;