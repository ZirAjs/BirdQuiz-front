import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, type TextProps } from "react-native";

// import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = Colors.global.text;

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "SUITMedium",
  },
  defaultSemiBold: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "SUITSemiBold",
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: "SUITExtraBold",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "SUITMedium",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontFamily: "SUITRegular",
    color: "#0a7ea4",
  },
});
