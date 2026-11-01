// Die Web Component <profile-card>
class ProfileCard extends HTMLElement {



  constructor() {
    super();

    // Shadow DOM: kapselt Struktur und Styles der Komponente
    this.attachShadow({ mode: 'open' });
    //TODO: Template holen und KLONEN (true = inkl. aller Kinder).
  }

  // Wird aufgerufen, wenn sich ein beobachtetes Attribut ändert
  attributeChangedCallback() {
    this.#render();
  }

  // Wird aufgerufen, sobald das Element ins DOM eingefügt wird
  connectedCallback() {
    this.#render();
  }

  // Nur die veränderlichen Teile aktualisieren, das Template bleibt unangetastet.
  // textContent statt innerHTML: kein Risiko für HTML-Injection.
  #render() {
    //TODO: Name und Rolle aus Attributen holen und in die Karte schreiben.
  }
}

// Tag-Namen registrieren (muss einen Bindestrich enthalten!)
customElements.define('profile-card', ProfileCard);
