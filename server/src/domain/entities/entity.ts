export class Entity {
  id: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor(entity: Omit<Entity, 'createdAt' | 'id'>, id?: string) {
    Object.assign(this, entity);

    if (!this.id) {
      this.id = id;
    }

    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
