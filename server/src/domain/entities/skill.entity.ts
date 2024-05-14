import { Entity } from './entity';
import { UserEntity } from './user.entity';

export class SkillEntity extends Entity {
  name: string;
  description: string;

  users?: UserEntity[];

  constructor(skill: Omit<SkillEntity, 'createdAt'>, id?: string) {
    super(skill, id);
    Object.assign(this, skill);

    if (!this.users) {
      this.users = [];
    }
  }
}
