import './Profile.css'
import LoggedInNav from "../navbars/loggedin/LoggedInNav.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";

function Profile() {
    const {user} = useAuth();

    return (
        <>
            <LoggedInNav/>
            <div className="container">
                <p>Tjena <strong>{user?.email}</strong></p>
                {user?.emailVerified ? <p>Du har <strong>verifierat</strong> din email</p> :
                    <p> Din email är <strong>inte verifierad</strong></p>}
            </div>
        </>
    );
}

export default Profile;