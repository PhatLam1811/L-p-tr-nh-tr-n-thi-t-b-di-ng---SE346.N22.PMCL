class Note {
    constructor(ID,title, subTitle, content,createDate,image,url,color) {       
        this.ID=ID;
        this.title = title;
        this.subTitle = subTitle;
        this.content = content;
        this.createDate = createDate;
        this.image=image;
        this.url=url;
        this.color = color;
    }
    static create(...args) {
        
        const [ID,title, subTitle, content,createDate,type] = args;
        if(ID === null || ID === undefined||
            title === null || title === undefined||
            subTitle === null || subTitle === undefined||
            content === null || content === undefined||
            createDate === null || createDate === undefined||
            type === null
            ) {
          return null;
        }
        return new Note(...args);
      }

  }
  module.exports = Note;
