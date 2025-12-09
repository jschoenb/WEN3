import {model} from "./model/model.js";

class Controller {
    constructor(){
    }

    insertExternalMessage(text,senderId,receiverId){
        model.insertMessage(text,senderId,receiverId);
    }

    init(){
        document.querySelector("contact-list").addEventListener("change-contact", (e) => {
            console.log("Clicked on the contact", e.detail);
            const contact = model.changeContact(e.detail);
            const messageList = document.querySelector("message-list");
            messageList.contact = contact;
            const headerView = document.querySelector("header-view");
            headerView.contact = contact;
        });

        document.querySelector(".composer__send").onclick = (e) => {
            let input = document.querySelector(".composer__input");
            model.insertMessage(input.value);
            input.value = "";
        };

    }
}

export const controller = new Controller();
