import "./RecipeTab.css";
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
import {inspoContainer} from "../inspirationtab/muiStyles.ts";
import {useQuery} from "@tanstack/react-query";
import {RecipeItemMongoWithHeight} from "../../utils/Types.ts";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import RecipeImage from "./RecipeImage.tsx";
import {handleGetPhotoId} from "../../utils/editPhotoUtils.ts";

const RecipeTab = () => {
    const [recipes, setRecipes] = useState<RecipeItemMongoWithHeight[]>([]);
    const [apiError, setApiError] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const isMobile = useMediaQuery("(max-width:768px)");
    const [recipeModalOpen, setRecipeModalOpen] = useState(false);
    const [recipeModalVerify, setRecipeModalVerify] = useState(false);
    const [recipeMarkedForRemoval, setRecipeMarkedForRemoval] = useState<RecipeItemMongo>();
    const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null);
    const {user} = useAuth();
    const selectedRecipe = selectedRecipeIndex !== null ? recipes[selectedRecipeIndex] : null;
    const navigate = useNavigate();

    const handleRecipeModalOpen = (index: number) => {
        setSelectedRecipeIndex(index);
        setRecipeModalOpen(true);
    };

    const handleSetRecipeModalVerify = (recipeItemMongo: RecipeItemMongo) => {
        setRecipeMarkedForRemoval(recipeItemMongo);
        setRecipeModalVerify(true);
    };

    const fetchUserRecipesFromDb = async () => {
        const response = await fetchUserRecipes(user!);
        return response.data as RecipeItemMongo[];
    };

    const {isLoading, status, data} = useQuery({
        queryKey: ["recipes"],
        queryFn: fetchUserRecipesFromDb,
        enabled: isMounted,
        refetchOnWindowFocus: false,
    });

    const handleRedirectToEditPhoto = (id: string) => {
        navigate(`/edit/photo/${id}`);
    }

    const handleRedirectToEditTitle = (id: string) => {
        navigate(`/edit/title/${id}`);
    }

    useEffect(() => {
        if (status === "success" && data) {
            const recipeWithRandomHeight: RecipeItemMongoWithHeight[] = data.map((recipe) => {
                const formattedRecipe: RecipeItemMongoWithHeight = {
                    recipe,
                    height: getRandomHeight(),
                };
                return formattedRecipe;
            });
            setApiError(false);
            setRecipes(recipeWithRandomHeight);
        } else {
            setApiError(true);
            setRecipes([]);
        }
    }, [status, data]);

    //only on mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmitRemoveRecipe = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const deleteResponse = await removeRecipeFromMongoDb(user!, recipeMarkedForRemoval!);
            if (deleteResponse.status === 200) {
                const updatedRecipes = recipes.filter((recipe) => recipe.recipe._id !== recipeMarkedForRemoval?._id);
                setRecipes(updatedRecipes);
                setRecipeModalVerify(false);
                setRecipeModalOpen(false);
                setRecipeMarkedForRemoval(undefined);
                setSelectedRecipeIndex(null);
            } else {
                console.log("Failed to delete the recipe. Please try again.");
            }
        } catch (e) {
            console.log("catch");
        } finally {
            console.log("finally");
        }
    };

    return (
        <div>
            {isLoading ? (
                <div className="spinner-border text-warning" role="status"></div>
            ) : (
                <div>
                    {apiError && (
                        <div className="no-recipe-grouping mt-5">
                            <div className="format-input-screens">
                                <div className="border border-white error-box-shadow rounded recipe-container">
                                    <div className="text-center no-recipe-styling">
                                        <p className="fw-semibold fs-4">Oops</p>
                                        <p>We could not fetch your recipes, refresh and try again</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {recipes.length < 1 && !apiError && (
                        <div className="no-recipe-grouping mt-5">
                            <div className="format-input-screens">
                                <div className="border border-white error-box-shadow rounded recipe-container">
                                    <div className="text-center no-recipe-styling">
                                        <p className="fw-semibold fs-4">No recipes created yet</p>
                                        <p>Create one and it will show here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="recipetab-grouping">
                <Box sx={inspoContainer(isMobile)}>
                    <ImageList variant="masonry" cols={isMobile ? 2 : 3} gap={10}>
                        {recipes.map((item, index) => (
                            <ImageListItem key={getStringMongoObjectId(item.recipe._id)}
                                           onClick={() => handleRecipeModalOpen(index)}>
                                {item.recipe.photo_url.length > 0 ? <RecipeImage imageId={handleGetPhotoId(item)}
                                                                                 height={item.height}/>
                                    :
                                    <img
                                        src={recipePlaceholder}
                                        alt={item.recipe.title}
                                        loading="lazy"
                                        style={{height: `${item.height}px`, width: "100%", objectFit: "cover"}}
                                    />}
                                <div className="overlay-text">
                                    <span style={{
                                        textTransform: "uppercase",
                                        letterSpacing: "1px"
                                    }}>{item.recipe.title}</span>
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>

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
                                    <div><AddPhotoAlternateIcon/> <Button variant="text" className="text-warning" onClick={() => handleRedirectToEditPhoto(getStringMongoObjectId(selectedRecipe?.recipe._id))}>Edit
                                        Photo</Button></div>
                                <div className="text-center mt-5 recipe-title-container">
                                    <div>
                                        <p className="fs-5">{selectedRecipe.recipe.title}</p>
                                    </div>
                                    <div>
                                        <Button variant="text" className="text-warning" onClick={() => handleRedirectToEditTitle(getStringMongoObjectId(selectedRecipe?.recipe._id))}>Edit Recipe Title<EditIcon
                                            className="ms-2"/></Button>
                                    </div>
                                    <hr/>
                                </div>

                                <div className="d-flex my-4">
                                    <Typography className="typo-left-aligned-text" component="div" variant="inherit"
                                                color="white">
                                        <div className="">
                                            <div className="mb-4 mt-3">
                                                <h4 className="py-1">Description</h4>
                                                <div className="font-formatting" id="description-container">
                                                    {selectedRecipe.recipe.description}
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <h4 className="py-1">Ingredients</h4>
                                                <div className="font-formatting">
                                                    <ul>
                                                        {selectedRecipe.recipe.ingredients.map((ingredient, index) => {
                                                            return (
                                                                <li key={index} className="py-1">
                                                                    {ingredient}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <div className="font-formatting">
                                                    <h4 className="py-1">Steps</h4>
                                                    <ol>
                                                        {selectedRecipe.recipe.steps.map((step, index) => {
                                                            return (
                                                                <li key={index} className="py-1">
                                                                    {step}
                                                                </li>
                                                            );
                                                        })}
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                    </Typography>
                                </div>
                                <button
                                    className="btn btn-secondary"
                                    style={{textTransform: "uppercase", letterSpacing: "2px"}}
                                    onClick={() => handleSetRecipeModalVerify(selectedRecipe.recipe)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-secondary ms-4"
                                    style={{textTransform: "uppercase", letterSpacing: "2px"}}
                                    onClick={() => setRecipeModalOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </Box>
                </Modal>

                {/* DELETE RECIPE MODAL */}
                <Modal
                    open={recipeModalVerify}
                    onClose={() => setRecipeModalVerify(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalRecipeRemoveStyle(isMobile)}>
                        <div>
                            <div style={{textTransform: "uppercase", fontSize: "18px"}}>
                                Delete Recipe
                                <div
                                    className="my-3"
                                    style={{
                                        padding: "20px",
                                        borderRadius: "3px",
                                        backgroundColor: "#f9d5c2",
                                        letterSpacing: "1px",
                                        fontSize: "14px",
                                    }}
                                >
                  <span
                      style={{
                          color: "#c12020",
                      }}
                  >
                    Are you sure you want to{" "}
                      <span style={{fontWeight: "bold", textDecoration: "underline"}}>delete</span>{" "}
                      {recipeMarkedForRemoval?.title}?
                  </span>
                                </div>
                            </div>
                            <p className="my-3" style={{textTransform: "uppercase", fontSize: "14px"}}>
                                This action <span style={{textDecoration: "underline"}}>cannot</span> be undone
                            </p>
                            <div className="recipe-remove-container">
                                <button
                                    className="btn btn-danger"
                                    style={{textTransform: "uppercase", letterSpacing: "2px"}}
                                    onClick={(event) => handleSubmitRemoveRecipe(event)}
                                >
                                    DELETE
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    style={{textTransform: "uppercase", letterSpacing: "2px"}}
                                    onClick={() => setRecipeModalVerify(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default RecipeTab;
