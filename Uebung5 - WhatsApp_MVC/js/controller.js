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
        });

        document.querySelector(".composer__send").onclick = (e) => {

        };

    }
}

export const controller = new Controller();
