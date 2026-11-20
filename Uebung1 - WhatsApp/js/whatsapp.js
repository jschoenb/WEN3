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
            //noch keine Daten im Storage, also laden wir die Daten aus der JSON-Datei
            let response = await fetch("json/contacts.json");
            data = await response.json();
            localStorage.setItem("whatsappData",JSON.stringify(data));
        } else {
            data = JSON.parse(data);
        }
        console.log(data);
        for(let p of data.persons){
            let person = new Person(p);
            this.#contactList.set(person.id,person);
            this.#addMessageToContact(person,p,false);
        }
        for(let g of data.groups){
            let group = new Group(g);
            this.#contactList.set(group.id,group);
            this.#addMessageToContact(group,g,true);
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

