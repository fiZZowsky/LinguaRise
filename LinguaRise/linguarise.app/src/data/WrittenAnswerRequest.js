export class WrittenAnswerRequest {
  constructor({ answer, lessonId, wordId, languageId }) {
    this.answer = answer;
    this.lessonId = lessonId;
    this.wordId = wordId;
    this.languageId = languageId;
  }
}