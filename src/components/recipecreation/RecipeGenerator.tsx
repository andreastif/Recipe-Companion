import LoggedInNav from "../navbars/loggedin/LoggedInNav.tsx";
import './RecipeGenerator.css'
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../hooks/useAuth.tsx";
import Select from "react-select";
import {languageOptions, measurementOptions, RecipeForm} from "./utils/RecipeGeneratorSelectUtils.ts";
import {ReactSelectFormStyles} from "./utils/ReactSelectFormStyles.ts";
import {RecipeData} from "./utils/RecipeGeneratorUtils.ts";
import LoadingSpinner from "../spinner/LoadingSpinner.tsx";


const RecipeGenerator = () => {
    const {recipe, setRecipe} = useAuth();
    const [recipeForm, setRecipeForm] = useState<RecipeForm>({
        measurement: {value: "METRIC", label: "Metric"},
        language: {value: "SWEDISH", label: "Swedish"},
        ingredients: ""
    })
    const [isLoading, setIsLoading] = useState(false);

    const createRecipe = async (data: RecipeData) => {
        try {
            return await axios.post("api", data);
        } catch (e) {
            console.warn(e)
        }
    };

    const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const response = await createRecipe({
                ingredients: recipeForm.ingredients as string,
                language: recipeForm.language?.value as string,
                measurement: recipeForm.measurement?.value as string
            });
            setRecipe(response?.data)
            setIsLoading(false)
        } catch (e) {
            console.warn(e);
            setIsLoading(false)
        }
    }

    const handleSetRecipeForm = (input: any, identifier: string) => {
        if (input && 'target' in input && input.target instanceof HTMLInputElement) {
            setRecipeForm((prevState) => ({
                ...prevState,
                [identifier]: input.target.value,
            }));
        } else {
            setRecipeForm((prevState) => ({
                ...prevState,
                [identifier]: input,
            }));
        }
        console.log(recipeForm)
    }

    useEffect(() => {

    }, [isLoading])
    return (
        <>
            <LoggedInNav/>
            {isLoading ? <LoadingSpinner/>:
                <div className="recipe-container">
                    <div className="format-recipe-screen">
                        <div>
                            <form className="recipe-form-input-group" onSubmit={handleOnSubmit}>

                                <div className="select-group">
                                    <Select
                                        className="select-input"
                                        options={measurementOptions}
                                        onChange={(option) => handleSetRecipeForm(option, "measurement")}
                                        styles={ReactSelectFormStyles}
                                        placeholder={"Measurement"}
                                        value={recipeForm.measurement}
                                        defaultValue={{value: "METRIC", label: "Metric"}}
                                    />
                                    <Select
                                        className="select-input"
                                        options={languageOptions}
                                        onChange={(option) => handleSetRecipeForm(option, "language")}
                                        styles={ReactSelectFormStyles}
                                        placeholder={"Language"}
                                        value={recipeForm.language}
                                        defaultValue={{value: "ENGLISH", label: "English"}}
                                    />
                                </div>
                                <input
                                    className="ingredients-input"
                                    value={recipeForm.ingredients}
                                    onChange={(input) => handleSetRecipeForm(input, "ingredients")}
                                    placeholder="Enter your ingredients">
                                </input>
                                <button
                                    // disabled={true}
                                    className="btn btn-secondary"
                                >Create Recipe
                                </button>
                            </form>
                        </div>
                        {recipe &&
                            <div className="my-4 recipe-box-shadow recipe-grouping">
                                <div className="title-container">
                                    <h2 id="title-header">{recipe?.title}</h2>
                                </div>
                                <div className="mb-4 mt-3">
                                    <h4 className="py-1">Description</h4>
                                    <div className="font-formatting" id="description-container">
                                        {recipe?.description}
                                    </div>
                                </div>
                                <div className="my-4">
                                    <h4 className="py-1">Ingredients</h4>
                                    <div className="font-formatting">
                                        <ul>
                                            {recipe?.ingredients.map((ingredient, index) => {
                                                return <li key={index} className="py-1">{ingredient}</li>
                                            })}</ul>
                                    </div>
                                </div>
                                <div className="my-4">
                                    <div className="font-formatting">
                                        <h4 className="py-1">Steps</h4>
                                        <ol>
                                            {recipe?.steps.map((step, index) => {
                                                return <li key={index} className="py-1">{step}</li>
                                            })}</ol>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default RecipeGenerator;