import { Quiz } from "@/lib/types/quizTypes";
import { parseQuizResponse } from "@/lib/types/responseParsers";
import { fetch } from "expo/fetch";
import { Alert, Platform } from "react-native";

export async function generateQuiz(): Promise<Quiz | null> {
  let baseUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
  if (!baseUrl) {
    Alert.alert(
      "환경 변수 오류",
      "EXPO_PUBLIC_BACKEND_URL이 설정되지 않았습니다."
    );
    return null;
  }
  if (Platform.OS === "android") {
    baseUrl.replace("localhost", "10.0.2.2");
  }

  let quiz: Quiz | null = await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/quiz/`
  )
    .then(async (res) => res.json().then(parseQuizResponse))
    .catch((err) => {
      Alert.alert("에러", err.message);
      return null;
    });

  return quiz;
}
