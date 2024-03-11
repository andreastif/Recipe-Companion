import './RecipeCard.css'
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {RecipeItemMongo} from "../api/recipeApi.ts";


export type RecipeTypeProps = {
    minWidth: number,
    maxWidth: number,
    minHeight: number,
    maxHeight: number,
    bgColor: string,
    border: string,
    data: RecipeItemMongo
    onClick: () => void;
}

const RecipeCard = (props: RecipeTypeProps) => {

    return (
        <Card
            sx={{minHeight: props.minHeight, maxHeight: props.maxHeight, maxWidth: props.maxWidth, minWidth: props.minWidth, bgcolor: props.bgColor, border: props.border, margin: 'auto'}}
            onClick={props.onClick}>
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
                        {props.data.description.slice(0, 80) + " ..."}
                    </Typography>

                </CardContent>
            </CardActionArea>
        </Card>

    )
}

export default RecipeCard;