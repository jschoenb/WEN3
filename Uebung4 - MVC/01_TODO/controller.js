import { todoModelInstance } from './model.js';

/**
 * Controller: verbindet Eingaben (Formular, Events der Komponenten) mit dem Model.
 * Die View wird durch das Model aktualisiert, nicht direkt vom Controller.
 */
export class TodoController {
  #model;

  constructor(model = todoModelInstance) {
    this.#model = model;
  }

  init() {
    const form = document.querySelector('#todo-form');
    const title = document.querySelector('#todo-title');
    const description = document.querySelector('#todo-description');
    const list = document.querySelector('todo-list');

    if (list) {
      //TODO: Model mit der View verbinden
    }

    form?.addEventListener('submit', (e) => {
      //TODO
    });
  }
}
