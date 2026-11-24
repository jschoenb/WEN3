export default class Person{
    #firstName;
    #lastName;
    constructor(firstName, lastName) {
        this.#firstName = firstName;
        this.#lastName = lastName;
    }

    register(newsletter) {
        newsletter.addEventListener("newsletter-send", this.#receivedMessage.bind(this));
    }

    #receivedMessage(customEvent) {
        console.log(this);
        console.log(customEvent);
        console.log(`${this.#firstName} ${this.#lastName} received the following message: ${customEvent.detail.message}`);
    }
}





