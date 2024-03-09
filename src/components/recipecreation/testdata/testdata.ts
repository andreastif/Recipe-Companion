import {Recipe} from "../../../contexts/AuthContext.tsx";

const exampleRecipe: Recipe = {

        title: "Citrus Mexican Chicken",
        description: "This recipe features a zesty, citrus-infused Mexican chicken that is both flavorful and affordable. The chicken is marinated in a lemon and lime zest mixture, then pan-seared to perfection. It's a simple dish with a refreshing twist, perfect for a weeknight dinner. Serve with a side of rice or tortillas for a complete meal.",
        ingredients: [
        "1 lemon (for zest and 30ml juice)",
        "1 lime (for zest and 30ml juice)",
        "15ml olive oil",
        "500g chicken breast"
    ],
        steps: [
        " Zest the lemon and lime, then juice both to get approximately 30ml of lemon juice and 30ml of lime juice.",
        " In a bowl, combine the lemon zest, lime zest, lemon juice, lime juice, and 15ml of olive oil to create a marinade.",
        "Add 500g of chicken breast to the marinade, ensuring each piece is well-coated, and let it sit for at least 30 minutes in the refrigerator.",
        "  Heat a pan over medium-high heat and cook the marinated chicken for 5-7 minutes on each side, or until fully cooked and golden brown."
    ]

}

export const exampleRecipe2: Recipe = {
    title: "Ugnsrostad Potatis med Örtsmör",
    description: "Denna måltid kommer att kittla smaklökarna med en dekadent blandning av örter och smör.",
    ingredients: [
        "600 gram potatis",
        "200 gram smör",
        "Timjan och rosmarin",
        "Salt och peppar",
    ],
    steps: [
        " Förvärm ugnen på 175 grader.",
        " Skala, tvätta och skär potatisen i klyftor och lägg på en plåt. ",
        " Blanda smör och örter väl tills örterna har fördelat sig fint i smöret.",
        " Sprid ut klickar av örtsmöret över potatisen, salta och peppra, och blanda väl. ",
        " Låt potatisen gräddas i mitten av ugnen i ca 40 minuter."
    ]
}

export const descriptionRecipe: Recipe = {
    title: "How do i use Recipe Companion?",
    description: "Well, that is as easy as following a recipe!",
    ingredients: [
        "A list of ingredients.",
        "The measurement type of your choice (kilos or pounds, etc).",
        "Your preferred language.",
    ],
    steps: [
        " Pick your measurement of choice for your recipe.",
        " Pick your language of choice for your recipe.",
        " Type in your ingredients",
        " Press Create Recipe!",
    ]
}

export default exampleRecipe