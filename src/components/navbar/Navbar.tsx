import "./Navbar.css";
import logo from "../../img/recipe-bro.png";

function Navbar() {
	return (
		<>
			<div className="bg-img">
				<div className="container">
					<div className="topnav rounded p-4">
						<a href="#">
							<span className="h4">Login</span>
						</a>
						<a href="#">
							<span className="h4">Register</span>
						</a>
						<a href="#">
							<span className="h4">About</span>
						</a>
						<div className="">
							<img
								className="img-fluid"
								width={100}
								height={100}
								src={logo}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Navbar;
