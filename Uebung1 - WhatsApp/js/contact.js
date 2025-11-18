export default class Contact{
    #id;
    #name;
    #img;
    #messages;

    constructor({id,name,img}){
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
        /*let text;
        if(lastMsg===undefined){
            text="";
        } else {
            text = lastMsg.text;
        }*/
        let text = lastMsg === undefined ? "" : lastMsg.text;
        let time = lastMsg === undefined ? "" : lastMsg.time;
        let contactHTML = `
        <li class="chatlist__item" data-contact-id="${this.#id}">
          <img class="chatlist__avatar" src="${this.#img}" alt="${this.#name}" />
          <div class="chatlist__meta">
            <div class="chatlist__name">${this.#name}</div>
            <div class="chatlist__last">${text}</div>
          </div>
          <time class="chatlist__time">${time}</time>
        </li>
        `
        document.querySelector(".chatlist").insertAdjacentHTML("afterbegin", contactHTML);
    }

    printMessages(userId,parent,contactList){
        for(let m of this.#messages){
            m.print(userId,parent,contactList);
        }
    }
}

