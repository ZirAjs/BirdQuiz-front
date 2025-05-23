import { Colors } from "@/constants/Colors";
import { StyleSheet, View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  return <View style={[styles.container, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
    backgroundColor: Colors.global.background,
  },
});
