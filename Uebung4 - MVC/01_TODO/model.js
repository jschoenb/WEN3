
class ToDoModel extends EventTarget {
    static id = 0;
    constructor() {
        super();
        this.todoList = new Map();
    }

    getList () {
        return this.todoList;
    }

    add(title,description) {
        //TODO
    }

    remove(taskId) {
        //TODO
    }

    complete(taskId, isComplete) {
        //TODO
    }
}

export const todoModelInstance = new ToDoModel();

