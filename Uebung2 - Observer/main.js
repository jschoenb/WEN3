/**
 * Created by p23460 on 18.11.2016.
 */
//=================================================
//Tests
//=================================================


import Newsletter from "./newsletter.js";

window.onload = function(){
    let newsletter = new Newsletter();

    newsletter.addEventListener("sendLetter",(e)=>{
       console.log(e);
       let div = document.querySelector("#eventDiv");
       div.innerHTML += `<p>${e.detail.message}</p>`;
    });

    newsletter.send("Fröhliche Weihnachten!");
}




