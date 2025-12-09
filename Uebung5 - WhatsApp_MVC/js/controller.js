import {model} from "./model/model.js";

class Controller {
    constructor(){
    }

    insertExternalMessage(text,senderId,receiverId){
        model.insertMessage(text,senderId,receiverId);
    }

    init(){
        document.querySelector("contact-list").addEventListener("change-contact", (e) => {
            //TODO
            console.log("Es wurde auf Kontakt gedruckt ");
            const contact = model.changeContact(e.detail.id);
            const messageList = document.querySelector("message-list");
            messageList.contact = contact;
            //contact im model setzen
            //Nachrichtenliste neuen Contact setzen
        });

        document.querySelector(".composer__send").onclick = (e) => {
            let input = document.querySelector(".composer__input");
            model.insertMessage(input.value);
            input.value = "";
        };

    }
}

export const controller = new Controller();
