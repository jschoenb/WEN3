import {todoModelInstance} from "./model.js";

class TodoItem extends HTMLElement {
    #task

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    get task() {
        return this.#task;
    }

    set task(task) {
        this.#task = task;
        this.render();
    }

    render() {
        console.log("in render of item");
        this.shadowRoot.innerHTML = `
            <style>
              li { display: flex; justify-content: space-between; align-items: center; padding: 0.5em 0; }
              span.completed { text-decoration: line-through; color: grey; }
              button { margin-left: 1em; }
            </style>
            <li>
            <button id="update">${this.#task.complete ? 'Open' : 'Close'}</button>
            <span class="${this.#task.complete ? 'completed' : ''}">
                                ${this.#task.title}: ${this.#task.description}
            </span>
            <button id="delete">Delete</button>
            </li>
        `;

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
        todoModelInstance.addEventListener("addTask",
            (e)=>this.addTask(e.detail.task));
    }

    render() {
        this.shadowRoot.innerHTML = `<ul id="list"></ul>`;
        const list = this.shadowRoot.querySelector('ul');
        for(const [key,task] of todoModelInstance.getList()){
            const item = document.createElement('todo-item');
            item.task = task;
            list.appendChild(item);
        }
    }

    addTask(task) {
        console.log("Adding task: ", task);
        const item = document.createElement('todo-item');
        item.task = task;
        this.shadowRoot.querySelector('#list').appendChild(item);
    }

    removeTask(taskId) {
        //TODO
    }

    updateTask(updatedTask) {
        //TODO
    }
}
customElements.define('todo-list', TodoList);

