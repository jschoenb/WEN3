import {model} from "../model/model.js";

class MessageItem extends HTMLElement {
    #message;
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    set message(message) {
        this.#message = message;
        this.render();
    }

    get message() {
        return this.#message;
    }

    render() {
        //TODO Render the message item with time and text
    }
}
customElements.define('message-item', MessageItem);

class MessageList extends HTMLElement {
    #contact
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
        // Listen for changes in the model when a new message is added
    }

    render() {
        //TODO Render the message list for the current contact
    }

    addMessage(message) {
        //TODO Add a new message to the list
    }
}
customElements.define('message-list', MessageList);