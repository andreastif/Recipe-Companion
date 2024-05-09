import './RecipeGenerator.css'
import {FormEvent, useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import Select from "react-select";
import {languageOptions, numberOfServings, RecipeForm} from "./utils/RecipeGeneratorSelectUtils.ts";
import {ReactSelectFormStyles} from "./utils/ReactSelectFormStyles.ts";
import LoadingSpinner from "../spinner/LoadingSpinner.tsx";
import {useLocation, useNavigate} from 'react-router-dom';
import {createRecipeGpt3_5, createRecipeGpt4, postRecipeToMongoDb, RecipeItemsMongoDto} from "../api/recipeApi.ts";
import {User} from "firebase/auth";
import {sweetAlertError, sweetAlertSuccess} from "../../utils/alerts.ts";
import {ChatGptModel} from "../../utils/modelEnum.ts";


const RecipeGenerator = ({model, saveIsDisabled}: { model: ChatGptModel, saveIsDisabled: boolean }) => {
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
    const navigate = useNavigate();


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
            const toBeSavedRecipe: RecipeItemsMongoDto = {
                photo_url: "",
                title: recipe.title,
                description: recipe.description,
                ingredients: recipe.ingredients,
                steps: recipe.steps,
                tags: recipe.tags,
                email: user.email
            }

            await handleSaveRecipeToDb(user, toBeSavedRecipe)
            navigate("/dashboard"); // TODO Funkar ?
        }
    }

    const handleSaveRecipeToDb = async (user: User, toBeSavedRecipe: RecipeItemsMongoDto) => {
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

    const handleOnSubmitToRcApi = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsPageLoading(true)
        try {
            if (model === ChatGptModel.GPT4) {
                const response = await createRecipeGpt4(user!, {
                    ingredients: recipeForm.ingredients,
                    language: recipeForm.language.value,
                    servings: recipeForm.servings.value,
                });
                setRecipe(response?.data)
            } else {
                const response = await createRecipeGpt3_5({
                    ingredients: recipeForm.ingredients,
                    language: recipeForm.language.value,
                    servings: recipeForm.servings.value,
                });
                setRecipe(response?.data)
            }

        } catch (e) {
            console.warn(e);

        } finally {
            setIsPageLoading(false)
        }
    }

    // run once, on mount
    useEffect(() => {
        //don't add anything here
    }, [isPageLoading])

    //if coming from inspiration page
    useEffect(() => {
        if (fromInspiration) {
            const mealName = location.state.meal;
            setIsPageLoading(true)
            createRecipeGpt4(user!, {
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
    }, [location.state, fromInspiration, setFromInspiration, setRecipe, user]);


    return (
        <>
            {isPageLoading ? <LoadingSpinner/> :
                <div>
                    <div className="text-center my-4">
                        <h1 className="fs-2">Lets get started!</h1>
                        <p>Enter recipe idea or products.</p>
                    </div>
                    <div className="recipe-container">
                        <div className="format-recipe-screen">
                            <div className="border border-dark-subtle bg-gradient p-4 rounded">
                                <form className="recipe-form-input-group gap-3" onSubmit={handleOnSubmitToRcApi}>
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
                                        required
                                        placeholder="Name or products..">
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
                                                    style={{
                                                        width: "100%",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "2px"
                                                    }}
                                                    type="button" disabled>
                                            <span className="spinner-grow spinner-grow-sm me-2" role="status"
                                                  aria-hidden="true"></span>
                                                <span className="sr-only">Loading...</span>
                                            </button> :

                                            <button
                                                className="btn btn-secondary"
                                                style={{
                                                    width: "100%",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "2px"
                                                }}
                                                onClick={handleOnClickSaveRecipe}
                                                hidden={saveIsDisabled}
                                            >Save Recipe
                                            </button>
                                        }

                                    </div>

                                </>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default RecipeGenerator;
