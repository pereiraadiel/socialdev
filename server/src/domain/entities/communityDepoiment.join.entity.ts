import { CommunityEntity } from './community.entity';
import { DepoimentEntity } from './depoiment.entity';

export class CommunityDepoimentJoinEntity {
  depoimentId: string;
  communityId: string;

  depoiment?: DepoimentEntity;
  community?: CommunityEntity;

  constructor(entity: CommunityDepoimentJoinEntity) {
    Object.assign(this, entity);
  }
}
