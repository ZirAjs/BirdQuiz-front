import ImageChoice from "./ImageChoice";
import { Quiz, QuizType } from "./QuizeType";

export function QuizComponent({
  QuizeType,
  quiz,
  selectedAnswer,
  onSelectAnswer,
}: {
  quiz: Quiz;
  QuizeType: QuizType;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}) {
  switch (QuizeType) {
    case QuizType.AUDIO_CHOICE:
      return null; // Implement audio choice component
    case QuizType.IMAGE_CHOICE:
      return (
        <ImageChoice
          {...quiz}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
        />
      );
    case QuizType.AUDIO_SHORT:
      return null; // Implement audio short component
    case QuizType.IMAGE_SHORT:
      return null; // Implement text input component
  }
}
