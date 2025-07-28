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
        document.querySelector("#headerImg").replaceChildren();
        let div = `
            <div>
                <img class="chat_img" src="${this.#img}" alt="">
            </div>
            <div class="ml-2">
                <p class="font-weight-bold mb-0">${this.#name}</p>
                <small>${this.doPrintHeader()}</small>
            </div>`;
        document.querySelector("#headerImg").insertAdjacentHTML("afterbegin",div);
    }

    doPrintHeader(){
        throw "Template method must be overwritten!";
    }

    printContact () {
        let child = document.querySelector("#contact_" + this.#id);
        if(child){
            child.parentElement.removeChild(child);
        }
        let lastMsg = this.#messages[this.#messages.length - 1];
        let text = lastMsg==undefined?"":lastMsg.text;
        let time = lastMsg==undefined?"":lastMsg.time;
        let contactHtml = `
            <li id="contact_${this.#id}" class="list-group-item whatsapp-element">
                <div class="img-title-element">
                    <div>
                        <img class="chat_img roun" src="${this.#img}" alt="">
                    </div>
                    <div class="ml-2">
                        <p class="font-weight-bold mb-0">${this.#name}</p>
                        <small>${text}</small>
                    </div>
                </div>
                <p class="mb-0">${time}</p>
            </li>`;
        document.querySelector(".list-group").insertAdjacentHTML("afterbegin",contactHtml);
        this.contactDiv =  document.querySelector(".list-group").firstElementChild;
    }

    printMessages(userId,parent,contactList){
        for(let m of this.#messages){
            m.print(userId,parent,contactList);
        }
    }
}

