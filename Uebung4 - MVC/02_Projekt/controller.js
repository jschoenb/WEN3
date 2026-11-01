import { projectModelInstance } from './model.js';
import { cloneTemplate } from './template.js';

/** Controller: Dialog, Formular und Komponenten-Events. Die Views aktualisiert das Model per Events. */
export class ProjectController {
  #model;

  constructor(model = projectModelInstance) {
    this.#model = model;
  }

  init() {
    const $ = (selector) => document.querySelector(selector);
    const dialog = $('#project-dialog');
    const form = $('#project-form');
    const error = $('#form-error');
    const projectList = $('project-list');


  }

  // Mitarbeiter kommen aus dem Model
  #fillEmployeeOptions(container) {
    container.replaceChildren(...this.#model.getEmployees().map((employee) => {
      const option = cloneTemplate('employee-option-template');
      option.querySelector('input').value = employee.id;
      option.querySelector('span').textContent = employee.fullName;
      return option;
    }));
  }
}
