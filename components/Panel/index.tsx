import React, { FunctionComponent } from "react";
import { styles } from "./styles";
import { View } from "../Themed";
import { Title } from "../Title";

export const Panel: FunctionComponent<{ title?: string }> = ({
  title,
  children,
}) => {
  return (
    <View style={styles.panelConainer}>
      {title && <Title style={styles.panelTitle}>Nutrition</Title>}
      <View style={styles.panelContentContainer}>{children}</View>
    </View>
  );
};
