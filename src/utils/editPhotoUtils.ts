/*
    In the frontend, you can use JavaScript's FileReader API to convert the image file to a Base64 encoded string.
    This is useful as Base64 is a common format for encoding binary data into a string, which can easily be transmitted over HTTP
 */

import {RecipeItemMongo, RecipeItemMongoWithHeight} from "./RecipeTypes.ts";

export function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function isValidFileExtension(fileTypeString: string): boolean {
  const lastSlash = fileTypeString.toLowerCase().lastIndexOf("/");
  const ext = fileTypeString.substring(lastSlash + 1);
  return ext.startsWith("jpg") || ext.startsWith("png") || ext.startsWith("jpeg");
}

export function isValidSize(size: number): boolean {
  return size < 10_000_000;
}

export const handleConvertToBase64 = async (file: File) => {
  try {
    const unformattedBase64 = await convertImageToBase64(file);
    return unformattedBase64.split("base64,")[1];
  } catch (e) {
    console.error(e);
  }
};

export const handleGetPhotoId = (recipe: RecipeItemMongoWithHeight) => {
  const url = recipe.recipe.photo_url;
  const lastDashIndex = url.lastIndexOf("/");
  return url.substring(lastDashIndex + 1);
};

export const handleGetPhotoIdWithoutHeight = (recipe: RecipeItemMongo) => {
  const url = recipe.photo_url;
  const lastDashIndex = url.lastIndexOf("/");
  return url.substring(lastDashIndex + 1);
};
