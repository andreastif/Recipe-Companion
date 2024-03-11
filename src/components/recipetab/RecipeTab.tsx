import './RecipeTab.css'
import RecipeCard from "../cards/RecipeCard.tsx";
import {fetchUserRecipes, RecipeItemMongo} from "../api/recipeApi.ts";
import {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Typography} from "@mui/material";


const RecipeTab = () => {
    const [recipes, setRecipes] = useState<RecipeItemMongo[]>([]);
    const [apiError, setApiError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isMobile = useMediaQuery('(max-width:768px)');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null);



    const {user} = useAuth();

    //QUICKFIXES SOM MÅSTE LÖSAS:
    //todo: useQuery for fetching data
    //todo: cleanup modal imports and exports from util instead
    //todo: sätt egna css klasser, använd en recipegenerator.tsx klasserna...

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '90%' : '40%',
        bgcolor: '#2b3035',
        border: '1px solid #FFF',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto', // Enables vertical scrolling
        maxHeight: '90vh', // Prevents the modal from being taller than the viewport
    }

    const handleOpenModal = (index: number) => {
        setSelectedRecipeIndex(index);
        setModalOpen(true);
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

    const selectedRecipe = selectedRecipeIndex !== null ? recipes[selectedRecipeIndex] : null;


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
                        onClick={() => handleOpenModal(index)} // Pass the index here
                    />
                </div>
            ))}
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {/* Check if selectedRecipe is not null before trying to access its properties */}
                    {selectedRecipe && (
                        <div>
                            <div className="text-center mt-5 recipe-title-container">
                                {/* Display the name of the selected recipe */}
                                <span className="fs-5">{selectedRecipe.title}</span>
                                <hr />
                            </div>

                            <div className="d-flex justify-content-center align-content-center my-4">
                                {/* Place any other recipe details you want to display here. */}
                                {/* For example, showing the recipe's description or ingredients */}
                                <Typography variant="inherit" color="white">
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
                                onClick={ () => setModalOpen(false)}
                            >Close
                            </button>
                        </div>
                    )}
                </Box>
            </Modal>


        </div>
    )
}

export default RecipeTab