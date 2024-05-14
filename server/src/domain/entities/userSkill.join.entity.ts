import { SkillEntity } from './skill.entity';
import { UserEntity } from './user.entity';

export class UserSkillJoinEntity {
  userId: string;
  skillId: string;
  voterId: string;
  evaluation: number;

  user?: UserEntity;
  skill?: SkillEntity;
  voter?: UserEntity;

  constructor(entity: UserSkillJoinEntity) {
    Object.assign(this, entity);
  }
}
