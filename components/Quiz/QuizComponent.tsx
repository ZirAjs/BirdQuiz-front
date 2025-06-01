import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import {
  Quiz,
  QuizType,
  QuizType as quizType,
} from "../../lib/types/quizTypes";
import { EmbedHtml } from "../Embed";
import { ThemedButton } from "../ThemedButton";
import { ThemedScrollView } from "../ThemedScrollView";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export function QuizComponent({
  quizType,
  quiz,
  onNext,
}: {
  quiz: Quiz | null;
  quizType: quizType;
  onNext: () => void;
}) {
  const [guess, setGuess] = useState<string | null>(null); // User's guess
  const [ebirdSrc, setEbirdSrc] = useState(quiz ? quiz.image_url : "");
  const [buttonMode, setButtonMode] = useState<"submit" | "next">("submit"); // Button mode state
  const [incorrect, setIncorrect] = useState<boolean>(false); // State for incorrect guesses

  // onSubmit function to handle the user's guess
  const onBtnClick = () => {
    switch (buttonMode) {
      case "submit":
        if (!guess) return; // If no guess is made, do nothing
        setButtonMode("next"); // Change button mode to next
        handleSubmit();
        break;
      case "next":
        setButtonMode("submit"); // Change button mode to submit
        handleNext();
    }
  };

  const handleSubmit = () => {
    if (quiz?.answer.taxonomy.species.korean_name !== guess) {
      setIncorrect(true); // Set incorrect state if the guess is wrong
      return;
    }
    // If the guess is correct, add it to the user status
    // setUserStatus((prevStatus) => [...prevStatus, guess]);
    setGuess(null); // Reset the guess
  };

  const handleNext = () => {
    setGuess(null); // Reset the guess
    setEbirdSrc(null); // Clear the eBird source
    onNext(); // Set the next quiz as the current quiz
    setButtonMode("submit"); // Reset button mode to submit
  };

  useEffect(() => {
    console.log("QuizComponent useEffect", quiz, quizType);
    switch (quizType) {
      case QuizType.AUDIO_CHOICE:
      case QuizType.AUDIO_SHORT:
        if (quiz?.audio_url) {
          setEbirdSrc(quiz.audio_url);
        }
        break;
      case QuizType.IMAGE_CHOICE:
      case QuizType.IMAGE_SHORT:
        if (quiz?.image_url) {
          setEbirdSrc(quiz.image_url);
        }
        break;
    }
  }, [quiz, quizType]);

  return (
    <ThemedScrollView>
      <ThemedView>
        {ebirdSrc ? (
          <EmbedHtml src={ebirdSrc} styles={styles.embedStyle} />
        ) : (
          <ThemedText type="default">불러오는 중...</ThemedText>
        )}

        <ThemedText type="default" style={styles.questionText}>
          {quiz && quiz.question}
        </ThemedText>
        {/* radio buttons */}
        {quiz &&
          quiz.options.map((choice) => (
            <TouchableOpacity
              key={choice}
              style={styles.choiceStyle}
              onPress={() => setGuess(choice)}
              disabled={buttonMode === "next"}
            >
              <ThemedView style={styles.radioOuter}>
                {guess === choice && <ThemedView style={styles.radioInner} />}
              </ThemedView>
              {buttonMode === "next" && incorrect && guess === choice ? (
                <ThemedText type="default" style={styles.wrongchoiceText}>
                  {choice}
                </ThemedText>
              ) : buttonMode === "next" &&
                quiz.answer.taxonomy.species.korean_name === choice ? (
                <ThemedText type="default" style={styles.correctchoiceText}>
                  {choice}
                </ThemedText>
              ) : (
                <ThemedText type="default" style={styles.choiceText}>
                  {choice}
                </ThemedText>
              )}
            </TouchableOpacity>
          ))}
      </ThemedView>
      {buttonMode === "next" && (
        <ThemedText type="default" style={styles.descriptionText}>
          {quiz?.answer.description}
        </ThemedText>
      )}
      {buttonMode === "submit" ? (
        <ThemedButton title="" onPress={onBtnClick} icon="checkmark" />
      ) : (
        <ThemedButton title="" onPress={onBtnClick} icon="arrow.right" />
      )}
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  descriptionText: {},
  embedStyle: {
    width: 290,
    height: 200,
  },

  choiceStyle: {
    flexDirection: "row",
    marginVertical: 5,
    alignContent: "center",
    alignItems: "center",
  },

  questionText: {
    marginTop: 10,
    marginBottom: 10,
  },

  choiceText: {
    marginTop: 4,
    marginBottom: 4,
  },

  wrongchoiceText: {
    backgroundColor: "#ffcccc", // Light red background for wrong choices
    marginTop: 4,
    marginBottom: 4,
  },

  correctchoiceText: {
    backgroundColor: "#ccffcc", // Light green background for correct choices
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
