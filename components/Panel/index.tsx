import React, { FunctionComponent } from "react";
import { styles } from "./styles";
import { View } from "../Themed";
import { Title } from "../Title";

export const Panel: FunctionComponent<{
  title?: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <View style={styles.panelConainer}>
      {title && <Title style={styles.panelTitle}>{title}</Title>}
      <View style={styles.panelContentContainer}>{children}</View>
    </View>
  );
};
