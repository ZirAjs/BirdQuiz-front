import { ImageSource } from "expo-image";

export type Quiz = {
  question: string;
  answer: string;
  audiosrc?: string;
  imagesrc?: ImageSource;
  choices?: string[];
};

export type QuizWithAnswer = Quiz & {
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
};

export const enum QuizType {
  AUDIO_CHOICE,
  AUDIO_SHORT,
  IMAGE_CHOICE,
  IMAGE_SHORT,
}
