import {OptionProps, StylesConfig} from "react-select";

export interface OptionTypeForSelectElement {
    value: string;
    label: string;
}

export const ReactSelectFormStyles: StylesConfig<OptionTypeForSelectElement, false> = {
    control: (base) => ({
        ...base,

        minWidth: "50%",
        height: "35px",
        minHeight: "35px",
        border: "none",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "1px",
        borderColor: base.borderColor,
        boxShadow: "none",
        "&hover": {
            borderColor: base.borderColor,
        },
        cursor: "pointer",
        padding: "2px, 9px",
        color: "black !important",
    }),
    option: (base, state: OptionProps<OptionTypeForSelectElement, false>) => ({
        ...base,
        backgroundColor: state.isFocused ? "rgb(231,226,221)" : "white",
        fontSize: "11px",
        textTransform: "uppercase",
        paddingLeft: "1rem",
        color: "black !important",
        letterSpacing: "1px"
    }),
    singleValue: (base) => ({
        ...base,
        color: "black !important",
    }),
    menu: (base) => ({
        ...base,
        width: "150px",
        marginTop: "0",
        marginLeft: "0",
        color: "black !important",
    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            marginRight: 0,
            marginLeft: 0,
            color: "black !important",
        };
    },
    indicatorSeparator: (base) => ({
        ...base,
        color: "#888 !important"
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: "#888 !important",
        fontSize: "small",
        padding: "0 8px"
    }),
    input: (base) => ({
        ...base,
        caretColor: "transparent",
        color: "black !important",
    })
}