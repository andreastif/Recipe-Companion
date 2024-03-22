import './InspirationTab.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery'; // MediaQuery hook for dynamic rendering
import IconButton from '@mui/material/IconButton'; // Import IconButton
import StarIcon from '@mui/icons-material/Star';
import {useEffect, useState} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {useQuery} from '@tanstack/react-query'
import Modal from '@mui/material/Modal';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.tsx";
import {fetchAllRecipesInDBPagination, RecipeItemMongo} from "../api/recipeApi.ts";
import getStringMongoObjectId from "../../utils/getStringMongoObjectId.ts";
import {inspoContainer, modalBoxStyle} from "./muiStyles.ts";
import recipePlaceholder from "../../assets/recipe-placeholder.png"

interface Favorites {
    [key: string]: boolean;
}

const InspirationTab = () => {
    //media queries for mobile
    const isMobile = useMediaQuery('(max-width:768px)');
    const [favorites, setFavorites] = useState<Favorites>({});
    const [currentRecipe, setCurrentRecipe] = useState<RecipeItemMongo>();
    const [recipeList, setRecipeList] = useState<RecipeItemMongo[]>([]);
    //for calling usequery onmount
    const [isMounted, setIsMounted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();
    const {setFromInspiration, user} = useAuth()

    const fetchFoodSamples = async () => {
        const response = await fetchAllRecipesInDBPagination(user!, 1, 10);
        return response.data as RecipeItemMongo[];
    };

    const {isLoading, status, data} = useQuery({
        queryKey: ["inspiration"], queryFn: fetchFoodSamples,
        enabled: isMounted,
        refetchOnWindowFocus: false,
    });

    //only on mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    //updating setMeal based on status and data
    useEffect(() => {
        if (status === 'success' && data) {
            setRecipeList(data);
        }
    }, [status, data]);

    const handleAddFavorite = (id: string) => {
        setFavorites(prevFavorites => ({
            ...prevFavorites,
            [id]: !prevFavorites[id]
        }));
    };

    function handleOpenModal(mealId: string) {
        const currentRecipe = recipeList.find(recipe => getStringMongoObjectId(recipe._id) === mealId)
        setCurrentRecipe(currentRecipe)
        setModalOpen(true)
        console.log(currentRecipe);
    }


    return (
        <div>
            {isLoading &&
                <div className="text-center mt-5">
                    <CircularProgress size={80}/>
                </div>
            }
            <div className="inspo-container">
                <Box sx={inspoContainer(isMobile)}>
                    <ImageList variant="masonry" cols={isMobile ? 2 : 4} gap={10}>
                        {recipeList.map((item) => (
                            // could probably make a component out of these things:
                            <ImageListItem key={getStringMongoObjectId(item._id)} onClick={() => handleOpenModal(getStringMongoObjectId(item._id))}>
                                <img
                                    src={recipePlaceholder}
                                    alt="example placeholder"
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
            </div>
            <div>
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalBoxStyle(isMobile)}>
                        <div>
                            <div className="text-center mt-5 meal-name-container">
                                <span className="fs-5">{currentRecipe?.title}</span>
                                <hr/>
                            </div>
                            <div className="d-flex justify-content-center align-content-center my-4">
                                <IconButton onClick={() => handleAddFavorite(getStringMongoObjectId(currentRecipe?._id) ?? "")}
                                            style={{position: 'absolute', top: 5, left: 5, color: 'white', zIndex: 1}}>
                                    <StarIcon color={favorites[getStringMongoObjectId(currentRecipe?._id) ?? ""] ? "warning" : "inherit"}
                                              fontSize="large"/>
                                </IconButton>
                                <img
                                    src={recipePlaceholder}
                                    alt="placeholder recipe image"
                                    loading="lazy"
                                    width={isMobile ? '90%' : '50%'}
                                    className="img-fluid rounded border border-white"
                                />
                            </div>
                            <div className="d-flex justify-content-center align-content-center">
                                <div className="border rounded box-shadow my-2">
                                    <IconButton style={{color: 'white'}} onClick={() => {
                                        navigate("/create", {
                                            state: {meal: currentRecipe?.title}
                                        })
                                        setFromInspiration(true)
                                    }}>
                                        <SmartToyIcon color="inherit" fontSize="large"/>
                                        <span className="ps-2 button-text-container">Generate Recipe</span>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}


export default InspirationTab;
