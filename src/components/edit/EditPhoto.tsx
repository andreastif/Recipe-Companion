import { useParams } from 'react-router-dom';
import { fetchUserRecipeById, RecipeItemMongo } from "../api/recipeApi.ts";
import { useAuth } from "../../hooks/useAuth.tsx";
import { useEffect, useState } from "react";

const EditPhoto = () => {
    const [currRecipe, setCurrRecipe] = useState<RecipeItemMongo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();
    const { user } = useAuth();

    const handleFetchCurrentRecipeDetails = async () => {
        if (user && id) {
            setLoading(true);
            setError(null);
            try {
                const response = await fetchUserRecipeById(user, id);
                const recipe = response.data as RecipeItemMongo;
                setCurrRecipe(recipe);
            } catch (error: any) {
                setError('Failed to fetch recipe details');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        handleFetchCurrentRecipeDetails();
    }, [id, user]);

    if (loading) return (
        <div className="text-center fw-semibold mt-5">
            Loading Recipe..
            <div className="ms-4 spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
    if (error) return <div className="text-center fw-semibold mt-5 text-warning">{error}</div>;

    return (
        <div>
        Title: {currRecipe ? currRecipe.title : 'Recipe not found'}
        </div>
    );
}

export default EditPhoto;
