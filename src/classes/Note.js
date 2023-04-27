/* eslint-disable*/

class Note {
  constructor(title, content, subtitle, image, miscellaneous) {
    this.title = title;
    this.content = content;
    this.subtitle = subtitle;
    this.image = image;
    this.miscellaneous = miscellaneous;

    this.date = Date.now();
  }
}
