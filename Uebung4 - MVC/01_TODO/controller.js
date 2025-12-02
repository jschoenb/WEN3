import {todoModelInstance} from "./model.js";

class TodoController {
    #dom
    constructor(){
        this.#dom = {
            title: document.querySelector('#todo-title'),
            description: document.querySelector('#todo-description'),
            submit: document.querySelector('#todo-submit'),
            list: document.querySelector('todo-list')
        }
    }

    init(){
        // input handler
        this.#dom.submit.onclick=(ev) => {
            ev.preventDefault();
            let title = this.#dom.title.value;
            let description = this.#dom.description.value;
            if(title && description){
                todoModelInstance.add(title, description);
                this.#dom.title.value = "";
                this.#dom.description.value = "";
            } else {
                alert("Bitte einen Titel und Beschreibung eingeben!");
            }
        };

        //TODO: add event listener for deleting a task

        //TODO: add event listener for completing a task
    }
}

export const controllerInstance = new TodoController();
