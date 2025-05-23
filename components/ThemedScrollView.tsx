import { Colors } from "@/constants/Colors";
import React, { ReactNode } from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "./ThemedView";

type ThemedScrollViewProps = {
  children: ReactNode;
} & ScrollViewProps;

export const ThemedScrollView = ({
  children,
  ...props
}: ThemedScrollViewProps) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: insets.bottom + 40 }, // tab bar + extra padding
        props.contentContainerStyle,
      ]}
      {...props}
    >
      <ThemedView style={styles.view}>{children}</ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.global.background,
  },
  contentContainer: {
    flexGrow: 1, // key to stretching content inside ScrollView
    justifyContent: "flex-start", // or "space-between"/"center" as needed
  },
  view: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    padding: 20,
  },
});
