export default class Person{
    #firstName;
    #lastName;
    #cb;

    constructor(firstName, lastName) {
        this.#firstName = firstName;
        this.#lastName = lastName;
    }

    register(newsletter) {
        this.#cb =  (ev)=>{
            this.#receivedMessage(ev);
        }
        newsletter.addEventListener("sendLetter",this.#cb)
    }

    deregister(newsletter) {
        newsletter.removeEventListener("sendLetter",this.#cb)
    }

    #receivedMessage(customEvent) {
        console.log(customEvent);
        console.log(`${this.#firstName} ${this.#lastName} received the following message: ${customEvent.detail.message}`);
    }
}





