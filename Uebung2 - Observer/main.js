/**
 * Created by p23460 on 18.11.2016.
 */
//=================================================
//Tests
//=================================================

import Person from './person.js';
import Newsletter from "./newsletter.js";

window.onload = function(){
    let newsletter = new Newsletter();

    newsletter.addEventListener("newsletter-send",function(e){
        console.log(e);
        let div = document.querySelector("#eventDiv");
        div.innerHTML += `<p>${e.detail.message}</p>`;
    })

    let p1 = new Person("Max", "Mustermann");
    p1.register(newsletter);

    newsletter.send("Erste Nachricht von unserem KWM Newsletter!");
    newsletter.send("Frohe Weihnachten und ein gutes neues Jahr!");
}




