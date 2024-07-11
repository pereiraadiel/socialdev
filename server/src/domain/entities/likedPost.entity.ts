import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

export class LikedPostEntity {
  userId: string;
  postId: string;

  user?: UserEntity;
  post?: PostEntity;

  constructor(entity: LikedPostEntity) {
    Object.assign(this, entity);
  }
}
