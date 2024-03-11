import axios, {AxiosError} from "axios";
import {User} from "firebase/auth";
import {ObjectId} from "mongodb";


export type RecipeItemMongo = {
    _id?: ObjectId; // Made optional with '?' since it's not needed when creating
    title: string,
    description: string,
    ingredients: string[],
    steps: string[],
    email: string
}

// Create a common instance of axios for all meal db requests
export const mongoAPIClient = axios.create({
    baseURL: "https://alsome.codes/recipes/",
});

const handleRefreshTokenForUser = async (user: User) => {
    return await user.getIdToken(); // ForceRefresh Token;
}

export const fetchUserRecipes = async (user: User) => {
    try {
        const token = await handleRefreshTokenForUser(user);
        return await mongoAPIClient.get("user", {
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
