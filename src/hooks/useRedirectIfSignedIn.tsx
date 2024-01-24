import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "./useAuth.tsx";

export function useRedirectIfSignedIn() {
    const { user } = useAuth();

    // Redirect
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user]);
}