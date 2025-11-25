
export default class Newsletter extends EventTarget {
    send(text){
        let event = new CustomEvent("sendLetter",
            {"detail":{message:text}});
        this.dispatchEvent(event);
    }
}