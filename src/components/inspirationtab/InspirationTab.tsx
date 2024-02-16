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
        img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        title: 'Bed',
    },
    {
        id: 2,
        img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
        title: 'Books',
    },
    {
        id: 3,
        img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
        title: 'Sink',
    },
    {
        id: 4,
        img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
        title: 'Kitchen',
    },
    {
        id: 5,
        img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
        title: 'Blinds',
    },
    {
        id: 6,
        img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
        title: 'Chairs',
    },
    {
        id: 7,
        img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
        title: 'Laptop',
    },
    {

        id: 8,
        img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
        title: 'Doors',
    },
    {
        id: 9,
        img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
        title: 'Coffee',
    },
    {
        id: 10,
        img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
        title: 'Storage',
    },
    {
        id: 11,
        img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
        title: 'Candle',
    },
    {
        id: 12,
        img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
        title: 'Coffee table',
    },



];


export default InspirationTab;