import "./Register.css"
import {ChangeEvent, FormEvent, useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useRedirectIfSignedIn} from "../../hooks/useRedirectIfSignedIn.tsx";
import {auth} from "../../firebase/firebaseconfig.ts";
import { sendEmailVerification } from "firebase/auth";
import logo from "../../img/test-icon.png";
import Button from "@mui/material/Button";
import {recipeButtonStyle} from "../inspirationtab/muiStyles.ts";



export type RegisterForm = {
    email: string,
    password: string
}


function Register() {
    // if logged in already redirect dashboard
    useRedirectIfSignedIn();

    const [errorMsg, setErrorMsg] = useState("");
    const [form, setForm] = useState<RegisterForm>({
        email: "",
        password: "",
    })

    // Auth
    const {createUser} = useAuth();


    const handleSendEmailVerification = () => {
        if (auth.currentUser) {
            sendEmailVerification(auth.currentUser);
        }
    }

    // Redirect
    const navigate = useNavigate();

    // async func because we are POSTING to an API at firebase
    const handleRegister = async (credentials: RegisterForm) => {
        setErrorMsg("");
        try {
            await createUser(credentials.email, credentials.password);
            handleSendEmailVerification();
            navigate("/dashboard")
        } catch (error: any) {
            setErrorMsg(error.message);
        }
    };


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const credentials = {
            email: form.email,
            password: form.password,
        }

        await handleRegister(credentials);

        // Reset form
        setForm({
            email: "",
            password: ""
        });

    }


    const handleFormControlChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setForm((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        })
    };


    return (
        <>
            <div className="text-center mt-5">
                <div className="mb-4">
                    <img
                        className="me-3 img-fluid"
                        width={100}
                        height={100}
                        src={logo}
                        alt="logo"
                    />
                </div>
                <h1 className="text-2xl font-semibold">Register</h1>
                <div>
                    <p className="fs-6">
                        Already have an account? {" "}
                        <Link
                            className="link-warning link-opacity-75-hover"
                            to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            <div className="d-flex justify-content-center align-content-center my-5">
                <div className="format-input-screens border border-dark-subtle p-5 rounded bg-gradient">
                    <div className="text-center mb-4">Enter details below</div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email"
                                   className="form-control"
                                   id="exampleInputEmail1"
                                   placeholder="Email.."
                                   required
                                   name="email"
                                   value={form.email}
                                   onChange={handleFormControlChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password"
                                   className="form-control" id="exampleInputPassword1"
                                   name="password"
                                   required
                                   placeholder="Password.."
                                   value={form.password}
                                   onChange={handleFormControlChange}
                            />
                        </div>
                        <Button type="submit" variant="contained" sx={recipeButtonStyle()}>Register</Button>
                    </form>
                    {errorMsg && (
                        <div className="text-danger fw-semibold my-4">
                            {errorMsg.split(":")[1]}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Register;
