import Contact from './contact.js';

export default class Person extends Contact {
    #online
    #groups;

    constructor({id,name,img, online}){
        super({id,name,img});
        this.#online = online;
        this.#groups = []
    }

    get online(){
        return this.#online;
    }

    addGroup(group) {
        this.#groups.push(group);
    }
}
