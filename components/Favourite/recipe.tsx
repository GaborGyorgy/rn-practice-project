import React, { FunctionComponent } from "react";
import { useAccount } from "../../context";
import {
  showSuccessAddFavouriteToast,
  showSuccuessRemoveFavouriteToast,
} from "../../helpers";
import { FavouriteIcon } from "./icon";

interface Props {
  recipeId: number;
}

export const FavouriteRecipeIcon: FunctionComponent<Props> = ({ recipeId }) => {
  const { addFavouriteRecipe, favouriteRecipes, removeFavouriteRecipe } =
    useAccount();

  const currentRecipeIsAFavourite = favouriteRecipes.includes(recipeId);

  const onFavouritePress = async () => {
    if (currentRecipeIsAFavourite) {
      await removeFavouriteRecipe(recipeId);
      showSuccuessRemoveFavouriteToast();
    } else {
      await addFavouriteRecipe(recipeId);
      showSuccessAddFavouriteToast();
    }
  };

  return (
    <FavouriteIcon
      handleOnPress={onFavouritePress}
      isFavourite={currentRecipeIsAFavourite}
    />
  );
};
