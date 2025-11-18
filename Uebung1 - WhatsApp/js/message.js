export default class Message {

    #text;
    #time;
    #senderId;
    #isGroupMsg;

    constructor({text,time,senderId},isGroupMsg){
        this.#text = text;
        this.#time = time;
        this.#senderId = senderId;
        this.#isGroupMsg = isGroupMsg;
    }

    get text(){
        return this.#text;
    }

    get time(){
        return this.#time;
    }

    get senderId(){
        return this.#senderId;
    }

    get isGroupMsg(){
        return this.#isGroupMsg;
    }

    print(userId, parent,contactList) {
        let div;
        if(userId == this.#senderId) {//own message
            div = `<div class="msg msg--out is-read">
                <div class="msg__bubble tw-bubble-out">${this.#text}</div>
                <div class="msg__meta">
                <time class="msg__time">${this.#time}</time>
                <span class="msg__status" aria-label="gelesen">✓✓</span>
                </div>
                </div>`;
        } else {
            let username;
            if (this.#isGroupMsg) {
                username = "<b>" + contactList.get(this.#senderId).name + "</b></br>";
            }
            div = `<div class="msg msg--in">
                    <div class="msg__bubble tw-bubble-in">
                                        ${username? username:''}${this.#text}</div>
                    <time class="msg__time">${this.#time}</time>
                    </div>`
        }
        parent.insertAdjacentHTML("beforeend", div);
    }

}
