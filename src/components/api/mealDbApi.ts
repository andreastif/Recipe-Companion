import axios, {AxiosError} from "axios";


// Create a common instance of axios for all meal db requests
export const mealDbClient = axios.create({
    baseURL: "https://www.themealdb.com/",
});


export const fetchSampleBeefMeals = async () => {
    try {
        return await mealDbClient.get("api/json/v1/1/filter.php?c=beef");
    } catch (err) {
        const axiosError = err as AxiosError;
        throw new Error(axiosError.message);
    }
}
