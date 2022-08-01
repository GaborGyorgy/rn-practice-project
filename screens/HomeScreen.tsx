import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ScrollView, Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { useAccount } from "../context";
import { Title } from "../components/Title";
import { MealSummaryPanel } from "../components";

export const HomeScreen = ({
  navigation,
}: RootStackScreenProps<"NotFound">) => {
  const {
    meals: { breakfasts, dinners, lunches },
  } = useAccount();

  useEffect(() => {}, [breakfasts, dinners, lunches]);

  return (
    <View style={styles.container}>
      <Title style={styles.title} alignCenter>
        Home screen
      </Title>
      <ScrollView>
        <MealSummaryPanel panelTitle="Breakfasts" data={breakfasts} />
        <MealSummaryPanel panelTitle="Lunches" data={lunches} />
        <MealSummaryPanel panelTitle="Dinners" data={dinners} />
        <MealSummaryPanel
          panelTitle="Day"
          data={[...breakfasts, ...lunches, ...dinners]}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  title: {
    marginBottom: 30,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  mealPanelView: {
    backgroundColor: "#fff",
  },
  mealPanelText: {
    marginBottom: 10,
  },
});

export default HomeScreen;
