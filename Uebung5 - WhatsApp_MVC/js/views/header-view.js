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
        //TODO
        /* Use the following code for the template
        <link rel="stylesheet" href="./styles/main.css">
        <header class="chat__header">
        <div class="chat__peer">
          <img class="chat__avatar" src="img/contacts/anna.jpeg" alt="Anna" />
          <div>
            <div class="chat__name">Anna</div>
            <div class="chat__status">online</div>
          </div>
        </div>
        <div class="chat__actions">
          <button class="icon-btn" aria-label="Suchen">🔎</button>
          <button class="icon-btn" aria-label="Mehr">⋯</button>
        </div>
      </header>*/
    }
}
customElements.define('header-view', HeaderView);