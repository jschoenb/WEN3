import { cloneTemplate } from './template.js';

const numberFormat = new Intl.NumberFormat('de-AT');

/** <project-item>: zeigt ein Projekt (item.data = { project, employees }). */
export class ProjectItem extends HTMLElement {
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
    this.dataset.id = data.project.id;
    this.#render();
  }

  get data() {
    return this.#data;
  }

  // textContent / createElement statt innerHTML: Eingaben werden nie als HTML interpretiert
  #render() {

  }
}

if (!customElements.get('project-item')) customElements.define('project-item', ProjectItem);


/** <project-list>: hört auf das Model (wird vom Controller injiziert). */
export class ProjectList extends HTMLElement {
  #model = null;
  #listeners = null;
  #refs;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).append(cloneTemplate('project-list-template'));
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
    if (this.#model && !this.#listeners) this.#bind();
  }

  // Listener wieder entfernen: sonst entstehen bei erneutem Einfügen doppelte Handler
  disconnectedCallback() {
    this.#unbind();
  }

  #bind() {

  }

  #unbind() {

  }

  #createItem(project) {

  }

  #find(id) {

  }

  #updateEmpty() {

  }
}

if (!customElements.get('project-list')) customElements.define('project-list', ProjectList);
