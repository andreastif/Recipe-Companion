import {useParams} from 'react-router-dom';
import {fetchUserRecipeById, RecipeItemMongo} from "../api/recipeApi.ts";
import {useAuth} from "../../hooks/useAuth.tsx";
import {FormEvent, useEffect, useState, useRef} from "react";

const EditPhoto = () => {
    const [currRecipe, setCurrRecipe] = useState<RecipeItemMongo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {id} = useParams();
    const {user} = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChoosePhoto = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Access the file(s) from the input
        if (fileInputRef.current) {
            const files = fileInputRef.current.files;
            if (files && files.length > 0) {
                const currentFile = files[0];
                console.log(currentFile);
            }
        }
    };

    useEffect(() => {
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
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="p-5 text-center">
                <p>Editing photo for recipe: <strong>{currRecipe?.title}</strong></p>
            </div>
            <div className="format-input-screens border border-dark-subtle p-5 rounded bg-gradient">
                <form onSubmit={handleChoosePhoto}>
                    <div className="input-group mb-3">
                        <input type="file" name="file" className="form-control" id="inputGroupFile02" ref={fileInputRef}/>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        <button type="submit" className="btn btn-secondary">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPhoto;
