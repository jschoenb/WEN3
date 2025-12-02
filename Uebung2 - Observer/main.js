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

    newsletter.addEventListener("sendLetter",(e)=>{
       console.log(e);
       let div = document.querySelector("#eventDiv");
       div.innerHTML += `<p>${e.detail.message}</p>`;
    });

    let person1 = new Person("Hannes","Schönböck");
    person1.register(newsletter);

    newsletter.send("Fröhliche Weihnachten!");
    person1.deregister(newsletter);
    newsletter.send("Zweite Nachricht");
}




