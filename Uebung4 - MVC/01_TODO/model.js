
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
        let task = this.todoList.get(Number(taskId));
        this.todoList.delete(Number(taskId));
        let event = new CustomEvent("deleteTask",{
            detail: {task: task.id}
        })
        this.dispatchEvent(event);
    }

    complete(taskId) {
        let entry = this.todoList.get(Number(taskId));
        if(entry){
            entry.complete = !entry.complete;
            console.log(this.todoList.get(Number(taskId)));
            let event = new CustomEvent("updateTask",{
                detail: entry
            })
            this.dispatchEvent(event);
        }
    }
}

export const todoModelInstance = new ToDoModel();

