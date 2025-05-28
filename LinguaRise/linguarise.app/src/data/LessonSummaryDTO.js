import { WordDTO } from "../data/WordDTO";

export class LessonSummaryDTO {
constructor(data = {}) {
    this.languageName = data.languageName  ?? data.LanguageName  ?? "";
    this.flagImage    = data.flagImage     ?? data.FlagImage     ?? "";
    this.categoryName = data.categoryName  ?? data.CategoryName  ?? "";

    const raw = data.learnedWords ?? data.LearnedWords ?? [];
    this.learnedWords = Array.isArray(raw)
      ? raw.map(w => new WordDTO(w))
      : [];

    this.score = data.score ?? data.Score ?? 0;
  }
}