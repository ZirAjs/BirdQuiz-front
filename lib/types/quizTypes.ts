import { QuizResponse } from "./responseTypes";

export type Quiz = QuizResponse;

export type QuizWithAnswer = { quiz: Quiz } & {
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
};

export type TypedQuiz = Quiz & { type: QuizType };

export type QuizType = {
  image: boolean;
  choice: boolean;
};
