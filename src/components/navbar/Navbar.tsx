import "./Navbar.css";

function Navbar() {
  return (
    <>
      <div className="bg-img">
        <div className="container">
          <div className="topnav rounded p-4">
            <a className="h1" href="#">
              <span className="h4">Login</span>
            </a>
            <a href="#">
              <span className="h4">Register</span>
            </a>
            <a href="#">
              <span className="h4">About</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
