import { Quiz } from "./quizTypes";
import { QuizResponse } from "./responseTypes";

export function parseQuizResponse(response: QuizResponse): Quiz {
  return response as Quiz;
}
