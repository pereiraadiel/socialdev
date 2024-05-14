import { CommunityVisibility } from '../enums/communityVisibility.enum';
import { DepoimentEntity } from './depoiment.entity';
import { Entity } from './entity';
import { UserEntity } from './user.entity';

export class CommunityEntity extends Entity {
  name: string;
  description: string;
  pictureURL: string;
  slug: string;
  ownerId: string;
  visibility: CommunityVisibility;

  depoiments?: DepoimentEntity[];
  members?: UserEntity[];

  constructor(community: Omit<CommunityEntity, 'createdAt'>, id?: string) {
    super(community, id);
    Object.assign(this, community);

    if (!this.depoiments) {
      this.depoiments = [];
    }

    if (!this.members) {
      this.members = [];
    }
  }
}
