import { QuizResponse } from "./responseTypes";

export type Quiz = QuizResponse;

export type QuizWithAnswer = { quiz: Quiz } & {
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
};

export const enum QuizType {
  AUDIO_CHOICE,
  AUDIO_SHORT,
  IMAGE_CHOICE,
  IMAGE_SHORT,
}
