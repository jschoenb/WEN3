import {model} from "./model.js";

class Controller {

    init(){
        document.querySelector("#exampleModal button.btn-primary").onclick = (ev)=>{
            //TODO: get values from input fields and call model.addProject()
        };

        //TODO handle the delete-project event
    }
}

export const controller = new Controller();

