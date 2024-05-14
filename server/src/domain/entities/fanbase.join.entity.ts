import { UserEntity } from './user.entity';

export class FanbaseJoinEntity {
  userId: string;
  fanUserId: string;

  user?: UserEntity;
  fan?: UserEntity;

  constructor(entity: FanbaseJoinEntity) {
    Object.assign(this, entity);
  }
}
