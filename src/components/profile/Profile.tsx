import './Profile.css'
import {useAuth} from "../../hooks/useAuth.tsx";

function Profile() {
    const {user} = useAuth();

    return (
        <>
            <div className="container">
                <p>Hello <strong>{user?.email}</strong></p>
                {user?.emailVerified ? <p>You have <strong>verified</strong> your email 🎉</p> :
                    <div>
                        <p><strong className="text-danger">Verify</strong> your email to get full access</p>
                        <p>Check your email for verification link</p>
                    </div>
                }
            </div>
        </>
    );
}

export default Profile;
