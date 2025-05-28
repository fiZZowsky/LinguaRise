export class WordDTO {
  constructor({ Id, Name, Level, VocabularyCategoryName }) {
    this.id = Id;
    this.name = Name;
    this.level = Level?.Value ?? null;
    this.vocabularyCategoryName = VocabularyCategoryName;
  }
}