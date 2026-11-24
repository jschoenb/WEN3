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
        let currentDate = new Date();
        let options = {
            hour: "2-digit",
            minute: "2-digit"
        };
        let time = currentDate.toLocaleTimeString("de-de",options);
        let receiverContact = this.#contactList.get(Number(receiverId));
        //Creation of Message
        let obj = {
            text: text,
            time: time,
            senderId: senderId
        }
        let msg = new Message(obj,receiverContact instanceof Group);
        console.log(receiverContact);
        receiverContact.addMessage(msg);
        if(this.#currentChatPartner && this.#currentChatPartner.id == receiverId){
            msg.print(this.#ownId,document.querySelector(".messages"),this.#contactList);
        } else {
            let contactElement = document.querySelector(`.chatlist__item[data-contact-id="${receiverId}"]`);
            contactElement.classList.add("chatlist__item--new");
        }
    }

    //================ PRIVATE =================
    #addEventHandler(){
        document.querySelector(".chatlist").addEventListener("click",(e) => {
            console.log("click on chatlist",e.target);
            let element = e.target.closest(".chatlist__item");
            if(element){
                let lastActiveContact = document.querySelector(".chatlist__item--active");
                if(lastActiveContact){
                    lastActiveContact.classList.remove("chatlist__item--active");
                }
                element.classList.add("chatlist__item--active");
                element.classList.remove("chatlist__item--new");

                //Nachrichten des ausgewählten Kontakts anzeigen
                document.querySelector(".messages").replaceChildren();
                let contactId = element.dataset.contactId;
                this.#currentChatPartner = this.#contactList.get(Number(contactId));
                this.#currentChatPartner.printMessages(this.#ownId,document.querySelector(".messages"),this.#contactList);
                this.#currentChatPartner.printHeader();
                document.querySelector(".composer__input").disabled=false;
            }
        });

        document.querySelector(".composer__send").onclick=(ev)=>{
            let input = document.querySelector(".composer__input");
            if(input.value.trim() !== ""){
                this.insertMessage(input.value.trim(),this.#ownId,this.#currentChatPartner.id);
                input.value="";
            }
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
        for(let group of data.groups ?? []){
            let g = new Group(group);
            for(let memberId of group.members){
                let member = this.#contactList.get(memberId);
                if(member){ // id 0 = man selbst, steht nicht in der contactList
                    g.addContact(member);
                    member.addGroup(g);
                }
            }
            this.#contactList.set(g.id,g);
            this.#addMessageToContact(g,group,true);
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

