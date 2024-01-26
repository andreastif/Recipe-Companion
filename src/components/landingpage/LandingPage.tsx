import "./LandingPage.css"
import logo from "../../img/recipe_bro.png"

function LandingPage() {
    return (
        <div className="landing">
                <img src={logo} alt="Recipe Bro Logo" className="recipe-img w-25 img-fluid rounded-circle shadow" />
                <p className="mt-4">Welcome to Recipe Bro!</p>
                <a
                    className="App-link"
                    href="https://www.recipebro.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Discover Recipes
                </a>
        </div>
    );
}
export default LandingPage;
