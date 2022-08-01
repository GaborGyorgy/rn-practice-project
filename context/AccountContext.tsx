import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MealTypes, RecipeInfo } from "../types";

interface Props {
  children: ReactNode;
}

type Recipe = Omit<RecipeInfo, "imagetype"> & {
  calories: string;
  carbs: string;
  fat: string;
  protein: string;
};
interface IAccountContext {
  favouriteRecipes: number[];
  addFavouriteRecipe: (recipeId: number) => Promise<void>;
  removeFavouriteRecipe: (recipeId: number) => Promise<void>;
  addMeal: (meal: MealTypes, recipe: Recipe) => Promise<void>;
  breakfasts: Recipe[];
  lunches: Recipe[];
  dinners: Recipe[];
}

export const AccountContext = createContext<IAccountContext>({
  favouriteRecipes: [],
  addFavouriteRecipe: async () => {},
  removeFavouriteRecipe: async () => {},
  addMeal: async (meal: MealTypes, recipe: Recipe) => {},
  breakfasts: [],
  lunches: [],
  dinners: [],
});

const FAVOURITE_RECIPES_STORAGE_KEY = "favouriteRecipes";

const BREAKFAST_STORAGE_KEY = "breakfasts";
const LUNCH_STORAGE_KEY = "lunches";
const DINNER_STORAGE_KEY = "dinners";

type MealKeyType = "breakfasts" | "lunches" | "dinners";

// this should be renamed to something else but i havent decided a proper name yet
export const AccountProvider = ({ children }: Props): JSX.Element => {
  const [favouriteRecipes, setFavouriteRecipes] = useState<number[]>([]);
  const [breakfasts, setBreakfasts] = useState<Recipe[]>([]);
  const [lunches, setLunches] = useState<Recipe[]>([]);
  const [dinners, setDinners] = useState<Recipe[]>([]);

  const getFavouriteRecipesFromStorage = async () => {
    const savedFavourites = await AsyncStorage.getItem(
      FAVOURITE_RECIPES_STORAGE_KEY
    );
    if (savedFavourites) {
      const parsedRecipes = JSON.parse(savedFavourites);
      setFavouriteRecipes(parsedRecipes);
    }
  };

  const setFavouriteRecipesInStorage = async (recipes: number[]) => {
    await AsyncStorage.setItem(
      FAVOURITE_RECIPES_STORAGE_KEY,
      JSON.stringify(recipes)
    );
  };

  const addFavouriteRecipe = async (recipeId: number) => {
    const updatedFavourites = [...favouriteRecipes, recipeId];
    await setFavouriteRecipesInStorage(updatedFavourites);
    setFavouriteRecipes(updatedFavourites);
  };

  const removeFavouriteRecipe = async (recipeId: number) => {
    const favouriteRecipesClone = [...favouriteRecipes];
    const recipeIndex = favouriteRecipesClone.findIndex((r) => r === recipeId);
    favouriteRecipesClone.splice(recipeIndex, 1);
    await setFavouriteRecipesInStorage(favouriteRecipesClone);
    setFavouriteRecipes(favouriteRecipesClone);
  };

  const getMealsFromStorage = async () => {
    const [[, breakfasts], [, lunches], [, dinners]] =
      await AsyncStorage.multiGet([
        BREAKFAST_STORAGE_KEY,
        LUNCH_STORAGE_KEY,
        DINNER_STORAGE_KEY,
      ]);

    if (breakfasts) {
      const parsed = JSON.parse(breakfasts);
      setBreakfasts(parsed);
    }

    if (lunches) {
      const parsed = JSON.parse(lunches);
      setLunches(parsed);
    }

    if (dinners) {
      const parsed = JSON.parse(dinners);
      setDinners(parsed);
    }
  };

  const addMeal = async (meal: MealTypes, recipe: Recipe) => {
    await AsyncStorage.setItem(meal, JSON.stringify(recipe));

    if (meal === "breakfasts") {
      const mealClone = [...breakfasts];
      mealClone.push(recipe);
      setBreakfasts(mealClone);
    } else if (meal === "lunches") {
      const mealClone = [...lunches];
      mealClone.push(recipe);
      setLunches(mealClone);
    } else if (meal === "dinners") {
      const mealClone = [...dinners];
      mealClone.push(recipe);
      setDinners(mealClone);
    }
  };

  useEffect(() => {
    (async () => {
      await getFavouriteRecipesFromStorage();
      await getMealsFromStorage();
    })();
  }, []);

  const contextValue: IAccountContext = {
    favouriteRecipes,
    addFavouriteRecipe,
    removeFavouriteRecipe,
    addMeal,
    breakfasts,
    lunches,
    dinners,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);
