import { UserEntity } from './user.entity';

export class FriendshipJoinEntity {
  userId: string;
  friendId: string;
  createdAt: Date;

  user?: UserEntity;
  friend?: UserEntity;

  constructor(entity: FriendshipJoinEntity) {
    Object.assign(this, entity);
  }
}
