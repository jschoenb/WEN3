import Person from './person.js';
import Group from './group.js';
import Message from './message.js'

class WhatsAppModel extends EventTarget {
    #contactList;
    #personalId;
    #currentChatPartner;

    constructor() {
        super();
        this.#contactList = new Map();
        this.#personalId = undefined;
        this.#currentChatPartner = undefined;
        this.#loadFromJSON();
    }

    get contactList () {
        return this.#contactList;
    }

    addContact(contact){
        //TODO
    }

    getContactById(contactId){
        return this.#contactList.get(contactId);
    }

    getUserId(){
        return this.#personalId;
    }

    changeContact(newContactId){
        let selectedContact = this.getContactById(Number(newContactId));
        this.#currentChatPartner = selectedContact;
        return selectedContact;
    }

    insertMessage(text,senderId,receiverId){
        let currentDate = new Date();
        let options = {
            hour: "2-digit",
            minute: "2-digit"
        };
        let time = currentDate.toLocaleTimeString("de-de",options);
        let idOfSender = !senderId ? this.#personalId : senderId;
        let receiverContact = !receiverId ? this.getContactById(this.#currentChatPartner.id): this.getContactById(receiverId);
        let obj = {
            text: text,
            time: time,
            senderId: idOfSender
        }
        let msg = new Message(obj,receiverContact instanceof Group);
        receiverContact.addMessage(msg);
        //TODO throw the event to update the view
    }

    #loadFromJSON(){
        fetch("json/contacts.json").then((response) => {
            console.log(response);
            return response.json();
        }).then(data =>{
            this.#personalId = data.personalId;
            for (let person of data.persons) {
                let contact = new Person(person);
                this.#addMessageToContact(contact,person,false);
                this.addContact(contact);
            }
            for(let group of data.groups){
                let g = new Group(group);
                this.#addMessageToContact(g,group,true);
                //add members to group
                for(let contactId of group.members){
                    if(contactId !== this.#personalId){
                        let c = this.getContactById(contactId);
                        if(c){
                            g.addContact(c);
                            c.addGroup(g);
                        }
                    }
                }
                this.addContact(g);
            }
        });
    }

    #addMessageToContact(contact,jsonContact,isGroupMsg){
        for(let msg of jsonContact.messages){
            let message = new Message(msg,isGroupMsg);
            contact.addMessage(message);
        }
    }
}

export const model = new WhatsAppModel();
