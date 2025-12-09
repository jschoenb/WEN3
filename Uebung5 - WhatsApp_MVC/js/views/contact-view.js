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

        let html = `
            <link rel="stylesheet" href="./styles/main.css"></link>
            <li class="chatlist__item" data-contact-id="${this.#contact.id}">
            <img class="chatlist__avatar" src="${this.#contact.img}" alt="${this.#contact.name}"/>
            <div class="chatlist__meta">
                <div class="chatlist__name">${this.#contact.name}</div>
                <div class="chatlist__last">${text}</div>
            </div>
            <time class="chatlist__time">${time}</time>
        </li>`;
        this.shadowRoot.innerHTML = html;

        //TODO handle a click on the contact item -> thrwo change-contact event with the contact id
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
        model.addEventListener("addContact",(e)=>{
            this.addContact(e.detail);
        })
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./styles/main.css"></link>
            <ul class="chatlist"></ul>
        `;
        for(const [,contact] of model.contactList){
            this.addContact(contact);
        }
    }

    addContact(contact) {
        console.log("Should add new contact ", contact);
        const list = this.shadowRoot.querySelector('ul');
        const item = document.createElement("contact-item");
        item.contact = contact;
        list.appendChild(item);
    }
}
customElements.define('contact-list', ContactList);