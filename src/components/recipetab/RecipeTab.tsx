import './RecipeTab.css'
import {fetchUserRecipes, RecipeItemMongo, removeRecipeFromMongoDb} from "../api/recipeApi.ts";
import {FormEvent, useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Typography} from "@mui/material";
import {modalRecipeRemoveStyle, modalRecipeStyle} from "./additionalModalStyling.ts";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import getStringMongoObjectId from "../../utils/getStringMongoObjectId.ts";
import recipePlaceholder from "../../assets/recipe-placeholder.png";
import {getRandomHeight} from "../recipecreation/utils/util.ts";


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
                const updatedRecipes = recipes.filter(recipe => recipe._id !== recipeMarkedForRemoval?._id)
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
        <div className="p-5">
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

            <ImageList variant="masonry" cols={isMobile ? 2 : 4} gap={10}>
                {recipes.map((item, index) => (
                    <ImageListItem key={getStringMongoObjectId(item._id)} onClick={() => handleRecipeModalOpen(index)}>
                        <img
                            src={recipePlaceholder}
                            alt={item.title}
                            loading="lazy"
                            style={{ height: `${getRandomHeight()}px`, width: "100%", objectFit: 'cover' }}
                        />
                        {/* Overlay Text
                                position: 'absolute' removes the div from the normal document flow and positions it
                                relative to its nearest positioned ancestor (the ImageListItem with position: 'relative').
                                */}
                        <div className="overlay-text">
                            <span style={{textTransform: "uppercase", letterSpacing: "1px"}}>{item.title}</span>
                        </div>
                    </ImageListItem>
                ))}
            </ImageList>

            {/* RECIPE MODAL */}
            <Modal
                open={recipeModalOpen}
                onClose={() => setRecipeModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalRecipeStyle(isMobile)}>
                    {selectedRecipe && (
                        <div>
                            <div className="text-center mt-5 recipe-title-container">
                                {/* Display the name of the selected recipe */}
                                <span className="fs-5">{selectedRecipe.title}</span>
                                <hr/>
                            </div>

                            <div className="d-flex my-4">
                                {/* Place any other recipe details you want to display here. */}
                                {/* For example, showing the recipe's description or ingredients */}
                                <Typography className="typo-left-aligned-text" component="div" variant="inherit" color="white">
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
                                <span style={{fontWeight: "bold", color: "#FFA77A"}}>{recipeMarkedForRemoval?.title}</span> {" "}?
                            </div>

                        </div>
                        <p className="my-3" style={{textTransform: "uppercase", fontSize: "14px"}}>This action <span style={{textDecoration: "underline"}}>cannot</span> be
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
