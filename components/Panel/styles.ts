import { StyleSheet } from "react-native";
import { shared } from "../../styles";

export const styles = StyleSheet.create({
  panelConainer: {
    ...shared.mb20,
  },
  panelTitle: {
    ...shared.mb10,
    fontSize: 20,
    fontWeight: "bold",
  },
  panelContentContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
  },
});
