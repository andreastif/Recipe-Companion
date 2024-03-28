import { RecipeItemMongo } from "../components/api/recipeApi";

export interface RecipeItemMongoWithHeight {
  recipe: RecipeItemMongo;
  height: number;
}
