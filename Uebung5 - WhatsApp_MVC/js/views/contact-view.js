import {model} from "../model/model.js";

class ContactItem extends HTMLElement {
    #contact;
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    set contact(contact) {
        this.#contact = contact;
        this.render();
    }

    get contact() {
        return this.#contact;
    }

    render() {
        let lastMsg = this.#contact.messages[this.#contact.messages.length - 1];
        let text = lastMsg === undefined ? "" : lastMsg.text;
        let time = lastMsg === undefined ? "" : lastMsg.time;
        this.shadowRoot.innerHTML =  `
        <link rel="stylesheet" href="./styles/main.css"/>
        <li class="chatlist__item" data-contact-id="${this.#contact.id}">
          <img class="chatlist__avatar" src="${this.#contact.img}" alt="${this.#contact.name}" />
          <div class="chatlist__meta">
            <div class="chatlist__name">${this.#contact.name}</div>
            <div class="chatlist__last">${text}</div>
          </div>
          <time class="chatlist__time">${time}</time>
        </li>
        `
        //TODO handle a click on the contact item -> throw change-contact event with the contact id
        this.shadowRoot.querySelector('li')
            .addEventListener("click", (e) => {
                this.dispatchEvent(new CustomEvent("change-contact",{
                    detail: {id: this.#contact.id},
                    bubbles: true,
                    composed: true,
                }));
            });
    }
}
customElements.define('contact-item', ContactItem);

class ContactList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        // TODO Listen for changes in the contact list model
        model.addEventListener("addContact", (e) => {
            this.addContact(e.detail);
        })
    }

    render() {
        //TODO render the contact list, get the contact list from the model
        this.shadowRoot.innerHTML = `
            <ul class="chatlist"></ul>
        `
        const list = this.shadowRoot.querySelector(".chatlist");
        console.log(model.contactList);
        for(const [,contact] of model.contactList){
            const item = document.createElement("contact-item");
            item.contact = contact;
            list.appendChild(item);
        }
    }

    addContact(contact) {
        console.log("Adding contact: ", contact);
        const list = this.shadowRoot.querySelector(".chatlist");
        const item = document.createElement("contact-item");
        item.contact = contact;
        list.appendChild(item);
    }
}
customElements.define('contact-list', ContactList);