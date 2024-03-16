import './Profile.css'
import {useAuth} from "../../hooks/useAuth.tsx";

function Profile() {
    const {user} = useAuth();

    return (
        <>
            <div className="container">
                <p>Hej <strong>{user?.email}</strong></p>
                {user?.emailVerified ? <p>Du har <strong>verifierat</strong> din email.</p> :
                    <p> Din email är <strong>inte verifierad</strong></p>}
            </div>
        </>
    );
}

export default Profile;