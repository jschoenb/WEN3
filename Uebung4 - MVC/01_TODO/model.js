
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
        let task =  {
            title: title,
            description: description,
            complete :false,
            id : ++ToDoModel.id
        }
        this.todoList.set(task.id, task);
        let event = new CustomEvent("addTask",
            { detail: {task: task} });
        this.dispatchEvent(event);
    }

    remove(taskId) {
        //TODO
    }

    complete(taskId, isComplete) {
        //TODO
    }
}

export const todoModelInstance = new ToDoModel();

