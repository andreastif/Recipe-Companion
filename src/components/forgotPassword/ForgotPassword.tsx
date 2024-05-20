import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.tsx";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "@mui/material/Button";

import logo from "../../img/test-icon.png";
import { wideRecipeButtonStyle } from "../inspirationtab/muiStyles.ts";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isNotReset, setIsNotReset] = useState(true);

  // handle Login async, vi POST api
  const handleReset = async () => {
    try {
      await resetPassword(email);
      setIsNotReset(false);
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleReset();
    } catch (e) {
      console.log(e);
    }
    // Reset
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div className="text-center mt-5">
        <div className="mb-4">
          <img className="me-3 img-fluid" width={100} height={100} src={logo} alt="logo" />
        </div>
        <h1 className="text-2xl font-semibold">Reset Password</h1>
        <div>
          <p className="fs-6">
            Go back to{" "}
            <Link className="link-warning link-opacity-75-hover" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center align-content-center mt-5">
        <div className="format-input-screens border border-dark-subtle p-5 rounded bg-gradient">
          {isNotReset ? (
            <form onSubmit={handleSubmit}>
              <div className="">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="d-flex gap-4 pt-4">
                <Button type="submit" variant="contained" sx={wideRecipeButtonStyle()}>
                  Reset
                </Button>
              </div>
            </form>
          ) : (
            <div>
              <p className="fs-6 pb-0 mb-0">
                A link has been sent to your email. Follow the instructions to reset your password.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
