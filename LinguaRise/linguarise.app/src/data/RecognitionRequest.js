export class RecognitionRequest {
    constructor({lessonId, languageId, wordId, recognizedText}){
        this.recognizedText = recognizedText;
        this.lessonId = lessonId;
        this.wordId = wordId;
        this.recognizedText = recognizedText;
    }
}