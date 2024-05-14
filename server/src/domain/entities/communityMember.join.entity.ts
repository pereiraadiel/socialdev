import { CommunityEntity } from './community.entity';
import { UserEntity } from './user.entity';

export class CommunityMemberJoinEntity {
  userId: string;
  communityId: string;
  createdAt: Date;

  user?: UserEntity;
  community?: CommunityEntity;

  constructor(entity: CommunityMemberJoinEntity) {
    Object.assign(this, entity);
  }
}
