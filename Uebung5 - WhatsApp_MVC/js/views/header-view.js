import Person from "../model/person.js";

class HeaderView extends HTMLElement{
    #contact;
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    set contact(contact) {
        this.#contact = contact;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.#contact){
            let text;
            if(this.#contact instanceof Person){
                text = `zuletzt online ${this.#contact.online}`;
            } else {
                text = this.#contact.contacts.map(contact => contact.name).join(", ");
            }
            this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./styles/main.css">
        <header class="chat__header">
        <div class="chat__peer">
          <img class="chat__avatar" src="${this.#contact.img}" alt="${this.#contact.name}" />
          <div>
            <div class="chat__name">${this.#contact.name}</div>
            <div class="chat__status">${text}</div>
          </div>
        </div>
        <div class="chat__actions">
          <button class="icon-btn" aria-label="Suchen">🔎</button>
          <button class="icon-btn" aria-label="Mehr">⋯</button>
        </div>
      </header>`
        }

    }
}
customElements.define('header-view', HeaderView);