import LoggedInNav from "../navbars/loggedin/LoggedInNav.tsx";
import './RecipeGenerator.css'
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {useAuth} from "../../hooks/useAuth.tsx";


const RecipeGenerator = () => {
    const [ingredients, setIngredients] = useState<string>("");
    const {recipe, setRecipe , isRecipeFetched, setIsRecipeFetched} = useAuth();

    const createRecipe = async (ingredients: string) => {
        try {
            return await axios.post("api", ingredients);
        } catch (e) {
            console.warn(e)
        }
    };

    const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await createRecipe(ingredients);
            setRecipe(response?.data)
            setIsRecipeFetched(true)
        } catch (e) {
            console.warn(e);
        }
    }

    const handleSetIngredients = (event: ChangeEvent<HTMLInputElement>) => {
        setIngredients(event.target.value);
    }
    return (
        <>
            <LoggedInNav/>
            <div className="recipe-container">
                <div className="format-recipe-screen">
                    <div>            {/*create form */}
                        <form className="recipe-form-input-group" onSubmit={handleOnSubmit}>
                            <input
                                type="text"
                                className="ingredients-input"
                                value={ingredients}
                                onChange={handleSetIngredients}
                                placeholder="Enter your ingredients">
                            </input>
                            <button className="btn btn-secondary">Create Recipe</button>
                        </form>
                    </div>
                    {isRecipeFetched &&
                        <div className="my-4 recipe-box-shadow recipe-grouping">
                            <h2>{recipe?.title}</h2>
                            <div className="my-4">
                                <h4>DESCRIPTION</h4>
                                <div className="font-formatting">
                                    {recipe?.description}
                                </div>
                            </div>
                            <div className="my-4">
                                <h4>INGREDIENTS</h4>
                                <div className="font-formatting">
                                    <ul>
                                        {recipe?.ingredients.map((ingredient) => {
                                            return <li>{ingredient}</li>
                                        })}</ul>
                                </div>
                            </div>
                            <div className="my-4">
                                <div className="font-formatting">
                                    <h4>STEPS</h4>
                                    <ol>
                                        {recipe?.steps.map((step) => {
                                            return <li>{step}</li>
                                        })}</ol>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default RecipeGenerator;