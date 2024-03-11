import {OptionTypeForSelectElement} from "./ReactSelectFormStyles.ts";


export const languageOptions: OptionTypeForSelectElement[] = [
    {value: "ENGLISH", label: "English"},
    {value: "SWEDISH", label: "Swedish"},
]

export const measurementOptions: OptionTypeForSelectElement[] = [
    {value: "METRIC", label: "Metric"},
    {value: "IMPERIAL", label: "Imperial"},
]

export type RecipeForm = {
    measurement: OptionTypeForSelectElement | undefined;
    ingredients: string | undefined;
    language: OptionTypeForSelectElement | undefined;
}