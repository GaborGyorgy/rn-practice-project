import { FontAwesome } from "@expo/vector-icons";
import React, { FunctionComponent } from "react";
import { Pressable, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { useColorScheme } from "../../hooks";

export const NavBackButton: FunctionComponent = () => {
  const { goBack } = useNavigation();
  const colorScheme = useColorScheme();
  return (
    <Pressable
      onPress={() => goBack()}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <FontAwesome
        name={Platform.OS === "android" ? "arrow-left" : "chevron-left"}
        size={25}
        color={Colors[colorScheme].text}
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
};

export default NavBackButton;
