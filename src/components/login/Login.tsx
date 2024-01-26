import "./Login.css"
import {ChangeEvent, FormEvent, useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useRedirectIfSignedIn} from "../../hooks/useRedirectIfSignedIn.tsx";

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
        <>
            <div>
                <div>
                    <h1 className="text-2xl font-semibold py-2">Login</h1>
                    <p>
                        Dont have an account?{" "}
                        <Link to="/register">
                            Register
                        </Link>
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email"
                                   className="form-control"
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   name="email"
                                   value={form.email}
                                   onChange={handleFormControlChange}
                            />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password"
                                   className="form-control" id="exampleInputPassword1"
                                   name="password"
                                   value={form.password}
                                   onChange={handleFormControlChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    {hasError && (
                        <div className="text-danger fw-semibold my-4">
                            Wrong credentials 😒
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Login;
