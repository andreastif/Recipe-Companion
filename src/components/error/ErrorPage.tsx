import { Link } from "react-router-dom";

function ErrorPage() {
    return (
            <div>
                <div>
                    <div>Oops!</div>
                    <p>
                        Nothing to see here, page doesnt exists 😒
                    </p>
                </div>
                <div>
                    <Link to="/">
                        Go Back
                    </Link>
                </div>
            </div>
    );
}

export default ErrorPage;