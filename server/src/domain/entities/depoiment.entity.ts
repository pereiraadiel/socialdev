import { CommunityEntity } from './community.entity';
import { Entity } from './entity';
import { UserEntity } from './user.entity';

export class DepoimentEntity extends Entity {
  content: string;
  userId: string;

  user?: UserEntity;
  communities?: CommunityEntity;

  constructor(depoiment: Omit<DepoimentEntity, 'createdAt'>, id?: string) {
    super(depoiment, id);
    Object.assign(this, depoiment);
  }
}
