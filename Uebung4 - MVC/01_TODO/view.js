import {todoModelInstance} from "./model.js";

class TodoItem extends HTMLElement {
    //TODO private task property

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    //TODO getter and setter for task property

    render() {
        //TODO render the task in the shadow DOM

        //TODO click handler for update

        //TODO click handler for delete
    }
}
customElements.define('todo-item', TodoItem);


class TodoList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        //TODO register event listeners for the model
    }

    render() {
        //TODO render the list in the shadow DOM
    }

    addTask(task) {
        //TODO
    }

    removeTask(taskId) {
        //TODO
    }

    updateTask(updatedTask) {
        //TODO
    }
}
customElements.define('todo-list', TodoList);

