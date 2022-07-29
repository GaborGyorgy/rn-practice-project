import Toast, { ToastOptions } from "react-native-root-toast";

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
