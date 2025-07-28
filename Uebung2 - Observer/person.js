export default class Person{
    #firstName;
    #lastName;
    constructor(firstName, lastName) {
        this.#firstName = firstName;
        this.#lastName = lastName;
    }

    register(newsletter) {
        //TODO: register this person to the newsletter
    }

    #receivedMessage(customEvent) {
        console.log(customEvent);
        console.log(`${this.#firstName} ${this.#lastName} received the following message: ${customEvent.detail.message}`);
    }
}





