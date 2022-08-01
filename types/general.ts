import { RecipeInfo } from "./spooncular";

export type MealTypes = "breakfasts" | "lunches" | "dinners";

export type Recipe = Omit<RecipeInfo, "imagetype"> & {
  calories: string;
  carbs: string;
  fat: string;
  protein: string;
};

export type Meals = {
  breakfasts: Recipe[];
  lunches: Recipe[];
  dinners: Recipe[];
};
