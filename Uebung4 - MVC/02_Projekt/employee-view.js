import {model} from "./model.js";

class EmployeeItem extends HTMLElement {
    #employee   ;
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    set employee(employee) {
        this.#employee = employee;
        this.render();
    }

    get employee() {
        return this.#employee;
    }

    render() {
        // Render employee information
    }
}
customElements.define('employee-item', EmployeeItem);


class EmployeeList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        //TODO Listen for events from the model

    }

    render() {
        //TODO render the employee list
    }

    update(project) {
        this.render();
    }
}
customElements.define('employee-list', EmployeeList);



