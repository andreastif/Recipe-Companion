import './RecipeCard.css'
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import exampleRecipe from "../recipecreation/testdata/testdata.ts";


export type RecipeTypeProps = {
    maxWidth: number,
    bgColor: string,
    border: string,
    data: RecipeJson,
}

export interface RecipeJson {
    id: number,
    title: string,
    summary: string,
    imageUrl: string,
}

const RecipeCard = (props: RecipeTypeProps) => {

    return (
        <Card sx={{ maxWidth: props.maxWidth, bgcolor: props.bgColor, border: props.border, margin: 'auto' }}>            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    src={props.data.imageUrl}
                    alt="lorem picsum"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="text-white text-center">
                        {exampleRecipe.title}
                    </Typography>
                    <Typography variant="body2" color="white">
                        {exampleRecipe.description.slice(0, 100) + " ..."}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}

export default RecipeCard;