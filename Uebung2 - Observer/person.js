export default class Person{
    #firstName;
    #lastName;
    constructor(firstName, lastName) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.cb = null;
    }

    register(newsletter) {
        this.cb = (event) => this.#receivedMessage(event)
        newsletter.addEventListener("sendLetter", this.cb);
    }

    deregister(newsletter) {
        newsletter.removeEventListener("sendLetter", this.cb);
    }

    #receivedMessage(customEvent) {
        console.log(customEvent);
        console.log(`${this.#firstName} ${this.#lastName} received the following message: ${customEvent.detail.message}`);
    }
}





