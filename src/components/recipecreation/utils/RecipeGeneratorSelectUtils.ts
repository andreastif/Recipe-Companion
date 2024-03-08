
type measurementOption = {
    value: string;
    label: string;
}

type language = {
    value: string;
    label: string
}

export const languageOptions: language[] = [
    { value: "SWEDISH", label: "Swedish" },
    { value: "ENGLISH", label: "English" },
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