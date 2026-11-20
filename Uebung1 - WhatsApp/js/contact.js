export default class Contact{
    #id;
    #name;
    #img;
    #messages;

    constructor({id,name,img}){
        if(new.target === Contact){
            throw "Contact is an abstract class and cannot be instantiated directly!";
        }
        this.#id = id;
        this.#name = name;
        this.#img = img;
        this.#messages = [];

    }

    get id(){
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get img(){
        return this.#img;
    }

    get messages(){
        return this.#messages;
    }

    addMessage(msg) {
        this.#messages.push(msg);
    }

    printHeader(){
        //TODO
    }

    doPrintHeader(){
        throw "Template method must be overwritten!";
    }

    printContact () {
        let lastMsg = this.#messages[this.#messages.length - 1];
        let text = lastMsg==undefined?"":lastMsg.text;
        let time = lastMsg==undefined?"":lastMsg.time;
        let contactHtml = `
            <li class="chatlist__item" data-contact-id=${this.#id}>
                <img class="chatlist__avatar" src="${this.#img}" alt="">
                <div class="chatlist__meta">
                    <div class="chatlist__name">${this.#name}</div>
                    <div class="chatlist__last">${text}</div>
                </div>
                <time class="chatlist__time">${time}</time>
            </li>`;
        console.log("adding contact to list",contactHtml);
        console.log("adding contact to list",document.querySelector(".chatlist"));
        document.querySelector(".chatlist").insertAdjacentHTML("afterbegin",contactHtml);
    }


    printMessages(userId,parent,contactList) {
        //TODO
    }


    toJSON() {
        return {
           id: this.#id,
           name: this.#name,
           img: this.#img,
           messages: this.#messages
        }
    }
}

