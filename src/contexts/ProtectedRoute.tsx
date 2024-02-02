import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";
import {AuthProviderProps} from "./AuthContext.tsx";
import React from "react";
import {Triangle} from "react-loader-spinner";

const ProtectedRoute: React.FC<AuthProviderProps> = ({ children }) => {
    const { user, loading } = useAuth(); // Current Logged in User

    // If still pending, don't render anything or show a loader
    if (loading) {
        return (
            <div className="my-5">
                <div className="loader gap-4">
                    <Triangle
                        height={100}
                        width={100}
                        color="#FFF"/>
                    <div>Loading...</div>
                </div>
            </div>
        )
    }

    // After the delay, check user authentication
    if (!user) {
        return <Navigate to={"/login"}/>;
    } else {
        return children;
    }

};

export default ProtectedRoute;
