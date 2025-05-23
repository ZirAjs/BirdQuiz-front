import { QuizComponent } from "@/components/Quiz/QuizComponent";
import { Quiz, QuizType } from "@/components/Quiz/QuizeType";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { generateQuiz } from "@/lib/quiz/generateQuiz";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function QuizView() {
  // Define states for the quiz
  const [quiz, setQuiz] = useState<Quiz | null>(null); // Current quiz
  const [quizType, setQuizType] = useState<QuizType | null>(null); // Type of the quiz
  const [guess, setGuess] = useState<string | null>(null); // User's guess

  const [userStatus, setUserStatus] = useState<string[]>([]); // User's status

  // Local limit of the quiz count
  const quizCount = 10;

  // If the quiz count is less than the limit, set the quiz
  // Else, return to the quiz result screen
  useEffect(() => {
    if (userStatus.length < quizCount) {
      let q = generateQuiz(QuizType.IMAGE_CHOICE); // Generate a new quiz
      setQuiz(q); // Set the quiz
      setQuizType(QuizType.IMAGE_CHOICE); // Set the quiz type
    } else {
      // Navigate to the quiz result screen (not implemented here)
    }
  }, [userStatus]); // Depend on status and guess

  // If the quiz is not set, return null
  if (!quiz) {
    return null;
  }

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle" style={styles.heading}>
          오늘의 {userStatus.length + 1}번째 퀴즈
        </ThemedText>
        <QuizComponent
          quiz={quiz}
          QuizeType={quizType ? quizType : QuizType.AUDIO_CHOICE}
          selectedAnswer={guess}
          onSelectAnswer={setGuess}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: 30,
    paddingTop: 40,
    paddingBottom: 20,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    padding: 20,
    paddingTop: 20,
  },
});
