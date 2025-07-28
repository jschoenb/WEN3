import Project from "./project.js";
import Employee from "./employee.js";

class Model extends EventTarget {
    constructor (){
        super();
        this.employees = new Map();
        this.projects = new Map();
        this.#init();
    }

    addProject(title,budget,desc,employees){
        //TODO
    }

    deleteProject(id){
        //TODO
    }

    #init(){
        let e1 = new Employee("Hans", "Huber")
        this.employees.set(e1.id,e1);
        let e2 = new Employee("Susi", "Musterfrau")
        this.employees.set(e2.id,e2);
        let e3 = new Employee("Max", "Mustermann")
        this.employees.set(e3.id,e3);
    }
}

export const model = new Model();

