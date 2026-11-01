/**
 * Data-Object: Projekt (unveränderlich).
 * Verweist auf Mitarbeiter nur per id (employeeIds). Keine Objekt-Referenzen in beide Richtungen:
 * Das ist die Voraussetzung für JSON.stringify / localStorage (Zirkelbezüge lassen sich nicht serialisieren).
 */
export class Project {
  constructor({ id = crypto.randomUUID(), title, budget, description = '', employeeIds = [], createdAt = Date.now() }) {
    Object.assign(this, {
      id,
      title: String(title).trim(),
      budget: Number(budget),
      description: String(description).trim(),
      employeeIds: Object.freeze([...employeeIds]),
      createdAt
    });
    Object.freeze(this);
  }

  static fromJSON(data) {
    if (!data || typeof data.id !== 'string' || typeof data.title !== 'string'
        || !Number.isFinite(data.budget) || !Array.isArray(data.employeeIds)) return null;
    return new Project(data);
  }
}
