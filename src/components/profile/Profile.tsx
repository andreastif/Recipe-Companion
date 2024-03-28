import "./Profile.css";
import { useAuth } from "../../hooks/useAuth.tsx";
import { useState } from "react";

function Profile() {
  const { user, resendEmailVerification } = useAuth();
  const [isNotClicked, setIsNotClicked] = useState(true);

  const handleIsNotClicked = (value: boolean) => {
    setIsNotClicked(value);
    resendEmailVerification(user!);
  };

  return (
    <>
      <div className="error-container mt-5">
        <div className="format-input-screens">
          <div className="border border-white error-box-shadow rounded p-5">
            <p>
              Hello <strong>{user?.email}</strong>
            </p>
            {user?.emailVerified ? (
              <p>
                You have <strong>verified</strong> your email 🎉
              </p>
            ) : (
              <div>
                {isNotClicked ? (
                  <div>
                    <p>
                      <strong className="text-danger">Verify</strong> your email to get full access
                    </p>
                    <p>
                      Check your email for your verification link or click the button below to get a new verification
                      link
                    </p>
                    <div>
                      <button className="btn btn-secondary" onClick={() => handleIsNotClicked(!isNotClicked)}>
                        Resend verification
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="my-2">Email sent</div>
                    <div> Check your inbox and follow the attached instructions!</div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
