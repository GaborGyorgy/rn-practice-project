import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  children: ReactNode;
}

interface IAccountContext {
  favouriteRecipes: number[];
  addFavouriteRecipe: (recipeId: number) => Promise<void>;
  removeFavouriteRecipe: (recipeId: number) => Promise<void>;
}

export const AccountContext = createContext<IAccountContext>({
  favouriteRecipes: [],
  addFavouriteRecipe: async () => {},
  removeFavouriteRecipe: async () => {},
});

const FAVOURITE_RECIPES_STORAGE_KEY = "favouriteRecipes";

export const AccountProvider = ({ children }: Props): JSX.Element => {
  const [favouriteRecipes, setFavouriteRecipes] = useState<number[]>([]);

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

  useEffect(() => {
    (async () => {
      await getFavouriteRecipesFromStorage();
    })();
  }, []);

  const contextValue = {
    favouriteRecipes,
    addFavouriteRecipe,
    removeFavouriteRecipe,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);
