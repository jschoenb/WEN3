import { Todo } from './todo.js';

const STORAGE_KEY = 'todo-app.todos.v1';

/**
 * Model: hält die Todos, speichert sie in localStorage und meldet Änderungen per Event.
 * Events: task-added | task-removed | task-updated, jeweils mit detail.task (ein Todo).
 */
export class TodoModel extends EventTarget {
  #todos = new Map();
  #storageKey;

  constructor(storageKey = STORAGE_KEY) {
    super();
    this.#storageKey = storageKey;
    this.#load();
  }

  // Kopie als Array: die interne Map bleibt gekapselt
  getAll() {
    //TODO
  }

  add(title, description = '') {
    //TODO
  }

  remove(id) {
    //TODO
  }

  complete(id, isComplete) {
    //TODO
  }

  #commit(type, task) {
    this.#save();
    this.dispatchEvent(new CustomEvent(type, { detail: { task } }));
  }

  #load() {
    try {
      const raw = localStorage.getItem(this.#storageKey);
      for (const item of raw ? JSON.parse(raw) : []) {
        const task = Todo.fromJSON(item);
        if (task) this.#todos.set(task.id, task);
      }
    } catch (err) {
      console.warn('Could not read todos from localStorage:', err);
    }
  }

  #save() {
    try {
      localStorage.setItem(this.#storageKey, JSON.stringify(this.getAll()));
    } catch (err) {
      console.warn('Could not save todos to localStorage:', err);
    }
  }
}

export const todoModelInstance = new TodoModel();
