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
        let username ="";

        if(this.#isGroupMsg && userId !== this.#senderId){
            username = "<b>"+contactList.get(this.#senderId).name + "</b></br>";
        }
        let div = `
        <div class="message ${userId===this.#senderId?'in':'out'}">
            <div>
                <div>
                    ${username+this.#text}
                </div>
                <div class="time">
                    ${this.#time}
                </div>
            </div>
        </div>`;
        parent.insertAdjacentHTML("beforeend",div);
    }

}
