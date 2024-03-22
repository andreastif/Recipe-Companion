import LoggedInNav from "../components/navbars/loggedin/LoggedInNav.tsx";
import {Outlet} from "react-router-dom";


export const LoggedInPage = () => {
    return (
        <>
            <LoggedInNav/>
            <Outlet />
        </>
    )
}

export default LoggedInPage
