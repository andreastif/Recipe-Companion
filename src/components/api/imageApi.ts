// Create a common instance of axios for all meal db requests
import axios, {AxiosError} from "axios";
import {User} from "firebase/auth";
import {handleRefreshTokenForUser} from "./recipeApi.ts";

export const imageAPIClient = axios.create({
    baseURL: "https://alsome.codes/fileserver/",
});

export const uploadImage = async (user: User, recipeId: string, formData: FormData) => {
    try {
        const token = await handleRefreshTokenForUser(user);
        return await imageAPIClient.post(`api/files/${recipeId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });
    } catch (err) {
        const axiosError = err as AxiosError;
        throw new Error(axiosError.message);
    }
}

export const getImageBlobById = async (user: User, id: string) => {
    try {
        const token = await handleRefreshTokenForUser(user);
        const response = await imageAPIClient.get(`api/files/${id}/photo`, {
            headers: {
                Authorization: `Bearer ${token}`
            },

            // då api returnerar Content-Disposition: attachment; filename="example.png" måste vi efterfråga en blob
            // vi kan forma hur vi skall få tillbaka responsen med 'responseType'
            // blob använder vi när vi får ett fil objekt med rå data tillbaka, kolla hur vi renderar detta i <RecipeImage /> komponent
            responseType: 'blob'
        });
        return response.data;
    } catch (err) {
        const axiosError = err as AxiosError;
        throw new Error(axiosError.message);
    }
}
