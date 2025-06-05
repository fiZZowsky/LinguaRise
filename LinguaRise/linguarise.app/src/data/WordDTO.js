export class WordDTO {
  constructor(data = {}) {
    this.id = data.Id ?? data.id;
    this.name = data.Name ?? data.name;

    const levelData = data.Level ?? data.level;
    this.level =
      levelData && typeof levelData === "object"
        ? levelData.Value ?? levelData.value ?? null
        : levelData ?? null;

    this.vocabularyCategoryName =
      data.VocabularyCategoryName ?? data.vocabularyCategoryName;
  }
}