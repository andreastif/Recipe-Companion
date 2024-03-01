import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.tsx";
import {ChangeEvent, FormEvent, useState} from "react";


const ForgotPassword = () => {
    const {resetPassword} = useAuth();
    const [email, setEmail] = useState("");
    const [isNotReset, setIsNotReset] = useState(true)


    // handle Login async, vi POST api
    const handleReset = async () => {
        try {
            await resetPassword(email)
            setIsNotReset(false);
            setEmail("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await handleReset()
        } catch (e) {
            console.log(e)
        }
        // Reset
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setEmail(e.target.value);
    };


    return (
        <div className="d-flex justify-content-center align-content-center">
            <div className="format-input-screens">

                {isNotReset ?
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email"
                                   className="form-control"
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   name="email"
                                   value={email}
                                   onChange={handleEmailChange}
                            />
                        </div>
                        <div className="mt-4 d-flex gap-4">
                            <button type="submit" className="btn btn-secondary">Reset</button>
                        </div>
                    </form> :
                    <div className="my-5">
                        <p>A link has been sent to your email. Follow the instructions to reset your password</p>
                        <Link
                            className="link-info link-opacity-75-hover"
                            to="/login">
                            Go to login
                        </Link>
                    </div>
                }

            </div>
        </div>
    );
}

export default ForgotPassword;