import "./LandingPageNavbar.css";
import logo from "../../img/recipe-bro.png";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.tsx";

function LandingPageNavbar() {
    const {user} = useAuth();

    return (
        <>
            <div className="bg-img">
                <div className="container">
                    <div className="topnav rounded p-4">
                        <div>
                            <img
                                className="img-fluid"
                                width={100}
                                height={100}
                                src={logo}
                            />
                        </div>
                        { !user ? <div>
                            <Link to={"/login"}><span className="h4">Login</span></Link>
                            <Link to={"/register"}><span className="h4">Register</span></Link>
                        </div> : <Link to={"/dashboard"}><span className="h4">Dashboard</span></Link>}
                        <Link to={"/about"}><span className="h4">About</span></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPageNavbar;
