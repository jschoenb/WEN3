/**
 * Created by p23460 on 18.11.2016.
 */
//=================================================
//Tests
//=================================================

import Newsletter from "./newsletter.js";
import Person from "./person.js";

window.onload = function(){
    let newsletter = new Newsletter();

    newsletter.addEventListener("sendLetter", (event) => {
        console.log(event);
        let div = document.querySelector("#eventDiv");
        div.innerHTML +=`<p>${event.detail.message}</p>`;
    })

    let person1 = new Person("Hannes","Schönböck");
    person1.register(newsletter);


    //verschicken der Nachricht
    newsletter.send("Fröhliche Weihnachten von KWM!");
    person1.deregister(newsletter);
    newsletter.send("Gutes neues Jahr 2026");
}




