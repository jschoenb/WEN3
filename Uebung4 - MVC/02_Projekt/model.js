import { Project } from './project.js';
import { Employee } from './employee.js';

const STORAGE_KEY = 'project-app.projects.v1';

// Feste Stammdaten mit stabilen ids (Projekte verweisen darauf). Nur Projekte werden gespeichert.
const EMPLOYEES = [
  { id: 'e1', firstName: 'Hans', lastName: 'Huber' },
  { id: 'e2', firstName: 'Susi', lastName: 'Musterfrau' },
  { id: 'e3', firstName: 'Max', lastName: 'Mustermann' }
];

/** Model. Events: project-added | project-removed, jeweils mit detail.project. */
export class ProjectModel extends EventTarget {
  #employees = new Map(EMPLOYEES.map((e) => [e.id, new Employee(e)]));
  #projects = new Map();
  #storageKey;

  constructor(storageKey = STORAGE_KEY) {
    super();
    this.#storageKey = storageKey;
    this.#load();
  }

  getEmployees() { return [...this.#employees.values()]; }
  getProjects() { return [...this.#projects.values()]; }


  employeesOf(project) {
    return project.employeeIds.map((id) => this.#employees.get(id)).filter(Boolean);
  }

  projectsOf(employeeId) {
    return this.getProjects().filter((p) => p.employeeIds.includes(employeeId));
  }

  /** Gibt das neue Projekt zurück oder null, wenn die Eingabe ungültig ist. */
  addProject({ title, budget, description = '', employeeIds = [] }) {

  }

  removeProject(id) {

  }

  #commit(type, project) {
    this.#save();
    this.dispatchEvent(new CustomEvent(type, { detail: { project } }));
  }

  #load() {

  }

  #save() {
    try {
      localStorage.setItem(this.#storageKey, JSON.stringify(this.getProjects()));
    } catch (err) {
      console.warn('Could not save projects to localStorage:', err);
    }
  }
}

export const projectModelInstance = new ProjectModel();
