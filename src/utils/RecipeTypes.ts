import {ObjectId} from "mongodb";

export interface RecipeItemMongoWithHeight {
  recipe: RecipeItemMongo;
  height: number;
}

export type RecipeItemMongo = {
  _id?: ObjectId; // Made optional with '?' since it's not needed when creating
  title: string,
  photo_url: string
  description: string,
  ingredients: string[],
  steps: string[],
  tags: string[],
  email: string,
  created?: string,
  updated?: string
}

export type RecipeItemsMongoDto = {
  _id?: ObjectId; // Made optional with '?' since it's not needed when creating
  title: string,
  photo_url: string,
  description: string,
  ingredients: string[],
  steps: string[],
  tags: string[],
  email: string,
}
