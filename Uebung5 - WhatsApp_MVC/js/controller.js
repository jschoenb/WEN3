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

        const input = document.querySelector("#inputMsg");
        // input handler
        input.onblur = () => {
            //TODO
        };

        input.onkeyup = (ev) => {
            if (ev.which == 13) {
                input.blur();
            }
        };
    }
}

export const controller = new Controller();
