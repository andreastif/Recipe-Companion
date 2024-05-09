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
            responseType: 'blob'  // Set responseType here, outside the headers object
        });
        return response.data;
    } catch (err) {
        const axiosError = err as AxiosError;
        throw new Error(axiosError.message);
    }
}
