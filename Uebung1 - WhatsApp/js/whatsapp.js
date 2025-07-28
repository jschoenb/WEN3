import Person from './person.js';
import Group from './group.js';
import Message from './message.js';

export default class WhatsApp {

    #ownId;
    #contactList
    #currentChatPartner

    constructor(){
        this.#contactList= new Map();
        this.#ownId=0;
        this.#currentChatPartner = undefined;
    }

    init(){
        this.#loadFromJSON();
        this.#initUI();
        this.#addEventHandler();
    }

    insertMessage(text,senderId,receiverId){
        //TODO
    }

    //================ PRIVATE =================
    #addEventHandler(){
        document.querySelector("ul.list-group").addEventListener("click",(e) => {
            //TODO
        });

        document.querySelector("#inputMsg").onkeyup=(ev)=>{
            //TODO
        };
    }

    #initUI(){
        document.querySelector("#inputMsg").disabled=true;
        document.querySelector("#headerImg").replaceChildren();
        document.querySelector(".list-group.border-top").replaceChildren();
        document.querySelector(".chatroom").replaceChildren();
    }

    #loadFromJSON(){
        //TODO
    }

    #printContactList(){
        for(let contact of this.#contactList.values()){
            contact.printContact();
        }
    }

    #addMessageToContact(contact,jsonContact,isGroupMsg){
        for(let msg of jsonContact.messages){
            let message = new Message(msg,isGroupMsg);
            contact.addMessage(message);
        }
    }
}

