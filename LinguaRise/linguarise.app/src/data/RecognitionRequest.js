export class RecognitionRequest {
constructor({ lessonId, languageId, wordId, recognizedText }) {
        this.lessonId = lessonId;
        this.languageId = languageId;
        this.wordId = wordId;
        this.recognizedText = recognizedText
    }
}