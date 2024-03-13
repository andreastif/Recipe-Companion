import LoggedInNav from "../navbars/loggedin/LoggedInNav.tsx";
import './RecipeGenerator.css'
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../hooks/useAuth.tsx";
import Select from "react-select";
import {languageOptions, numberOfServings, RecipeForm} from "./utils/RecipeGeneratorSelectUtils.ts";
import {ReactSelectFormStyles} from "./utils/ReactSelectFormStyles.ts";
import {RecipeData} from "./utils/RecipeGeneratorUtils.ts";
import LoadingSpinner from "../spinner/LoadingSpinner.tsx";
import {useLocation} from 'react-router-dom';
import {postRecipeToMongoDb, RecipeItemMongo} from "../api/recipeApi.ts";
import {User} from "firebase/auth";
import {sweetAlertError, sweetAlertSuccess} from "../../utils/alerts.ts";


const RecipeGenerator = () => {
    const {recipe, setRecipe, fromInspiration, setFromInspiration} = useAuth();
    const [recipeForm, setRecipeForm] = useState<RecipeForm>({
        servings: {value: "4", label: "4 servings"},
        language: {value: "ENGLISH", label: "English"},
        ingredients: ""
    })
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [isRecipeSavedLoading, setIsRecipeSavedLoading] = useState(false);
    const location = useLocation();
    const {user} = useAuth();
    const createRecipe = async (data: RecipeData) => {
        try {
            return await axios.post("api", data);
        } catch (e) {
            console.warn(e)
        }
    };

    const handleOnSubmitToRcApi = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsPageLoading(true)
        try {
            const response = await createRecipe({
                ingredients: recipeForm.ingredients as string,
                language: recipeForm.language?.value as string,
                servings: recipeForm.servings?.value as string
            });
            setRecipe(response?.data)
            setIsPageLoading(false)
        } catch (e) {
            console.warn(e);
            setIsPageLoading(false)
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
    }

    const handleOnClickSaveRecipe = async () => {
        if (recipe && user && user.email) {
            const toBeSavedRecipe: RecipeItemMongo = {
                title: recipe.title,
                description: recipe.description,
                ingredients: recipe.ingredients,
                steps: recipe.steps,
                email: user.email
            }

            await handleSaveRecipeToDb(user, toBeSavedRecipe)
        }
    }

    const handleSaveRecipeToDb = async (user: User, toBeSavedRecipe: RecipeItemMongo) => {
        setIsRecipeSavedLoading(true)
        try {
            await postRecipeToMongoDb(user, toBeSavedRecipe)
            sweetAlertSuccess("New Recipe Saved!", "Enjoy your meal")
        } catch (e) {
            sweetAlertError("Could not save recipe", "Try again later")
            console.warn(e)
        } finally {
            setIsRecipeSavedLoading(false)
        }
    }

    useEffect(() => {

    }, [isPageLoading])

    useEffect(() => {

        if (fromInspiration) {
            const mealName = location.state.meal;

            setIsPageLoading(true)
            createRecipe({
                ingredients: mealName,
                language: "English",
                servings: "4 servings"
            })
                .then(response => {
                    setRecipe(response?.data)

                })
                .catch(e => {
                    console.warn(e)
                })
                .finally(() => {
                    setIsPageLoading(false)
                    setFromInspiration(false)
                })
        }
    }, [location.state, fromInspiration, setFromInspiration, setRecipe]);


    return (
        <>
            <LoggedInNav/>
            {isPageLoading ? <LoadingSpinner/> :
                <div className="recipe-container">
                    <div className="format-recipe-screen">
                        <div>
                            <form className="recipe-form-input-group" onSubmit={handleOnSubmitToRcApi}>

                                <div className="select-group">
                                    <Select
                                        className="select-input"
                                        options={numberOfServings}
                                        onChange={(option) => handleSetRecipeForm(option, "servings")}
                                        styles={ReactSelectFormStyles}
                                        placeholder={"No of servings"}
                                        value={recipeForm.servings}
                                        defaultValue={{value: "4", label: "4 servings"}}
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
                                    placeholder="Enter a recipe and/or some ingredients!">
                                </input>
                                <button
                                    // disabled={true}
                                    className="btn btn-secondary"
                                    style={{textTransform: "uppercase", letterSpacing: "2px"}}
                                >Create Recipe
                                </button>
                            </form>
                        </div>
                        {recipe &&
                            <>
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

                                    {isRecipeSavedLoading ?
                                        <button className="btn btn-secondary"
                                                style={{width: "100%", textTransform: "uppercase", letterSpacing: "2px"}}
                                                type="button" disabled>
                                            <span className="spinner-grow spinner-grow-sm me-2" role="status"
                                                  aria-hidden="true"></span>
                                            <span className="sr-only">Loading...</span>
                                        </button> :
                                        <button
                                            className="btn btn-secondary"
                                            style={{width: "100%", textTransform: "uppercase", letterSpacing: "2px"}}
                                            onClick={handleOnClickSaveRecipe}
                                        >Save Recipe
                                        </button>
                                    }
                                </div>

                            </>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default RecipeGenerator;