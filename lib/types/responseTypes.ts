import { Taxonomy } from "./taxonomyTypes";

export type QuizResponse = {
  id: number;
  question: string;
  answer: {
    taxonomy: Taxonomy;
    code: string;
    english_name: string;
    description: string | null;
    season: string | null;
    gcs: string | null;
    lcs: string | null;
    habitat: string | null;
  };

  options: string[];

  audio_url: string | null;
  image_url: string | null;
};
