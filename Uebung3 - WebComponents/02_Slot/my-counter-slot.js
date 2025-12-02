class MyCounterSlot extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode:"open"});
        //Stateful component
        this.count = 0;
    }

    connectedCallback() {
        this.shadow.innerHTML = this.template();
        this.shadowRoot.querySelector("button").
            addEventListener("click",()=>{
            this.count++;
            this.shadowRoot.querySelector("#counter").textContent = `Anzahl: ${this.count}`;
        })
    }

    template() {
        return `
            <style>
                button {
                    font-size: 1rem;
                    padding: 0.5em 1em;                
                }
                ::slotted(span) {
                    margin-left: 1em;
                    color: #6b7280;                
                }
                :host {
                    border: 1px solid black;
                }
            </style>
            <button>
                <slot></slot>
            </button>
            <slot name="extra"></slot>
            <span id="counter">Anzahl: ${this.count}</span>
        `;
    }
}

customElements.define('my-counter-slot', MyCounterSlot);
