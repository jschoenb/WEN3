/**
 * Data-Object: ein einzelnes Todo.
 * Unveränderlich (frozen): Änderungen erzeugen ein NEUES Objekt.
 * So kann die View den Zustand des Models nicht versehentlich verändern.
 */
export class Todo {
  constructor({ id = crypto.randomUUID(), title, description = '', complete = false, createdAt = Date.now() }) {
    Object.assign(this, {
      id,
      title: String(title).trim(),
      description: String(description).trim(),
      complete: Boolean(complete),
      createdAt
    });
    Object.freeze(this);
  }

  withComplete(complete) {
    return new Todo({ ...this, complete });
  }

  // Aus localStorage gelesene Daten prüfen; ungültige Einträge werden verworfen
  static fromJSON(data) {
    if (!data || typeof data.id !== 'string' || typeof data.title !== 'string') return null;
    return new Todo(data);
  }
}
