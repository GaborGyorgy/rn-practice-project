import React, { FunctionComponent } from "react";
import { Text, TextProps, View } from "../Themed";
import { styles } from "./styles";

export const Title: FunctionComponent<
  { alignCenter?: boolean } & TextProps
> = ({ alignCenter, children, style, ...otherProps }) => (
  <View>
    <Text
      style={[
        { ...styles.title },
        style,
        { textAlign: alignCenter ? "center" : "left" },
      ]}
      {...otherProps}
    >
      {children}
    </Text>
  </View>
);
