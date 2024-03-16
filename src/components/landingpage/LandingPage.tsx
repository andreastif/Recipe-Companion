import "./LandingPage.css"
import LandingPageNavbar from "../navbars/landing/LandingPageNavbar.tsx";
import RecipeGenerator from "../recipecreation/RecipeGenerator.tsx";
import {ChatGptModel} from "../../utils/modelEnum.ts";

function LandingPage() {
    return (
        <>
            <LandingPageNavbar/>
            <div>
                <div className="landing">
                    <div className="my-5">
                        <h1 className="mt-4 mb-3">Meet Recipe Companion</h1>
                        <p>Your AI-powered kitchen companion! Just enter your ingredients, and it crafts personalized
                            recipes
                            with easy-to-follow steps.</p>
                        <p>Elevate your meals effortlessly with Recipe Companion, simplifying your culinary journey with
                            innovative
                            and delicious results</p>
                    </div>
                    <hr/>
                    <div style={{
                        marginTop: "40px",
                        textTransform: "uppercase",
                        fontSize: "20px",
                        letterSpacing: "1px",
                        fontStyle: "italic"
                    }}>try it out!
                    </div>
                </div>
                <RecipeGenerator model={ChatGptModel.GPT3_5} saveIsDisabled={true}/>
                <div className="pe-5 ps-5 text-center" style={{
                    marginBottom: "200px",
                    textTransform: "uppercase",
                    fontSize: "18px",
                    letterSpacing: "1px",
                }}> Register now to save your recipes and get even better results!
                </div>
            </div>

        </>
    );
}

export default LandingPage;
