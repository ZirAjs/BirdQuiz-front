import { generateQuiz } from "@/lib/quiz/generateQuiz";
import { QuizType, TypedQuiz } from "@/lib/types/quizTypes";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { EmbedHtml } from "../Embed";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";

const prefetchCount = 2;
const quizCount = 10; // Total number of quizzes to be solved

export default function QuizComponent() {
  const [action, setAction] = useState<"loading" | "solving" | "solved">(
    "loading"
  );
  const [isPrefetching, setIsPrefetching] = useState(false);
  const [quiz, setQuiz] = useState<TypedQuiz[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [guess, setGuess] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  // user management
  const [userStatus, setUserStatus] = useState<string[]>([]); // User's status, e.g., correct answers

  // Fetch quiz when queue is not full
  useEffect(() => {
    if (quiz.length >= quizCount || isPrefetching) return;

    setIsPrefetching(true);
    generateQuiz()
      .then((q) => {
        if (!q) {
          Alert.alert("퀴즈 생성 실패");
          return;
        }
        let t: QuizType = {
          image: Math.random() < 0.5,
          choice: Math.random() < 0.5,
        };

        let eq: TypedQuiz = {
          ...q,
          type: t,
        };
        setQuiz((old) => [...old, eq]);
      })
      .finally(() => {
        setIsPrefetching(false);
      });
  }, [quiz, isPrefetching]);

  const onSubmit = () => {
    if (!guess) return; // If no guess is made, do nothing
    if (quiz[current]!.answer.taxonomy.species.korean_name === guess) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
    setAction("solved"); // Change action to solved
    setUserStatus((prev) => [
      ...prev,
      quiz[current]!.answer.taxonomy.species.korean_name,
    ]); // Add the answer to user status
  };

  useEffect(() => {
    if (action === "loading" && quiz[current]) setAction("solving"); // Set action to solving when a quiz is available
  }, [action, current, quiz]);

  const onNext = () => {
    setCorrect(null); // Reset the correct state
    setGuess(null); // Reset the guess
    setCurrent((prev) => prev + 1); // Move to the next quiz
    setAction("loading");
  };

  // If we've reached the limit, show a “finished” state
  if (userStatus.length >= quizCount) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle" style={styles.heading}>
          퀴즈 완료!
        </ThemedText>
        <ThemedText>
          당신의 정답 기록:
          {userStatus.map((name, i) => (
            <ThemedText key={i}>• {name}</ThemedText>
          ))}
        </ThemedText>
      </ThemedView>
    );
  }

  if (action === "loading") {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle" style={styles.heading}>
          퀴즈를 불러오는 중...
        </ThemedText>
      </ThemedView>
    );
  }
  return (
    <ThemedScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle" style={styles.heading}>
          오늘의 {userStatus.length + 1}번째 퀴즈
        </ThemedText>
        <ThemedView>
          {quiz.map((q, i) => {
            if (i < current || i >= current + prefetchCount) return null; // Only render current and next quizzes
            return (
              <EmbedHtml
                key={i}
                src={q.type.image ? q.image_url! : q.audio_url!}
                hidden={i === current}
              />
            );
          })}
          <ThemedText type="default" style={styles.questionText}>
            {quiz[current] && quiz[current].question}
          </ThemedText>
          {/* radio buttons */}
          {quiz[current] &&
            quiz[current].options.map((choice) => (
              <TouchableOpacity
                key={choice}
                style={styles.choiceStyle}
                onPress={() => setGuess(choice)}
                disabled={action === "solved"}
              >
                <ThemedView style={styles.radioOuter}>
                  {guess === choice && <ThemedView style={styles.radioInner} />}
                </ThemedView>
                {action === "solved" && !correct && guess === choice ? (
                  <ThemedText type="default" style={styles.wrongchoiceText}>
                    {choice}
                  </ThemedText>
                ) : action === "solved" &&
                  quiz[current].answer.taxonomy.species.korean_name ===
                    choice ? (
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
        {action === "solved" && (
          <ThemedText type="default" style={styles.descriptionText}>
            {quiz[current]?.answer.description}
          </ThemedText>
        )}
        {action === "solving" ? (
          <ThemedButton title="" onPress={onSubmit} icon="checkmark" />
        ) : (
          <ThemedButton title="" onPress={onNext} icon="arrow.right" />
        )}
      </ThemedView>
    </ThemedScrollView>
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
    display: "flex",
  },
  descriptionText: {},

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
