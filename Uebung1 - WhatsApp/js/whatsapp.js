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
        document.querySelector(".chatlist").addEventListener("click",(e) => {
            //TODO
        });

        document.querySelector(".composer__send").onclick=(ev)=>{
            //TODO
        };
    }

    #initUI(){
        document.querySelector(".composer__input").disabled=true;
        document.querySelector(".chat__peer").replaceChildren();
        document.querySelector(".messages").replaceChildren();
        document.querySelector(".chatlist").replaceChildren();
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

