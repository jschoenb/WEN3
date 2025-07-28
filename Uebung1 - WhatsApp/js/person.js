import Contact from "./contact.js";

export default class Person extends Contact {

    #online
    #groups;

    /**
     * Represents a Person
     * @Constructor
     * @param {string} id
     * @param {string} name
     * @param {string} img
     * @param {string} online
     */
    constructor({id,name,img, online}){
        super({id,name,img});
        this.#online = online;
        this.#groups = []
    }

    get online() {
        return this.#online;
    }

    /**
     *
     * @param group
     */
    addGroup(group) {
        this.#groups.push(group);
    }

    /**
     *
     * @returns {string}
     */
    doPrintHeader(){
        //TODO
    }
}
