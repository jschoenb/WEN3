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

    get messages(){
        return this.#messages;
    }

    get img(){
        return this.#img;
    }

    addMessage(msg) {
        this.#messages.push(msg);
    }
}

