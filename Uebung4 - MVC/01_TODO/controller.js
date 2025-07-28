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
            //TODO:
            return false;
        };

        //TODO: add event listener for deleting a task

        //TODO: add event listener for completing a task
    }
}

export const controllerInstance = new TodoController();
