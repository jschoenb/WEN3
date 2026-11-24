export default class Newsletter extends EventTarget{
    send(text) {
        let event = new CustomEvent("newsletter-send", {"detail": {message: text}});
        this.dispatchEvent(event);
    }
}