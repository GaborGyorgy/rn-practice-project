import { FunctionComponent } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../Themed";
import { Recipe } from "../../types";
import { Panel } from "../Panel";

export const MealSummaryPanel: FunctionComponent<{
  panelTitle: string;
  data: Recipe[];
}> = ({ panelTitle, data }) => {
  return (
    <Panel title={panelTitle}>
      {data && (
        <View style={styles.mealPanelView}>
          <Text style={styles.mealPanelText}>
            Things eaten: {data.map((b) => b.title).join(", ")}
          </Text>
          <Text style={styles.mealPanelText}>
            Total calories:{" "}
            {data.reduce<number>(
              (total, b) => (total += parseInt(b.calories.split("k")[0], 10)),
              0
            )}
          </Text>
          <Text style={styles.mealPanelText}>
            Total protein:{" "}
            {data.reduce<number>(
              (total, b) => (total += parseInt(b.protein.split("g")[0], 10)),
              0
            )}
          </Text>
          <Text style={styles.mealPanelText}>
            Total fat:{" "}
            {data.reduce<number>(
              (total, b) => (total += parseInt(b.fat.split("g")[0], 10)),
              0
            )}
          </Text>
          <Text style={styles.mealPanelText}>
            Total carbs:{" "}
            {data.reduce<number>(
              (total, b) => (total += parseInt(b.carbs.split("g")[0], 10)),
              0
            )}
          </Text>
        </View>
      )}
    </Panel>
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
  mealPanelView: {
    backgroundColor: "#fff",
  },
  mealPanelText: {
    marginBottom: 10,
  },
});

export default MealSummaryPanel;
