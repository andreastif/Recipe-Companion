import {useParams} from 'react-router-dom';
import {fetchUserRecipeById, RecipeItemMongo} from "../api/recipeApi";
import {useAuth} from "../../hooks/useAuth";
import {FormEvent, useEffect, useRef, useState} from "react";
import "./EditPhoto.css"
import {isValidFileExtension, isValidSize} from "../../utils/editPhotoUtils.ts";
import {uploadImage} from "../api/imageApi.ts";
import getStringMongoObjectId from "../../utils/getStringMongoObjectId.ts";
import {sweetAlertSuccess} from "../../utils/alerts.ts";

const EditPhoto = () => {
    const [currRecipe, setCurrRecipe] = useState<RecipeItemMongo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [validIDError, setValidIDError] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const {id} = useParams();
    const {user} = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleProcessImage = async (event: FormEvent<HTMLFormElement>) => {
        setFileError(null)
        event.preventDefault();
        // Checks variables current & files are not null / undefined and contains at least 1 file.
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            const isValidExt = isValidFileExtension(file.type);
            const sizeValid = isValidSize(file.size);

            if (isValidExt && sizeValid) {
                handleSetPreviewImageURL(file);
                await handleUploadImage(file);

            } else {
                setFileError("Not Valid File Extension / Size")
            }
        }
    };

    const handleUploadImage = async (file: File) => {
        setLoading(true)
        try {
            if (user && currRecipe?._id) {
                const recipeId = getStringMongoObjectId(currRecipe._id);
                const formData = new FormData();
                formData.append("image", file);
                await uploadImage(user, recipeId, formData);
                sweetAlertSuccess("Image Uploaded", "All set, you can head back to dashboard")
            } else {
                setFileError("Could not fetch recipe details")
            }
        } catch (e) {
            setFileError("Could not upload image: ")
        } finally {
            setLoading(false)
        }
    }

    const handleSetPreviewImageURL = (file: File) => {
        const fileUrl = URL.createObjectURL(file);
        setImagePreviewUrl(fileUrl);
    }

    useEffect(() => {
        const handleFetchCurrentRecipeDetails = async () => {
            if (user && id) {
                setLoading(true);
                setValidIDError(null);
                try {
                    const response = await fetchUserRecipeById(user, id);
                    const recipe = response.data as RecipeItemMongo;
                    setCurrRecipe(recipe);
                } catch (error: any) {
                    setValidIDError('Failed to fetch recipe details');
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
            Loading...
            <div className="ms-4 spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (validIDError) return <div className="text-center fw-semibold mt-5 text-warning">{validIDError}</div>;

    return (
        <>
            {fileError && <div className="text-center fw-semibold mt-5 text-warning">{fileError}</div>}
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="p-5 text-center">
                    <p>Editing photo for recipe: <strong>{currRecipe?.title}</strong></p>
                    {imagePreviewUrl && (
                        <div>
                            <img src={imagePreviewUrl} className="image-preview rounded" alt="Preview"/>
                        </div>
                    )}
                </div>
                <div className="format-input-screens">
                    <form onSubmit={handleProcessImage}>
                        <div className="input-group mb-3">
                            <input type="file" name="file" className="form-control" id="inputGroupFile02"
                                   ref={fileInputRef}/>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mt-4">
                            <button type="submit" className="btn btn-secondary">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditPhoto;
