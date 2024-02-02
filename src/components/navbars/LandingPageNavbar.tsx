import "./LandingPageNavbar.css";
import logo from "../../img/recipe-bro.png";
import {Link} from "react-router-dom";

function LandingPageNavbar() {
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
						<Link to={"/login"}><span className="h4">Login</span></Link>
						<Link to={"/register"}><span className="h4">Register</span></Link>
						<Link to={"/about"}><span className="h4">About</span></Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default LandingPageNavbar;
