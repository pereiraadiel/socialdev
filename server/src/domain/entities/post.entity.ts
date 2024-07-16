import { Entity } from './entity';
import { LikedPostEntity } from './likedPost.entity';
import { UserEntity } from './user.entity';

export class PostEntity extends Entity {
  ownerId: string;
  title: string;
  content: string;
  slug: string;
  likes?: LikedPostEntity[];

  owner?: UserEntity;
  constructor(entity: Omit<PostEntity, 'createdAt' | 'id'>, id?: string) {
    super(entity, id);
    Object.assign(this, entity);

    if (!this.likes) {
      this.likes = [];
    }
  }
}
