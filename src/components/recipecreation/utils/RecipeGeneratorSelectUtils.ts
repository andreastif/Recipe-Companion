
type measurementOption = {
    value: string;
    label: string;
}

type language = {
    value: string;
    label: string
}

export const languageOptions: language[] = [
    { value: "ENGLISH", label: "English" },
    { value: "SWEDISH", label: "Swedish" },
]

export const measurementOptions: measurementOption[] = [
    { value: "METRIC", label: "Metric" },
    { value: "IMPERIAL", label: "Imperial" },

]

export type RecipeForm = {
    measurement: measurementOption  | undefined;
    ingredients: string | undefined;
    language: language  | undefined;
}