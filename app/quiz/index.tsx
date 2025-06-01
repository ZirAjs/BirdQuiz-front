import { QuizComponent } from "@/components/Quiz/QuizComponent";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { generateQuiz } from "@/lib/quiz/generateQuiz";
import { Quiz, QuizType } from "@/lib/types/quizTypes";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";

export default function QuizView() {
  // -- states
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [queue, setQueue] = useState<Quiz[]>([]);
  const [quizType, setQuizType] = useState<QuizType>(QuizType.AUDIO_CHOICE);
  const [userStatus, setUserStatus] = useState<string[]>([]);
  const [isPrefetching, setIsPrefetching] = useState(false);

  const quizCount = 10;
  const prefetchCount = 5;

  // -- keep the queue topped up to `prefetchCount`
  useEffect(() => {
    if (queue.length >= prefetchCount || isPrefetching) return;

    setIsPrefetching(true);
    generateQuiz()
      .then((q) => {
        if (!q) {
          Alert.alert("퀴즈 생성 실패");
          return;
        }
        setQueue((old) => [...old, q]);
      })
      .finally(() => {
        setIsPrefetching(false);
      });
  }, [queue, isPrefetching]);

  // -- on mount, also pull the very first active quiz from the queue when ready
  useEffect(() => {
    if (!quiz && queue.length > 0) {
      const [next, ...rest] = queue;
      setQuiz(next);
      setQuizType(
        Math.random() < 0.5 ? QuizType.AUDIO_CHOICE : QuizType.IMAGE_CHOICE
      );
      setQueue(rest);
    }
  }, [queue, quiz]);

  // -- advance to the next quiz
  const onNext = () => {
    if (quiz) {
      setUserStatus((prev) => [
        ...prev,
        quiz.answer.taxonomy.species.korean_name,
      ]);
    }

    if (queue.length > 0) {
      const [next, ...rest] = queue;
      setQuiz(next);
      setQuizType(
        Math.random() < 0.5 ? QuizType.AUDIO_CHOICE : QuizType.IMAGE_CHOICE
      );
      setQueue(rest);
    } else {
      // fallback if queue is empty for any reason
      generateQuiz().then((q) => {
        if (!q) {
          Alert.alert("퀴즈 생성 실패");
          return;
        }
        setQuiz(q);
        setQuizType(
          Math.random() < 0.5 ? QuizType.AUDIO_CHOICE : QuizType.IMAGE_CHOICE
        );
      });
    }
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

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.heading}>
        오늘의 {userStatus.length + 1}번째 퀴즈
      </ThemedText>
      <QuizComponent quiz={quiz} quizType={quizType} onNext={onNext} />
    </ThemedView>
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
});
