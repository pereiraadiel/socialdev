import { Entity } from './entity';
import { LikedPostEntity } from './likedPost.entity';

export class PostEntity extends Entity {
  ownerId: string;
  title: string;
  content: string;
  slug: string;
  likes?: LikedPostEntity[];

  constructor(entity: Omit<PostEntity, 'createdAt' | 'id'>, id?: string) {
    super(entity, id);
    Object.assign(this, entity);

    if (!this.likes) {
      this.likes = [];
    }
  }
}
