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
        //TODO
    }

    printMessages(userId,parent,contactList){
        //TODO
    }
}

