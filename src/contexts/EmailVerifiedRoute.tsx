import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "../hooks/useAuth.tsx";

// This component wraps any route that requires an email-verified user
export const EmailVerifiedRoute = () => {
    const { user } = useAuth(); // Assuming your user context provides this information

    if (!user?.emailVerified) {
        // Redirect to profile page if the user's email is not verified
        return <Navigate to="/profile" replace />;
    }

    // Display full page
    return <Outlet/>;
};
