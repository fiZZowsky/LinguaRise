export class CourseDTO {
  constructor({ userId = null, languageId = null } = {}) {
    this.id = 0;
    this.userId = userId;
    this.userName = null;
    this.userEmail = null;
    this.languageId = languageId;
    this.languageCode = null;
    this.languageName = null;
    this.lessons = [];
  }
}