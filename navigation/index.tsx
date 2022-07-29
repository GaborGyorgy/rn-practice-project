/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, Platform } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  ModalScreen,
  NotFoundScreen,
  RecipeScreen,
  SearchRecipeScreen,
} from "../screens";
import {
  RootStackParamList,
  RootStackScreenProps,
  RootTabParamList,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { useAccount } from "../context";
import {
  showSuccessAddFavouriteToast,
  showSuccuessRemoveFavouriteToast,
} from "../helpers";
import { FavouriteRecipeIcon } from "../components";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchRecipe"
        component={SearchRecipeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />

      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={({ navigation, route }: RootStackScreenProps<"Recipe">) => ({
          headerTitle: "",
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
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
          ),
          headerRight: () => (
            <FavouriteRecipeIcon recipeId={route.params.recipeId} />
          ),
        })}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

{
  /* <BottomTab.Screen
name="Recipe"
component={RecipeScreen}
options={({ navigation }: RootTabScreenProps<"Recipe">) => ({
  headerTitle: "",
  tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
  headerLeft: () => (
    <Pressable
      onPress={() => navigation.goBack()}
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
  ),
})}
/> */
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

//   return (
//     <BottomTab.Navigator
//       initialRouteName="SearchRecipe"
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme].tint,
//       }}
//       backBehavior="history"
//     >
//       <BottomTab.Screen
//         name="SearchRecipe"
//         component={SearchRecipeScreen}
//         options={({ navigation }: RootTabScreenProps<"SearchRecipe">) => ({
//           title: "Tab One",
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//           headerRight: () => (
//             <Pressable
//               onPress={() => navigation.navigate("Modal")}
//               style={({ pressed }) => ({
//                 opacity: pressed ? 0.5 : 1,
//               })}
//             >
//               <FontAwesome
//                 name="info-circle"
//                 size={25}
//                 color={Colors[colorScheme].text}
//                 style={{ marginRight: 15 }}
//               />
//             </Pressable>
//           ),
//         })}
//       />
//     </BottomTab.Navigator>
//   );
// }

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
