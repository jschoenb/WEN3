import { cloneTemplate } from './template.js';

/** <employee-item>: zeigt einen Mitarbeiter und seine Projekte (item.data = { employee, projects }). */
export class EmployeeItem extends HTMLElement {
  #data = null;
  #refs;

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'listitem');
  }

  set data(data) {
    this.#data = data;
    this.#render();
  }

  get data() {
    return this.#data;
  }

  #render() {
  }
}

if (!customElements.get('employee-item')) customElements.define('employee-item', EmployeeItem);


/**
 * <employee-list>: Die Mitarbeiter sind wenige und ihre Projekte abgeleitet,
 * daher wird bei jeder Projektänderung einfach komplett neu aufgebaut.
 */
export class EmployeeList extends HTMLElement {
  #model = null;
  #handler = () => this.#render();
  #bound = false;
  #list;

  constructor() {
    super();
  }

  set model(model) {
    this.#unbind();
    this.#model = model;
    if (this.isConnected) this.#bind();
  }

  get model() {
    return this.#model;
  }

  connectedCallback() {
    if (this.#model && !this.#bound) this.#bind();
  }

  disconnectedCallback() {
    this.#unbind();
  }

  #bind() {
  }

  #unbind() {
  }

  #render() {

  }
}

if (!customElements.get('employee-list')) customElements.define('employee-list', EmployeeList);
