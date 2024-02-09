import "./LandingPage.css"
import LandingPageNavbar from "../navbars/landing/LandingPageNavbar.tsx";

function LandingPage() {
    return (
        <>
            <LandingPageNavbar/>
            <div className="landing">
                <h1 className="mt-4 mb-4">Meet Recipe Companion</h1>
                <p>Your AI-powered kitchen companion! Just enter your ingredients, and it crafts personalized recipes
                    with easy-to-follow steps.</p>
                <p>Elevate your meals effortlessly with Recipe Companion, simplifying your culinary journey with innovative
                    and delicious results</p>
            </div>
        </>
    );
}

export default LandingPage;
