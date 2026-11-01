/** Data-Object: Mitarbeiter (unveränderlich). Kennt seine Projekte nicht, das Model leitet sie ab. */
export class Employee {
  constructor({ id, firstName, lastName }) {
    Object.assign(this, { id, firstName, lastName });
    Object.freeze(this);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
