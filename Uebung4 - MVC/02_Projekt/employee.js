export default class Employee {
    static id = 0;

    constructor(firstName, lastName){
        this.id = ++Employee.id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.projects = [];
    }

    addProject(project){
        this.projects.push(project);
    }
}



