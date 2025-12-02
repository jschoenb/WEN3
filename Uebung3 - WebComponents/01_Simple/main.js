import {MyCounter} from './my-counter.js'

const myCounter = new MyCounter();
document.body.appendChild(myCounter);

myCounter.addEventListener('counter-changed',(e)=>{
    console.log('counter-changed',e);
})