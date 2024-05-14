import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {fetchUserRecipeById, RecipeItemMongo, updateRecipeTitleById} from "../api/recipeApi.ts";
import {useAuth} from "../../hooks/useAuth.tsx";
import Button from "@mui/material/Button";
import {recipeButtonStyle} from "../inspirationtab/muiStyles.ts";
import useMediaQuery from "@mui/material/useMediaQuery";
import {sweetAlertSuccess} from "../../utils/alerts.ts";
import getStringMongoObjectId from "../../utils/getStringMongoObjectId.ts";

export type EditForm = {
    title: string
}

const EditRecipeTitle = () => {
    const [currRecipe, setCurrRecipe] = useState<RecipeItemMongo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [validIDError, setValidIDError] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);
    const isMobile = useMediaQuery('(max-width:768px)');
    const [form, setForm] = useState<EditForm>({
        title: "",
    })

    const {user} = useAuth();
    const {id} = useParams();
    const navigate = useNavigate();

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
                } finally {
                    setLoading(false);
                }
            }
        };

        handleFetchCurrentRecipeDetails();
    }, [id, user]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setHasError(false);
        setLoading(true);
        event.preventDefault();
        const formDetails: EditForm = {
            title: form.title,
        }
        await handleEditSubmit(formDetails);
        // Reset form
        setForm({
            title: "",
        });
    }

    const handleFormControlChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setForm((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        })
    };

    const handleEditSubmit = async (updatedForm: EditForm) => {
        try {
            await updateRecipeTitleById(user!, getStringMongoObjectId(currRecipe?._id), updatedForm.title)
            sweetAlertSuccess("Successful update", "Recipe title has been updated")
            navigate("/dashboard")
        } catch (e) {
            setHasError(true)
        } finally {
            setLoading(false);
        }
    }


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
            <div className={isMobile ? "" : "p-5"}>
                <div className="text-center">
                    <p className="fs-3">Current title</p>
                    <p className="fw-semibold">"{currRecipe?.title}"</p>
                </div>
                <div className="d-flex justify-content-center my-5">
                    <div className="format-input-screens border border-dark-subtle p-5 rounded bg-gradient">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="recipeTitle" className="form-label">New title</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Eg. Spicy Meatballs"
                                       id="recipeTitle"
                                       pattern="^[a-zA-Z\s]+$"
                                       aria-describedby="titleHelp"
                                       required
                                       name="title"
                                       value={form.title}
                                       onChange={handleFormControlChange}
                                />
                                <div id="titleHelp" className="form-text text-center fs-6 mt-3">
                                    First letter should be capitalized but doesnt have to be.
                                </div>
                            </div>
                            <div className="mt-4 d-flex justify-content-center gap-4">
                                <div className="mt-4 d-flex gap-3">
                                    <Button type="submit" variant="contained" sx={recipeButtonStyle()}>Edit</Button>
                                    <Button type="button" variant="contained" sx={recipeButtonStyle()}
                                            onClick={() => navigate("/dashboard")}>Back</Button>
                                </div>
                            </div>
                        </form>
                        {hasError && (
                            <div className="text-warning fw-semibold my-4">
                                Error saving title, try again 😒
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditRecipeTitle;