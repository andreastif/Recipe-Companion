import {OptionTypeForSelectElement} from "./ReactSelectFormStyles.ts";


export const languageOptions: OptionTypeForSelectElement[] = [
    {value: "ENGLISH", label: "English"},
    {value: "SWEDISH", label: "Swedish"},
]

export const numberOfServings: OptionTypeForSelectElement[] = [
    {value: "2", label: "2 servings"},
    {value: "4", label: "4 servings"},
    {value: "6", label: "6 servings"},
    {value: "8", label: "8 servings"},
    {value: "10", label: "10 servings"},
]

export type RecipeForm = {
    servings: OptionTypeForSelectElement | undefined;
    ingredients: string | undefined;
    language: OptionTypeForSelectElement | undefined;
}