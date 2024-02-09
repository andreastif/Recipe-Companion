import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";

const ProtectedRoute = () => {
    const { user } = useAuth(); // Current Logged in User


    // https://reactrouter.com/en/main/components/outlet -> uses outlet instead of prop drilling the children into the route
    if (!user) {
        return <Navigate to={"/login"}/>;
    } else {

        return <Outlet />; //replaces old 'children'
    }

};

export default ProtectedRoute;
