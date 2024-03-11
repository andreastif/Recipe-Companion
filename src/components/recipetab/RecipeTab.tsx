import './RecipeTab.css'
import RecipeCard from "../cards/RecipeCard.tsx";
import {fetchUserRecipes, RecipeItemMongo} from "../api/recipeApi.ts";
import {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";


const RecipeTab = () => {
    const [recipes, setRecipes] = useState<RecipeItemMongo[]>([]);
    const [apiError, setApiError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {user} = useAuth();

    //todo: useQuery for fetching data

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
                <div
                    key={index}
                    className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5 d-flex"
                >
                    <RecipeCard
                        maxWidth={240}
                        bgColor={'#2b3035'}
                        border={'1px solid white'}
                        data={recipe}
                    />
                </div>
            ))}
        </div>
    )
}

export default RecipeTab