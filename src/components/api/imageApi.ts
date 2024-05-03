// Create a common instance of axios for all meal db requests
import axios, {AxiosError} from "axios";
import {User} from "firebase/auth";
import {handleRefreshTokenForUser} from "./recipeApi.ts";
import {UploadFileRequest} from "../edit/EditPhoto.tsx";

export const imageAPIClient = axios.create({
    baseURL: "https://alsome.codes/fileserver/",
});


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