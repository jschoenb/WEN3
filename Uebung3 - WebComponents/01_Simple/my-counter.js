export class MyCounter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.count = 0;
    }

    connectedCallback(){
        this.button = document.createElement('button');
        this.count = this.getAttribute('val') ?
            Number(this.getAttribute('val')) : 0
        this.button.textContent = `Count: ${this.count}`;
        this.shadowRoot.appendChild(this.button);
        this.button.addEventListener('click', () => this.increment())
    }

    increment(){
        this.count++;
        this.button.textContent = `Count: ${this.count}`;
        this.dispatchEvent(new CustomEvent('counter-changed',{
            detail: {count: this.count},
            bubbles: true,
            composed: true,
        }));
    }
}

customElements.define('my-counter', MyCounter);
