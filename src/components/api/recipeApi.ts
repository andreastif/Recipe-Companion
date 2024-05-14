import axios, {AxiosError} from "axios";
import {User} from "firebase/auth";
import {RecipeData} from "../recipecreation/utils/RecipeGeneratorUtils.ts";
import getStringMongoObjectId from "../../utils/getStringMongoObjectId.ts";
import {RecipeItemMongo, RecipeItemsMongoDto} from "../../utils/RecipeTypes.ts";


// Create a common instance of axios for all meal db requests
export const mongoAPIClient = axios.create({
    baseURL: "https://alsome.codes/",
});

export const handleRefreshTokenForUser = async (user: User) => {
    return await user.getIdToken(true); // ForceRefresh Token;
}

export const fetchUserRecipes = async (user: User) => {
    try {
        const token = await handleRefreshTokenForUser(user);
        return await mongoAPIClient.get("recipes/user", {
            headers: {
                // Use the token in the Authorization header
                Authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
        const axiosError = err as AxiosError;
        throw new Error(axiosError.message);
    }
}

export const fetchUserRecipeById = async (user: User, id: string) => {
    try {
        const token = await handleRefreshTokenForUser(user);
        return await mongoAPIClient.get(`recipes/${id}`, {
            headers: {
                // Use the token in the Authorization header
                Authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
        const axiosError = err as AxiosError;
        throw new Error(axiosError.message);
    }
}

export const fetchAllRecipesInDBPagination = async (user: User, page: number, amountPage: number) => {
    try {
        const token = await handleRefreshTokenForUser(user);
        return await mongoAPIClient.get(`recipes?page=${page}&per_page=${amountPage}`, {
            headers: {
                // Use the token in the Authorization header
                Authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
        const axiosError = err as AxiosError;
        throw new Error(axiosError.message);
    }
}


export const postRecipeToMongoDb = async (user: User, recipe: RecipeItemsMongoDto) => {
    try {
        const token = await handleRefreshTokenForUser(user);
        return await mongoAPIClient.post("recipes", recipe, {
            headers: {
                // Use the token in the Authorization header
                Authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
        const axiosError = err as AxiosError;
        throw new Error(axiosError.message);
    }
}

export const removeRecipeFromMongoDb = async (user: User, recipe: RecipeItemMongo) => {
    try {
        const token = await handleRefreshTokenForUser(user);
        const stringId = getStringMongoObjectId(recipe._id)
        return await mongoAPIClient.delete(`recipes/${stringId}`, {
            headers: {
                // Use the token in the Authorization header
                Authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
        const axiosError = err as AxiosError;
        throw new Error(axiosError.message);
    }
}

export const updateRecipeTitleById = async (user: User, id: string, newTitle: string) => {
    try {
        const token = await handleRefreshTokenForUser(user);
        return await mongoAPIClient.patch(`recipes/${id}/title`, {title: newTitle}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
        const axiosError = err as AxiosError;
        throw new Error(axiosError.message);
    }
}

export const createRecipeGpt4 = async (user: User, recipe: RecipeData) => {
    try {
        const token = await handleRefreshTokenForUser(user);
        return await axios.post("api/auth/create", recipe, {
            headers: {
                // Use the token in the Authorization header
                Authorization: `Bearer ${token}`
            }
        })

    } catch (err) {
        const axiosError = err as AxiosError;
        throw new Error(axiosError.message);
    }
}


export const createRecipeGpt3_5 = async (recipe: RecipeData) => {
    try {
        return await axios.post("api/create", recipe);
    } catch (err) {
        const axiosError = err as AxiosError;
        throw new Error(axiosError.message);
    }
}