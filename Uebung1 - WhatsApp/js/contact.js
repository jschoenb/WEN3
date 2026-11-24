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
        let peer = document.querySelector(".chat__peer");
        peer.replaceChildren();
        let html = `
            <img class="chat__avatar" src="${this.#img}" alt="${this.#name}"/>
                <div>
                <div class="chat__name">${this.#name}</div>
                <div class="chat__status">${this.doPrintHeader()}</div>
            </div>
        `;
        peer.insertAdjacentHTML("beforeend",html);
    }

    doPrintHeader(){
        throw "Template method must be overwritten!";
    }

    printContact () {
        console.log(this.#name);
        let lastMsg = this.#messages[this.#messages.length-1];
        let text = lastMsg == undefined? "":lastMsg.text;
        let time = lastMsg == undefined? "":lastMsg.time;

        let contactString =`<li class="chatlist__item" data-contact-id="${this.#id}">
            <img class="chatlist__avatar" src="${this.#img}" alt="${this.#name}"/>
            <div class="chatlist__meta">
                <div class="chatlist__name">${this.#name}</div>
                <div class="chatlist__last">${text}</div>
            </div>
            <time class="chatlist__time">${time}</time>
        </li>`;
        document.querySelector(".chatlist").insertAdjacentHTML("beforeend",contactString);

    }


    printMessages(userId, parent, contactList) {
        for(let msg of this.#messages){
            msg.print(userId, parent, contactList);
        }
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

