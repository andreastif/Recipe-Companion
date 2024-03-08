
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
    { value: "IMPERIAL", label: "Imperial" },
    { value: "METRIC", label: "Metric" },
]

export type RecipeForm = {
    measurement: measurementOption  | undefined;
    ingredients: string | undefined;
    language: language  | undefined;
}