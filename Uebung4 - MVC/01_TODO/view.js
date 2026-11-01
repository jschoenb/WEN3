// Hilfsfunktion: Template per id holen und klonen
const cloneTemplate = (id) => document.getElementById(id).content.cloneNode(true);

/** <todo-item>: zeigt ein Todo an und meldet Benutzeraktionen per Event. */
export class TodoItem extends HTMLElement {
  #task = null;
  #refs;

  constructor() {
    super();
    //TODO
  }

  connectedCallback() {
    // Das <ul>/<li> steckt in verschiedenen Shadow DOMs, daher ARIA-Rolle am Host
    this.setAttribute('role', 'listitem');
  }

  set task(task) {
    this.#task = task;
    this.dataset.id = task.id;
    this.#render();
  }

  get task() {
    return this.#task;
  }

  // bubbles + composed: das Event verlässt das Shadow DOM und erreicht den Controller
  #emit(type, detail) {
    //TODO
  }

  // textContent statt innerHTML: kein HTML aus Benutzereingaben wird ausgeführt
  #render() {
    //TODO
  }
}

if (!customElements.get('todo-item')) customElements.define('todo-item', TodoItem);


/** <todo-list>: hört auf das Model und hält die <todo-item>-Elemente aktuell. */
export class TodoList extends HTMLElement {
  #model = null;
  #listeners = null;
  #refs;

  constructor() {
    super();
    //TODO
  }

  // Das Model wird von außen (Controller) hineingegeben: die View kennt kein Singleton
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

  disconnectedCallback() {
    this.#unbind();
  }

  #bind() {
    //TODO
  }

  #unbind() {
    //TODO
  }

  #renderAll() {
    //TODO
  }

  #createItem(task) {
    //TODO
  }

  #find(id) {
    return [...this.#refs.list.children].find((el) => el.dataset.id === id);
  }

  #add(task) {
    this.#refs.list.append(this.#createItem(task));
    this.#updateEmptyState();
  }

  #remove(id) {
    this.#find(id)?.remove();
    this.#updateEmptyState();
  }

  #update(task) {
    const item = this.#find(task.id);
    if (item) item.task = task;
  }

  #updateEmptyState() {
    this.#refs.empty.hidden = this.#refs.list.children.length > 0;
  }
}

if (!customElements.get('todo-list')) customElements.define('todo-list', TodoList);
