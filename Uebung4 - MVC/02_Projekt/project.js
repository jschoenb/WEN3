export default class Project {

    static id = 0;
    constructor(title, budget, desc){
        this.id = ++Project.id;
        this.title = title;
        this.budget = budget;
        this.desc = desc;
        this.employees =[];
    }

    addEmployee(e){
        this.employees.push(e);
    }
}



