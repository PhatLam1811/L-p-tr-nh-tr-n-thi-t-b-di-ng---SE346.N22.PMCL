class NoteTask extends Note{
    constructor(ID,title, subTitle, content,createDate,type,toDoList) {
        super(ID);
        super(title);
        super(subTitle);
        super(content);
        super(createDate);
        super(type);
        this.toDoList=toDoList;

    }

    static create(...args) {
        const [ID,title, subTitle, content,createDate,type] = args;
        if(ID === null || ID === undefined||
            title === null || title === undefined||
            subTitle === null || subTitle === undefined||
            content === null || content === undefined||
            createDate === null || createDate === undefined||
            type === null || type === undefined
            ) {
          return null;
        }
        return new Note(...args);
      }
  }
  module.exports = NoteTask;
