import Constants from "expo-constants";

import {
  InstructionsResponse,
  RecipeNutritionResponse,
  RecipeSearchResponse,
} from "../types";

export const searchRecipes = async (
  query: string,
  maxResults = 10
): Promise<RecipeSearchResponse> =>
  await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${maxResults}`,
    {
      headers: { "x-api-key": Constants.manifest?.extra?.SPOONCULAR_API_KEY },
    }
  ).then((r) => r.json() as Promise<RecipeSearchResponse>);

export const getNutritionByRecipeId = async (
  recipeId: number
): Promise<RecipeNutritionResponse> =>
  await fetch(
    `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json`,
    {
      headers: { "x-api-key": Constants.manifest?.extra?.SPOONCULAR_API_KEY },
    }
  ).then((r) => r.json() as Promise<RecipeNutritionResponse>);

export const getInstructionsByRecipeId = async (
  recipeId: number
): Promise<InstructionsResponse> => {
  const [resp] = await fetch(
    `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`,
    {
      headers: { "x-api-key": Constants.manifest?.extra?.SPOONCULAR_API_KEY },
    }
  ).then((r) => r.json() as Promise<InstructionsResponse[]>);

  return resp;
};
