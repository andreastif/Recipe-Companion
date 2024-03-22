import './RecipeTab.css'
import RecipeCard from "../cards/RecipeCard.tsx";
import {fetchUserRecipes, RecipeItemMongo, removeRecipeFromMongoDb} from "../api/recipeApi.ts";
import {FormEvent, useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Typography} from "@mui/material";
import {modalRecipeRemoveStyle, modalRecipeStyle} from "./additionalModalStyling.ts";


const RecipeTab = () => {
    const [recipes, setRecipes] = useState<RecipeItemMongo[]>([]);
    const [apiError, setApiError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isMobile = useMediaQuery('(max-width:768px)');
    const [recipeModalOpen, setRecipeModalOpen] = useState(false);
    const [recipeModalVerify, setRecipeModalVerify] = useState(false);
    const [recipeMarkedForRemoval, setRecipeMarkedForRemoval] = useState<RecipeItemMongo>();
    const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null);
    const {user} = useAuth();
    const selectedRecipe = selectedRecipeIndex !== null ? recipes[selectedRecipeIndex] : null;

    //QUICKFIXES SOM MÅSTE LÖSAS:
    //todo: useQuery for fetching data

    //todo: endpoints :
    // #[put("/recipes/{id}")]
    // token, hela objektet förutom ID (som tas av path Variable)
    // ObjectId
    // #[get("/recipes/{id}")]


    const handleRecipeModalOpen = (index: number) => {
        setSelectedRecipeIndex(index);
        setRecipeModalOpen(true);
    };

    const handleSetRecipeModalVerify = (recipeItemMongo: RecipeItemMongo) => {
        setRecipeMarkedForRemoval(recipeItemMongo);
        setRecipeModalVerify(true)
    };

    const handleFetchUserRecipes = async () => {
        setApiError(false);
        setIsLoading(true);
        try {
            if (user) {
                const response = await fetchUserRecipes(user);
                const userRecipes = response.data as RecipeItemMongo[];
                setRecipes(userRecipes)
            }
        } catch (e) {
            setApiError(true);
            console.log("error fetching recipes from db")
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleFetchUserRecipes()
    }, [user]);


    const handleSubmitRemoveRecipe = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            const deleteResponse = await removeRecipeFromMongoDb(user!, recipeMarkedForRemoval!)
            if (deleteResponse.status === 200) {
                //recipe successfully deleted
                const updatedRecipes = recipes.filter(recipe => recipe._id !== recipeMarkedForRemoval?._id)
                //reset states
                setRecipes(updatedRecipes)
                setRecipeModalVerify(false)
                setRecipeModalOpen(false)
                setRecipeMarkedForRemoval(undefined);
                setSelectedRecipeIndex(null);
                handleFetchUserRecipes()
            } else {
                console.log("Failed to delete the recipe. Please try again.");
            }
        } catch (e) {
            console.log("catch")
        } finally {
            console.log("finally")
        }
    }

    return (
        // tabs in recipetab, add more content if needed
        <div className="p-5 d-flex flex-wrap justify-content-center">
            {isLoading ? <div className="spinner-border text-warning" role="status"></div> :
                <div>
                    {apiError && <div className="text-center no-recipe-styling">
                        <p className="fw-semibold fs-4">Oops</p>
                        <p>We could not fetch your recipes, refresh and try again</p>
                    </div>}

                    {recipes.length < 1 && !apiError && <div className="text-center no-recipe-styling">
                        <p className="fw-semibold fs-4">No recipes created yet</p>
                        <p>Create one and it will show here</p>
                    </div>}
                </div>
            }

            {recipes.map((recipe, index) => (
                <div key={index} className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5 d-flex">
                    <RecipeCard
                        maxWidth={240}
                        minWidth={240}
                        minHeight={300}
                        maxHeight={300}
                        bgColor={'#2b3035'}
                        border={'1px solid white'}
                        data={recipe}
                        onClick={() => handleRecipeModalOpen(index)} // Pass the index here
                    />
                </div>
            ))}

            {/* RECIPE MODAL */}
            <Modal
                open={recipeModalOpen}
                onClose={() => setRecipeModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalRecipeStyle(isMobile)}>
                    {/* Check if selectedRecipe is not null before trying to access its properties */}
                    {selectedRecipe && (
                        <div>
                            <div className="text-center mt-5 recipe-title-container">
                                {/* Display the name of the selected recipe */}
                                <span className="fs-5">{selectedRecipe.title}</span>
                                <hr/>
                            </div>

                            <div className="d-flex justify-content-center align-content-center my-4">
                                {/* Place any other recipe details you want to display here. */}
                                {/* For example, showing the recipe's description or ingredients */}
                                <Typography component="div" variant="inherit" color="white">
                                    <div className="">
                                        <div className="mb-4 mt-3">
                                            <h4 className="py-1">Description</h4>
                                            <div className="font-formatting" id="description-container">
                                                {selectedRecipe.description}
                                            </div>
                                        </div>
                                        <div className="my-4">
                                            <h4 className="py-1">Ingredients</h4>
                                            <div className="font-formatting">
                                                <ul>
                                                    {selectedRecipe.ingredients.map((ingredient, index) => {
                                                        return <li key={index} className="py-1">{ingredient}</li>
                                                    })}</ul>
                                            </div>
                                        </div>
                                        <div className="my-4">
                                            <div className="font-formatting">
                                                <h4 className="py-1">Steps</h4>
                                                <ol>
                                                    {selectedRecipe.steps.map((step, index) => {
                                                        return <li key={index} className="py-1">{step}</li>
                                                    })}</ol>
                                            </div>
                                        </div>
                                    </div>
                                </Typography>
                            </div>
                            <button
                                className="btn btn-secondary"
                                style={{textTransform: "uppercase", letterSpacing: "2px"}}
                                onClick={() => handleSetRecipeModalVerify(selectedRecipe)}
                            >Remove
                            </button>
                            <button
                                className="btn btn-secondary ms-4"
                                style={{textTransform: "uppercase", letterSpacing: "2px"}}
                                onClick={() => setRecipeModalOpen(false)}
                            >Close
                            </button>
                        </div>
                    )}
                </Box>
            </Modal>

            {/* REMOVE RECIPE MODAL */}
            <Modal
                open={recipeModalVerify}
                onClose={() => setRecipeModalVerify(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={modalRecipeRemoveStyle(isMobile)}>

                    <div>
                        <div style={{textTransform: "uppercase", fontSize: "18px"}}>Are you sure you want to <span
                            style={{color: "red"}}>remove</span>
                            <div
                                className="my-3"
                                style={{letterSpacing: "1px", fontSize: "14px"}}>
                                <span style={{fontWeight: "bold", color: "#FFA77A"}}>{recipeMarkedForRemoval?.title}</span>
                            </div>
                            from your recipes?
                        </div>
                        <p className="my-3" style={{textTransform: "uppercase", fontSize: "14px"}}>This action cannot be
                            undone</p>
                        <div className="recipe-remove-container">
                            <button
                                className="btn btn-secondary"
                                style={{textTransform: "uppercase", letterSpacing: "2px"}}
                                onClick={(event) => handleSubmitRemoveRecipe(event)}
                            >I am sure
                            </button>
                            <button
                                className="btn btn-secondary"
                                style={{textTransform: "uppercase", letterSpacing: "2px"}}
                                onClick={() => setRecipeModalVerify(false)}
                            >Cancel
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>

        </div>
    )
}

export default RecipeTab