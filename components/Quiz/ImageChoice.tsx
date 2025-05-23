import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedScrollView } from "../ThemedScrollView";
import { QuizWithAnswer } from "./QuizeType";

export default function QImageChoice({
  question,
  answer,
  audiosrc,
  imagesrc,
  choices,
  selectedAnswer,
  onSelectAnswer,
}: QuizWithAnswer) {
  if (!imagesrc) {
    return null;
  }
  if (!choices) {
    return null;
  }
  return (
    <ThemedScrollView>
      <ThemedView>
        <Image
          source={imagesrc}
          style={styles.imageStyle}
          contentFit="contain"
        />
        <ThemedText type="default" style={styles.questionText}>
          {question}
        </ThemedText>
        {/* radio buttons */}
        {choices.map((choice) => (
          <TouchableOpacity
            key={choice}
            style={styles.choiceStyle}
            onPress={() => onSelectAnswer(choice)}
          >
            <ThemedView style={styles.radioOuter}>
              {selectedAnswer === choice && (
                <ThemedView style={styles.radioInner} />
              )}
            </ThemedView>
            <ThemedText type="default" style={styles.choiceText}>
              {choice}
            </ThemedText>
          </TouchableOpacity>
        ))}
        <ThemedButton title="" onPress={() => {}} icon="checkmark" />
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    maxWidth: 600,
    maxHeight: 200,
    height: "100%",
    width: "100%",
  },

  choiceStyle: {
    flexDirection: "row",
    marginVertical: 5,
    alignContent: "center",
    alignItems: "center",
  },

  questionText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  choiceText: {
    fontSize: 20,
    marginTop: 4,
    marginBottom: 4,
  },

  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.global.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.global.primary,
  },
});
