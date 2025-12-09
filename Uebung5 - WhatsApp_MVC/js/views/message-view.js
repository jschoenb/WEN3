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
        let html;
        if(model.getUserId() == this.#message.senderId){
            html = `<div class="msg msg--out is-read">
                      <div class="msg__bubble tw-bubble-out">${this.#message.text}</div>
                      <div class="msg__meta">
                        <time class="msg__time">${this.#message.time}</time>
                        <span class="msg__status" aria-label="gelesen">✓✓</span>
                      </div>
                    </div>`
        } else {
            let username;
            if (this.#message.isGroupMsg) {
                username = "<b>" + model.getContactById(this.#message.senderId).name + "</b></br>";
            }
            html = `<div class="msg msg--in">
                        <div class="msg__bubble tw-bubble-in">
                            ${username? username:''}${this.#message.text}</div>
                        <time class="msg__time">${this.#message.time}</time>
                    </div>`
        }

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                }
            </style>
            <link rel="stylesheet" href="./styles/main.css">
             ${html}
        `;
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
        model.addEventListener("newMessage",(e)=>{
            this.addMessage(e.detail);
        })
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./styles/main.css"></link>
             <section class="messages" aria-live="polite"></section>
        `;
        if(this.#contact) {
            this.#contact.messages.forEach((message) => {
                this.addMessage(message);
            })
        }
    }

    addMessage(message) {
        const item = document.createElement("message-item");
        item.message = message;
        this.shadowRoot.querySelector('.messages').appendChild(item);
    }
}
customElements.define('message-list', MessageList);