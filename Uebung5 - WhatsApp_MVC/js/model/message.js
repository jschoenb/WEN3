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
}
