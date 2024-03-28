import "./Profile.css";
import { useAuth } from "../../hooks/useAuth.tsx";
import { useState } from "react";

function Profile() {
  const { user, resendEmailVerification } = useAuth();
  const [isNotClicked, setIsNotClicked] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleIsNotClicked = async (value: boolean) => {
    setIsNotClicked(value);
    try {
      await resendEmailVerification(user!);
      startVerificationCheck();
    } catch (error) {
      console.error("FAILED TO SEND VERIFICATION EMAIL", error);
      setIsError(true);
    }
  };

  const startVerificationCheck = () => {
    const intervalId = setInterval(async () => {
      await user?.reload();
      if (user?.emailVerified) {
        console.log("Email verified");
        clearInterval(intervalId);
        window.location.reload();
      }
    }, 5000);
    return () => clearInterval(intervalId);
  };

  return (
    <>
      <div className="profile-grouping-container mt-5">
        <div className="format-input-screens">
          <div className="border border-white error-box-shadow rounded profile-container">
            <div className="my-2">
              Hello <span id="email-span">{user?.email}</span>
            </div>
            {user?.emailVerified ? (
              <div className="my-4">
                You have <strong style={{ color: "lightgreen" }}>verified</strong> your email 🎉
              </div>
            ) : (
              <div>
                {isNotClicked ? (
                  <div>
                    <div className="verification-text">
                      <div className="mt-4">
                        <strong className="text-danger">Verify</strong> your email to get full access
                      </div>
                      <div className="mb-4">
                        Check your email for your verification link or click the button below to get a new verification
                        one
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-secondary" onClick={() => handleIsNotClicked(!isNotClicked)}>
                        Resend verification
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {isError ? (
                      <div className="my-2">An unexpected error occured. Try again later.</div>
                    ) : (
                      <div className="my-4 pb-1">
                        <div className="my-2">
                          <span style={{ color: "lightgreen" }}>Success!</span> We've just sent you an email
                        </div>
                        <div>
                          Check your inbox and follow the attached instructions! When you've verified your email, this
                          page will automatically reload. If the page has not reloaded, try logging in again.
                        </div>
                      </div>
                    )}
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
