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
  }
  