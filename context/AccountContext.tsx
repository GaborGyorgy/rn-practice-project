import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meals, MealTypes, Recipe } from "../types";

interface Props {
  children: ReactNode;
}
interface IAccountContext {
  favouriteRecipes: number[];
  addFavouriteRecipe: (recipeId: number) => Promise<void>;
  removeFavouriteRecipe: (recipeId: number) => Promise<void>;
  addMeal: (meal: MealTypes, recipe: Recipe) => Promise<void>;
  meals: Meals;
}

export const AccountContext = createContext<IAccountContext>({
  favouriteRecipes: [],
  addFavouriteRecipe: async () => {},
  removeFavouriteRecipe: async () => {},
  addMeal: async (meal: MealTypes, recipe: Recipe) => {},
  meals: { breakfasts: [], lunches: [], dinners: [] },
});

const FAVOURITE_RECIPES_STORAGE_KEY = "favouriteRecipes";

const MEALS_STORAGE_KEY = "meals";

// this should be renamed to something else but i havent decided a proper name yet
export const AccountProvider = ({ children }: Props): JSX.Element => {
  const [favouriteRecipes, setFavouriteRecipes] = useState<number[]>([]);
  const [meals, setMeals] = useState<Meals>({
    breakfasts: [],
    lunches: [],
    dinners: [],
  });

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
    const mealsInStorage = await AsyncStorage.getItem(MEALS_STORAGE_KEY);

    if (mealsInStorage) {
      setMeals(JSON.parse(mealsInStorage));
    }
  };

  const addMeal = async (meal: MealTypes, recipe: Recipe) => {
    const mealsClone = Object.assign({}, meals);
    mealsClone[meal].push(recipe);
    setMeals(mealsClone);
    await AsyncStorage.setItem(MEALS_STORAGE_KEY, JSON.stringify(mealsClone));
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
    meals,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);
