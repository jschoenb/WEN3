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
        let currentDate = new Date();
        let options ={
            hour : "2-digit",
            minute : "2-digit",
        }
        let time = currentDate.toLocaleTimeString("de-de",options);
        let receiverContact = this.#contactList.get(Number(receiverId));
        let msg = new Message({text:text,time:time,senderId:senderId},
            receiverContact instanceof Group);
        receiverContact.addMessage(msg);
        msg.print(this.#ownId,document.querySelector(".messages"),this.#contactList);
    }

    //================ PRIVATE =================
    #addEventHandler(){
        document.querySelector(".chatlist").addEventListener("click",(e) => {
            let element = e.target.closest(".chatlist__item");
            if(element){
                let lastActiveContact = document.querySelector(".chatlist__item--active");
                if(lastActiveContact){
                    lastActiveContact.classList.remove("chatlist__item--active");
                }
                element.classList.add("chatlist__item--active");
                element.classList.remove("chatlist__item--new");
                //clear chat window
                let domMsg = document.querySelector(".messages");
                domMsg.replaceChildren();
                //fetch the contact id
                let id = element.id;
                let index = id.lastIndexOf("_");
                id = id.substring(index+1);
                this.#currentChatPartner = this.#contactList.get(Number(id));
                this.#currentChatPartner.printMessages(this.#ownId,domMsg,this.#contactList);

                document.querySelector(".composer__input").disabled=false;
            }
        });

        document.querySelector(".composer__send").onclick=(ev)=>{
            let input = document.querySelector(".composer__input");
            if(input.value){
                this.insertMessage(input.value,this.#ownId,this.#currentChatPartner.id);
                input.value = "";
            }
        };
    }

    #initUI(){
        document.querySelector(".composer__input").disabled=true;
        document.querySelector(".chat__peer").replaceChildren();
        document.querySelector(".messages").replaceChildren();
        document.querySelector(".chatlist").replaceChildren();
    }

    #loadFromJSON(){
        fetch("json/contacts.json").then(
            res=>res.json()
        ).then(data=>{
            console.log(data);
            this.#ownId = data.userId;
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
                        if(c){
                            group.addContact(c);
                            c.addGroup(group);
                        }
                    }
                }
            }

            this.#printContactList();
        })
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

