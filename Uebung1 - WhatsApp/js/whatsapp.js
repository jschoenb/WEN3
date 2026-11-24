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
        //Creation of Message
        let obj = {
            text: text,
            time: time,
            senderId: senderId
        }
        let receiverContact = this.#contactList.get(Number(receiverId));
        let msg = new Message(obj,receiverContact instanceof Group);
        receiverContact.addMessage(msg);
        if(this.#currentChatPartner?.id == receiverId){
            msg.print(this.#ownId,document.querySelector(".messages"),this.#contactList);
        } else {
            let contactElement = document.querySelector(`.chatlist__item[data-contact-id="${receiverId}"]`);
            contactElement.classList.add("chatlist__item--new");
        }
    }

    //================ PRIVATE =================
    #addEventHandler(){
        document.querySelector(".chatlist").addEventListener("click",(e) => {
            let element = e.target.closest(".chatlist__item");
            if(element){
                //remove active class from all items and add it to the clicked
                let lastActive = document.querySelector(".chatlist__item--active");
                if(lastActive){
                    lastActive.classList.remove("chatlist__item--active");
                }
                element.classList.add("chatlist__item--active");
                element.classList.remove("chatlist__item--new");

                //Nachrichten
                document.querySelector(".messages").replaceChildren();
                let id = element.dataset.contactId; //data-contact-id
                this.#currentChatPartner = this.#contactList.get(Number(id));
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
            for(let memberId of g.members){
                if(memberId !== this.#ownId){
                    let member = this.#contactList.get(memberId);
                    if(member){
                        group.addContact(member);
                        member.addGroup(group);
                    }
                }
            }
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

