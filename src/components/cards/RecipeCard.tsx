import './RecipeCard.css'
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {RecipeItemMongo} from "../api/recipeApi.ts";


export type RecipeTypeProps = {
    maxWidth: number,
    bgColor: string,
    border: string,
    data: RecipeItemMongo
}
/*
export interface RecipeJson {
    id: number,
    title: string,
    summary: string,
    imageUrl: string,
}
 */

const RecipeCard = (props: RecipeTypeProps) => {

    return (
        <Card sx={{ maxWidth: props.maxWidth, bgcolor: props.bgColor, border: props.border, margin: 'auto' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    src={"https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg"}
                    alt="lorem picsum"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="text-white text-center">
                        {props.data.title}
                    </Typography>
                    <Typography variant="body2" color="white">
                        {props.data.description.slice(0, 100) + " ..."}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}

export default RecipeCard;