import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  Button,
  Keyboard,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Text, View } from "../components/Themed";
import { RecipeInfo, RootStackScreenProps } from "../types";
import { spooncular } from "../api";

export default function SearchRecipeScreen({
  navigation,
}: RootStackScreenProps<"SearchRecipe">) {
  const [text, onChangeText] = useState<string>();
  const [hasError, setHasError] = useState(false);
  const [recipes, setRecipes] = useState<RecipeInfo[]>([]);

  const colorScheme = useColorScheme();

  const handleSearch = async () => {
    setHasError(false);
    try {
      if (text) {
        Keyboard.dismiss();
        const { results } = await spooncular.searchRecipes(text);
        setRecipes(results);
      } else {
        setHasError(true);
      }
    } catch (e) {
      throw e;
    }
  };

  const onRecipePress = (
    recipeId: number,
    recipeName: string,
    recpieImage: string
  ) => {
    navigation.navigate("Recipe", { recipeId, recipeName, recpieImage });
  };

  const renderItem = ({ item }: ListRenderItemInfo<RecipeInfo>) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => onRecipePress(item.id, item.title, item.image)}
    >
      <View style={styles.recipeCard}>
        <Image
          source={{ uri: item.image, width: 312, height: 231 }}
          style={{ width: 312, height: 231 }}
          resizeMode="cover"
        />
        <Text style={styles.recipeText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        darkColor="rgba(255,255,255,0.1)"
        lightColor="#000"
      >
        Search for a recipe
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {hasError && (
        <Text style={{ color: "red" }}>
          Please type something in the search bar first{" "}
        </Text>
      )}
      <TextInput
        style={{ ...styles.input }}
        value={text}
        onChangeText={onChangeText}
        placeholder="Food search"
      />
      <Button onPress={handleSearch} title="Search" />
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  list: {
    marginTop: 20,
    padding: 5,
  },
  recipeCard: {
    borderColor: "#eee",
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  recipeText: {
    padding: 10,
    fontSize: 14,
    marginTop: 5,
  },
});
