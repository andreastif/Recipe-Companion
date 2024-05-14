import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";

const LoggedInRoute = () => {
  const { user } = useAuth(); // Current Logged in User

  if (!user) {
    return <Navigate to={"/login"} />;
  } else {
    return <Outlet />; //replaces old 'children'
  }
};

export default LoggedInRoute;
