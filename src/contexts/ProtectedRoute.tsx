import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";
import {AuthProviderProps} from "./AuthContext.tsx";
import React, {useEffect, useState} from "react";

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
        return <div>Authenticating...</div>; // or a loader component if you prefer
    }

    // After the delay, check user authentication
    if (!user) {
        return <Navigate to={"/"} />;
    } else {
        return children;
    }

};

export default ProtectedRoute;