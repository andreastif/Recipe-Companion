import "./Navbar.css"

function Navbar() {
    return (
        <>
            <div className="bg-img">
                <div className="container">
                    <div className="topnav rounded p-4">
                        <a href="#">Login</a>
                        <a href="#">Register</a>
                        <a href="#">About</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
