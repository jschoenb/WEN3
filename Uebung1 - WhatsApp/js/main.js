import WhatsApp from "./whatsapp.js";
//some hack to get access from console
window.whatsApp = new WhatsApp();

/**
 * Start of Program
 */
window.onload = function () {
    whatsApp.init();
}
