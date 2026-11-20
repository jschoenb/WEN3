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
        this.#initUI();
        this.#addEventHandler();
        this.#loadFromJSON();
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

    async #loadFromJSON(){
        let data = localStorage.getItem("whatsappData");
        if(!data){
            let response = await fetch("json/contacts.json");
            data = await response.json();
            localStorage.setItem("whatsappData",JSON.stringify(data));
        } else {
            data = JSON.parse(data);
        }
        for(let person of data.persons){
            let p = new Person(person);
            this.#contactList.set(p.id,p);
            this.#addMessageToContact(p,person,false);
        }
        this.#printContactList();
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

