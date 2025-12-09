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
        this.shadowRoot.querySelector("#update").onclick = (e) => {
            this.dispatchEvent(new CustomEvent('update-task',{
                detail: this.#task.id,
                bubbles: true,
                composed: true,
            }));
        }
        //TODO click handler for delete
        this.shadowRoot.querySelector("#delete").onclick = (e) => {
            this.dispatchEvent(new CustomEvent('delete-task',{
                detail: this.#task.id,
                bubbles: true,
                composed: true,
            }));
        }
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
        todoModelInstance.addEventListener("deleteTask",
            (e)=>{
                console.log(`Task ${e.detail} is ready to be deleted in the view`);
                this.removeTask(e.detail);
            });
        todoModelInstance.addEventListener("updateTask",
            (e)=>{
                this.updateTask(e.detail);
            });
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
        const items = this.shadowRoot.querySelectorAll('todo-item');
        for(const currentItem of items) {
            if(currentItem.task.id === taskId) {
                currentItem.remove();
                break;
            }
        }
    }

    updateTask(updatedTask) {
        console.log("Should update Task ",updatedTask);
        const items = this.shadowRoot.querySelectorAll('todo-item');
        for(const currentItem of items) {
            if(currentItem.task.id === updatedTask.id) {
                currentItem.task = updatedTask;
                break;
            }
        }
    }
}
customElements.define('todo-list', TodoList);

