class MyCounterSlot extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.count = 0;
    }

    connectedCallback() {
        this.shadow.innerHTML = this.template();
        this.shadowRoot.querySelector('button').addEventListener('click',
            (e) => {
                this.count++;
                this.dispatchEvent(new CustomEvent('counter-changed',{
                    detail: {count: this.count},
                    bubbles: true,
                    composed: true,
                }));
                this.shadowRoot.querySelector("#counter").textContent = `Anzahl: ${this.count}`;
        })

    }

    template() {
        return `
            <style>
                button {
                    font-size: 1rem;
                    padding: 0.5rem 1rem;
                }
                :host {
                    background-color: #7fba8e; 
                }
                ::slotted(span) {
                    margin-left: 1em;
                    color: gray;
                }
            </style>
            <button>
                <slot></slot>
            </button>
            <slot name="extra"></slot>
            <span id="counter">Anzahl: ${this.count}</span>
        `
    }
}

customElements.define('my-counter-slot', MyCounterSlot);
