import { Quiz, QuizType } from "@/components/Quiz/QuizeType";

export function generateQuiz(quizType: QuizType): Quiz {
  // DO BACKEND CALL
  let quiz: Quiz = {
    question: "이것은 무슨 새인가요?",
    answer: "비둘기",
    audiosrc: "https://example.com/audio.mp3",
    imagesrc: {
      uri: "https://cdn.download.ams.birds.cornell.edu/api/v2/asset/308074121/1200",
    },
    choices: ["비둘기", "참새", "멧비둘기", "까마귀"],
  };
  return quiz;
}
