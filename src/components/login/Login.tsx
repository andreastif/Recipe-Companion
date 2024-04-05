import "./Login.css"
import {ChangeEvent, FormEvent, useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useRedirectIfSignedIn} from "../../hooks/useRedirectIfSignedIn.tsx";
import logo from "../../img/test-icon.png";

export type LoginForm = {
    email: string,
    password: string
}


function Login() {
    // if logged in already redirect dashboard
    useRedirectIfSignedIn();

    // states
    const [hasError, setHasError] = useState(false);
    const [form, setForm] = useState<LoginForm>({
        email: "",
        password: "",
    })
    // Auth
    const {login} = useAuth();

    // Redirect
    const navigate = useNavigate();

    // handle Login async, vi POST api
    const handleLogin = async (credentials: LoginForm) => {
        setHasError(false);
        try {
            await login(credentials.email, credentials.password);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            setHasError(true);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const credentials = {
            email: form.email,
            password: form.password,
        }
        await handleLogin(credentials);
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

        <div className="mb-5">
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
                <h1 className="text-2xl font-semibold">Welcome</h1>
                <div>
                    <p className="fs-6">
                        Don't have an account?{" "}
                        <Link
                            className="link-info link-opacity-75-hover"
                            to="/register">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
            <div className="d-flex justify-content-center align-content-center mt-5">
                <div className="format-input-screens border border-dark-subtle p-5 rounded bg-gradient">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email"
                                   className="form-control"
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   placeholder="Email.."
                                   required
                                   name="email"
                                   value={form.email}
                                   onChange={handleFormControlChange}
                            />
                            <div id="emailHelp" className="form-text text-sm-center mt-3">We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className="my-4">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password"
                                   className="form-control" id="exampleInputPassword1"
                                   name="password"
                                   placeholder="Password.."
                                   required
                                   value={form.password}
                                   onChange={handleFormControlChange}
                            />
                        </div>
                        <div className="mt-4 d-flex gap-4">
                            <div>
                                <p id="forgotPassword">
                                    Forgot your {" "}
                                    <Link
                                        className="link-info link-opacity-75-hover"
                                        to="/lostpw">
                                        password?
                                    </Link>
                                </p>
                                <button type="submit" className="btn btn-secondary">Login</button>
                            </div>
                        </div>
                    </form>
                    {hasError && (
                        <div className="text-danger fw-semibold my-4">
                            Wrong credentials 😒
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default Login;
