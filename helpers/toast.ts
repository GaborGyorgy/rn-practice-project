import Toast, { ToastOptions } from "react-native-root-toast";
import { MealTypes } from "../types";

const toastOptions: ToastOptions = {
  duration: Toast.durations.SHORT,
  animation: true,
  position: Toast.positions.BOTTOM,
  hideOnPress: true,
  shadow: true,
};

export const showSuccessAddFavouriteToast = () => {
  Toast.show("Successfully removed from favourites", toastOptions);
};

export const showSuccuessRemoveFavouriteToast = () => {
  Toast.show("Successfully added to favourites", toastOptions);
};

export const showSuccessAddToMealToast = (meal: MealTypes) => {
  Toast.show(`Successfully added to ${meal}.`, toastOptions);
};
