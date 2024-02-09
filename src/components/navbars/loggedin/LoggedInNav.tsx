import "./LoggedInNav.css"
import {NavLink} from "react-router-dom";
import logo from "../../../img/test-icon.png"

function LoggedInNav() {
    // https://reactrouter.com/en/main/components/nav-link
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom" data-bs-theme="dark">
                <div className="container-fluid">
                    <div>
                        <img src={logo} alt="logo" className="me-2 img-fluid nav-icon" />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                    Profile
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default LoggedInNav;
