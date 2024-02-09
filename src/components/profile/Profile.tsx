import './Profile.css'
import LoggedInNav from "../navbars/loggedin/LoggedInNav.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";

function Profile() {
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
        <>
            <LoggedInNav/>
            <div className="container">
                <p>Tjena <strong>{user?.email}</strong></p>
                {user?.emailVerified ? <p>Du har <strong>verifierat</strong> din email</p> :
                    <p> Din email är <strong>inte verifierad</strong></p>}
                <p><strong>Senaste inloggning: </strong> {user?.metadata.lastSignInTime}</p>
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
}

export default Profile;