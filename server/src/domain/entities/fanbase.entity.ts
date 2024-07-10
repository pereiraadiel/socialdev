import { UserEntity } from './user.entity';

export class FanbaseEntity {
  heroId: string;
  fanId: string;

  hero?: UserEntity;
  fan?: UserEntity;

  constructor(entity: FanbaseEntity) {
    Object.assign(this, entity);
  }
}
