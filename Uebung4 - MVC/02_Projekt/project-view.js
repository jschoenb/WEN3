import {model} from "./model.js";

class ProjectItem extends HTMLElement {
    #project;
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    set project(project) {
        this.#project = project;
        this.render();
    }

    get project() {
        return this.#project;
    }

    render() {
        //TODO rendern der Projekt-Informationen
        //TODO click-Handler für das Projekt-Item zum Löschen des Projekts
    }
}
customElements.define('project-item', ProjectItem);


class ProjectList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        // TODO Listen for events from the model
    }

    render() {
        //TODO rendern der Projekt-Liste
    }

    addProject(project) {
        //TODO add a new project to the list
    }

    deleteProject(projectId) {
        //TODO delete a project from the list
    }
}
customElements.define('project-list', ProjectList);