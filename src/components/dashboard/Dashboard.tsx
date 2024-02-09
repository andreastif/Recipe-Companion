import "./Dashboard.css"
import {useAuth} from "../../hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import LoggedInNav from "../navbars/loggedin/LoggedInNav.tsx";

function Dashboard() {
    const {user, logout} = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error: any) {
            console.log(error.message);
        }
    };


    return (
        <div>
            <LoggedInNav />
            <p>Tjena <strong>{user?.email}</strong></p>
            {user?.emailVerified ? <p>Du har <strong>verifierat</strong> din email</p> : <p> Din email är <strong>inte verifierad</strong></p>}
            <p><strong>Senaste inloggning: </strong> {user?.metadata.lastSignInTime}</p>
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;
