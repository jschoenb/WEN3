
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
        let task = {
            id : ++ToDoModel.id,
            title : title,
            description : description,
            complete : false
        }
        this.todoList.set(task.id, task);
        let event = new CustomEvent("addTask",{detail:{task:task}});
        this.dispatchEvent(event);
    }

    remove(taskId) {
        this.todoList.delete(taskId);
        let event = new CustomEvent("deleteTask",{detail:taskId});
        this.dispatchEvent(event);
    }

    complete(taskId) {
        let task = this.todoList.get(taskId);
        task.complete = !task.complete;
        let event = new CustomEvent("updateTask",{detail:task});
        this.dispatchEvent(event);
    }
}

export const todoModelInstance = new ToDoModel();

