import { FontAwesome } from "@expo/vector-icons";
import React, { FunctionComponent } from "react";
import { Pressable } from "react-native";

interface Props {
  isFavourite: boolean;
  handleOnPress: () => void;
}

export const FavouriteIcon: FunctionComponent<Props> = ({
  handleOnPress,
  isFavourite,
}) => (
  <Pressable
    style={({ pressed }) => ({
      opacity: pressed ? 0.5 : 1,
    })}
    onPress={handleOnPress}
  >
    <FontAwesome
      name={isFavourite ? "heart" : "heart-o"}
      size={25}
      color="red"
      style={{ marginRight: 15 }}
    />
  </Pressable>
);
