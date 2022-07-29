import { useEffect, useState } from "react";
import { StyleSheet, Image, FlatList, ListRenderItemInfo } from "react-native";

import { InstructionStep, MainMacros, RootStackScreenProps } from "../types";
import { spooncular } from "../api";
import { shared } from "../styles";
import { Panel, Text, View, ScrollView } from "../components";
import { Title } from "../components/Title";

export default function RecipeScreen({
  route,
}: RootStackScreenProps<"Recipe">) {
  const [nutrition, setNutrition] = useState<MainMacros>();
  const [instructions, setInstructions] = useState<InstructionStep[]>([]);

  const { recipeId, recipeName, recpieImage } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const [{ steps }, { calories, carbs, fat, protein }] = await Promise.all([
        spooncular.getInstructionsByRecipeId(recipeId),
        spooncular.getNutritionByRecipeId(recipeId),
      ]);

      setNutrition({ calories, carbs, fat, protein });
      setInstructions(steps);
    };
    fetchData();
  }, [recipeId]);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.imageContainer, shared.mb20]}>
        <Image source={{ uri: recpieImage }} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Title alignCenter>{recipeName}</Title>

        <Panel title="Nutrition">
          <Text>Calories: {nutrition?.calories}</Text>
          <Text>Protein: {nutrition?.protein}</Text>
          <Text>Carbs: {nutrition?.carbs}</Text>
          <Text>Fat: {nutrition?.fat}</Text>
        </Panel>

        <View>
          <Title style={shared.mb10}>Instructions</Title>
          {instructions.map(({ step, ingredients }) => (
            <Panel>
              <Text style={{ marginBottom: 10 }}>{step}</Text>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Ingredients:</Text>{" "}
                {ingredients.map((i) => i.name).join(", ")}
              </Text>
            </Panel>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "100%",
  },
  imageContainer: {
    marginHorizontal: -20,
  },
  image: { width: "100%", height: 230 },
});
