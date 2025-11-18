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
            let element = e.target.closest('.chatlist__item');
            if(element){
                document.querySelector(".messages").replaceChildren();
                let id = element.dataset.contactId;
                this.#currentChatPartner = this.#contactList.get(Number(id));
                this.#currentChatPartner.printMessages(this.#ownId,
                    document.querySelector(".messages"),this.#contactList);
            }
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
        fetch("json/contacts.json").then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            //remaining code
            this.#ownId=data.userId;
            for(let jsonPerson of data.persons){
                let person = new Person(jsonPerson);
                this.#contactList.set(person.id, person);
                this.#addMessageToContact(person,jsonPerson,false);
            }
            for(let jsonGroup of data.groups){
                let group = new Group(jsonGroup);
                this.#contactList.set(group.id, group);
                this.#addMessageToContact(group,jsonGroup,true);
                for(let contactId of jsonGroup.members){
                    if(contactId !== this.#ownId){
                        let c = this.#contactList.get(contactId);
                        c.addGroup(group);
                        group.addContact(c);
                    }
                }
            }

            this.#printContactList();
        })
        //const res = await fetch("json/contacts.json");
        //const data = await res.json();
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

