import {Link} from "react-router-dom";
import './ErrorPage.css'

function ErrorPage() {
    return (
        <div className="error-container mt-5">
            <div className="format-input-screens">
                <div className="border border-white error-box-shadow rounded p-5">
                    <div className="pt-3">
                        Oops!
                    </div>
                    <div className="pt-3">
                        Nothing to see here, page doesn't exist 😒
                    </div>
                    <div className="pt-3">
                        <Link to="/">
                            Go Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;