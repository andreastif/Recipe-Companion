// Create a common instance of axios for all meal db requests
import axios, {AxiosError} from "axios";
import {User} from "firebase/auth";
import {handleRefreshTokenForUser} from "./recipeApi.ts";

export const imageAPIClient = axios.create({
    baseURL: "https://alsome.codes/fileserver/",
});

/*
export const uploadImage = async (user: User, payload: UploadFileRequest) => {
    try {
        const token = await handleRefreshTokenForUser(user);
        return await imageAPIClient.post(`api/files`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
        const axiosError = err as AxiosError;
        throw new Error(axiosError.message);
    }
}
 */

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