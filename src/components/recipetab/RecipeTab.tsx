import './RecipeTab.css'
import RecipeCard from "../cards/RecipeCard.tsx";
import {recipeData1, recipeData2, recipeData3, recipeData4} from "../dashboard/data.ts";


const recipeDataList = [recipeData1, recipeData2, recipeData3, recipeData4]
const RecipeTab = () => {
    return (
    //     tabs in recipetab, add more content if needed
        <div className="p-5 row">
            {recipeDataList.map(recipe => (
                <div key={recipe.id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5">
                    <RecipeCard maxWidth={345} bgColor={'#2b3035'} border={'1px solid white'}
                                data={recipe}/>
                </div>
            ))}
        </div>
    )
}

export default RecipeTab