import './InspirationTab.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery'; // MediaQuery hook for dynamic rendering
import IconButton from '@mui/material/IconButton'; // Import IconButton
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {useEffect, useState} from "react";
import {fetchSampleBeefMeals} from "../api/mealDbApi.ts";
import {AxiosResponse} from "axios"; // Import an icon for the button
import CircularProgress from '@mui/material/CircularProgress';

interface Favorites {
    [key: string]: boolean;
}

export type Meal = {
    id: string,
    name: string,
    imgUrl: string
}

const InspirationTab = () => {
    useEffect(() => {
        handleFetchInsp()
    }, [])

    //Mediaqueries for mobile
    const isMobile = useMediaQuery('(max-width:768px)');
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState<Favorites>({});
    const [mealList, setMealList] = useState<Meal[]>([])

    const handleFetchInsp = async () => {
        try {
            setLoading(true)
            const resp = await fetchSampleBeefMeals()
            const meals: Meal[] = mapToMeal(resp);
            setMealList(meals);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const mapToMeal = (response: AxiosResponse<any, any>) => {
        const mappedMeals: Meal[] = [];
        const dataArray = response.data['meals'];

        dataArray.map((mealResp: { [x: string]: any; }) => {
            const newMeal: Meal = {
                id: mealResp['idMeal'],
                name: mealResp['strMeal'],
                imgUrl: mealResp['strMealThumb'],
            }
            mappedMeals.push(newMeal);
        })

        return mappedMeals;
    }

    const handleAddFavorite = (id: string) => {
        setFavorites(prevFavorites => ({
            ...prevFavorites,
            [id]: !prevFavorites[id]
        }));

    }

    function handleOpenModal(mealId: string) {
        console.log(mealId);
    }

    return (
        <div>
            {loading &&
                <div className="text-center mt-5">
                    <CircularProgress size={80} />
                </div>
            }
        <div style={{margin: "10px", justifyContent: "center", display: "flex"}}>
            <Box sx={{
                width: isMobile ? "100%" : "95%",
                height: "90%",
                paddingTop: isMobile ? "5px" : "40px",
                paddingBottom: isMobile ? "0px" : "20px"
            }}>
                <ImageList variant="masonry" cols={isMobile ? 2 : 4} gap={6}>
                    {mealList.map((item) => (
                        // could probably make a component out of these things:
                        <ImageListItem key={item.id} onClick={() => handleOpenModal(item.id)}>
                            <IconButton onClick={() => handleAddFavorite(item.id)}
                                        style={{position: 'absolute', top: 0, left: 0, color: 'white', zIndex: 1}}>
                                <StarBorderIcon color={favorites[item.id] ? "warning" : "inherit"}/>
                            </IconButton>
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
        </div>
    );
}


export default InspirationTab;
