
//some hack to get access from console
import WhatsApp from "./whatsapp.js";

window.whatsApp = new WhatsApp();

/**
 * Start of Program
 */
window.onload = function () {
    whatsApp.init();
}
