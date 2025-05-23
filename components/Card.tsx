import { Image, ImageSource } from "expo-image";
import { StyleSheet, TextProps, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function Card({
  imagesrc,
  content,
  textProps,
  onClick,
}: {
  imagesrc: ImageSource;
  content: string;
  textProps?: TextProps;
  onClick?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onClick}>
      <Image source={imagesrc} style={styles.image} />
      <ThemedView style={styles.banner}>
        <ThemedText style={styles.bannerText} {...textProps} type="title">
          {content}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  banner: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -0.5 * 250 }], // half of banner width
    width: 250,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  bannerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
