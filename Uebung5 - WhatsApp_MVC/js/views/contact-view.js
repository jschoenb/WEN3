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
        //TODO render the message

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
        // TODO Listen for changes in the contact list model
    }

    render() {
        //TODO render the contact list, get the contact list from the model
    }

    addContact(contact) {
        //TODO add a contact to the list
    }
}
customElements.define('contact-list', ContactList);