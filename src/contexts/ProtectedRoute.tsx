import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";
import {AuthProviderProps} from "./AuthContext.tsx";
import React, {useEffect, useState} from "react";
import {Triangle} from "react-loader-spinner";

const ProtectedRoute: React.FC<AuthProviderProps> = ({ children }) => {
    const { user } = useAuth(); // Current Logged in User
    const [isPending, setIsPending] = useState(true); // State to manage the delay

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPending(false); // Remove the delay after 1 second
        }, 1000);

        return () => clearTimeout(timer); // Cleanup the timer
    }, []);

    // If still pending, don't render anything or show a loader
    if (isPending) {
        return (
            <div className="my-5">
                <div className="loader gap-4">
                    <Triangle
                        height={100}
                        width={100}
                        color="#FFF"/>
                    <div>Authenticating...</div>
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
