import './InspirationTab.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery'; // MediaQuery hook for dynamic rendering
import IconButton from '@mui/material/IconButton'; // Import IconButton
import StarIcon from '@mui/icons-material/Star';
import {useEffect, useState} from "react";
import {fetchSampleSeafoodMeals} from "../api/mealDbApi.ts";
import CircularProgress from '@mui/material/CircularProgress';
import {useQuery} from '@tanstack/react-query'
import Modal from '@mui/material/Modal';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import {useNavigate} from "react-router-dom";

interface Favorites {
    [key: string]: boolean;
}

export type Meal = {
    id: string,
    name: string,
    imgUrl: string
}

const InspirationTab = () => {
    //media queries for mobile
    const isMobile = useMediaQuery('(max-width:768px)');
    const [favorites, setFavorites] = useState<Favorites>({});
    const [currentMeal, setCurrentMeal] = useState<Meal>();
    const [mealList, setMealList] = useState<Meal[]>([]);
    //for calling usequery onmount
    const [isMounted, setIsMounted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    const fetchFoodSamples = async () => {
        const response = await fetchSampleSeafoodMeals();
        return response.data["meals"]; // Directly return the meals array from the response
    };

    const {isLoading, status, data} = useQuery({
        queryKey: ["food"], queryFn: fetchFoodSamples,
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
            // Assuming the API response structure is { meals: Meal[] }
            const mappedMeals = data.map((meal: { [x: string]: any; }) => ({
                id: meal['idMeal'],
                name: meal['strMeal'],
                imgUrl: meal['strMealThumb'],
            }));
            setMealList(mappedMeals); // Set the mapped meals to mealList
        }
    }, [status, data]);

    const handleAddFavorite = (id: string) => {
        setFavorites(prevFavorites => ({
            ...prevFavorites,
            [id]: !prevFavorites[id]
        }));
    };

    function handleOpenModal(mealId: string) {
        const currentMeal = mealList.find(meal => meal.id === mealId)
        setCurrentMeal(currentMeal)
        setModalOpen(true)
        console.log(currentMeal);
    }


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
    };

    return (
        <div>
            {isLoading &&
                <div className="text-center mt-5">
                    <CircularProgress size={80}/>
                </div>
            }
            <div style={{margin: "10px", justifyContent: "center", display: "flex"}}>
                <Box sx={{
                    width: isMobile ? "100%" : "95%",
                    height: "90%",
                    paddingTop: isMobile ? "5px" : "40px",
                    paddingBottom: isMobile ? "0px" : "20px"
                }}>
                    <ImageList variant="masonry" cols={isMobile ? 2 : 4} gap={10}>
                        {mealList.map((item) => (
                            // could probably make a component out of these things:
                            <ImageListItem key={item.id} onClick={() => handleOpenModal(item.id)}>
                                <img
                                    src={`${item.imgUrl}`}
                                    alt={item.name}
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
                    <Box sx={modalStyle}>
                        <div >
                            <div className="text-center mt-5 meal-name-container">
                                <span className="fs-5">{currentMeal?.name}</span>
                                <hr/>
                            </div>
                            <div className="d-flex justify-content-center align-content-center my-4">
                                <IconButton onClick={() => handleAddFavorite(currentMeal?.id ?? "")}
                                            style={{position: 'absolute', top: 5, left: 5, color: 'white', zIndex: 1}}>
                                    <StarIcon color={favorites[currentMeal?.id ?? ""] ? "warning" : "inherit"}
                                              fontSize="large"/>
                                </IconButton>
                                <img
                                    src={`${currentMeal?.imgUrl}`}
                                    alt={currentMeal?.name}
                                    loading="lazy"
                                    width={isMobile ? '90%' : '50%'}
                                    className="img-fluid rounded border border-white"
                                />
                            </div>
                            <div className="d-flex justify-content-center align-content-center">
                                <div className="border rounded box-shadow my-2">
                                    <IconButton style={{color: 'white'}} onClick={() => {navigate("/create")}}>
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
