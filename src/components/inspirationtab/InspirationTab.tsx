import './InspirationTab.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery'; // MediaQuery hook for dynamic rendering
import IconButton from '@mui/material/IconButton'; // Import IconButton
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {useState} from "react"; // Import an icon for the button

interface Favorites {
    [key: number]: boolean;
}

const InspirationTab = () => {

    //Mediaqueries for mobile
    const isMobile = useMediaQuery('(max-width:768px)');

    const [favorites, setFavorites] = useState<Favorites>({});
    const handleAddFavorite = (id: number) => {
        setFavorites(prevFavorites => ({
            ...prevFavorites,
            [id]: !prevFavorites[id]
        }));

    }

    return (
        <div style={{margin: "10px", justifyContent: "center", display: "flex"}}>
            <Box sx={{width: isMobile ? "100%" : "95%", height: "90%", paddingTop: isMobile ? "5px" : "40px", paddingBottom: isMobile ? "0px" : "20px"}}>
                <ImageList variant="masonry" cols={isMobile ? 2 : 4} gap={6}>
                    {itemData.map((item) => (
                        // could probably make a component out of these things:
                        <ImageListItem key={item.id}>
                            <IconButton onClick={ () => handleAddFavorite(item.id)} style={{ position: 'absolute', top: 0, left: 0, color: 'white', zIndex: 1 }}>
                                <StarBorderIcon color={favorites[item.id] ? "warning" : "inherit"} />
                            </IconButton>
                            <img
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </div>
    );

}



const itemData = [
    {
        id: 1,
        img: 'https://www.themealdb.com/images/media/meals/yxsurp1511304301.jpg',
        title: 'Bed',
    },
    {
        id: 2,
        img: 'https://www.themealdb.com/images/media/meals/wsqqsw1515364068.jpg',
        title: 'Books',
    },
    {
        id: 3,
        img: 'https://www.themealdb.com/images/media/meals/oe8rg51699014028.jpg',
        title: 'Sink',
    },
    {
        id: 4,
        img: 'https://www.themealdb.com/images/media/meals/tqrrsq1511723764.jpg',
        title: 'Kitchen',
    },
    {
        id: 5,
        img: 'https://www.themealdb.com/images/media/meals/quuxsx1511476154.jpg',
        title: 'Blinds',
    },
    {
        id: 6,
        img: 'https://www.themealdb.com/images/media/meals/178z5o1585514569.jpg',
        title: 'Chairs',
    },
    {
        id: 7,
        img: 'https://www.themealdb.com/images/media/meals/qtqvys1468573168.jpg',
        title: 'Laptop',
    },
    {
        id: 8,
        img: 'https://www.themealdb.com/images/media/meals/hx335q1619789561.jpg',
        title: 'Doors',
    },
    {
        id: 9,
        img: 'https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg',
        title: 'Coffee',
    },
    {
        id: 10,
        img: 'https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg',
        title: 'Storage',
    },
    {
        id: 11,
        img: 'https://www.themealdb.com/images/media/meals/uyqrrv1511553350.jpg',
        title: 'Candle',
    },
    {
        id: 12,
        img: 'https://www.themealdb.com/images/media/meals/qysyss1511558054.jpg',
        title: 'Coffee table',
    },



];


export default InspirationTab;