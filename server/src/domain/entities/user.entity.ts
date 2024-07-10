import { Entity } from './entity';
import { UserSex } from '../enums/usersex.enum';
import { FanbaseEntity } from './fanbase.entity';

export class UserEntity extends Entity {
  firstName: string;
  lastName: string;
  biography: string;
  sex: UserSex;
  pictureURL: string;
  username: string;
  password: string;

  fans?: FanbaseEntity[];
  heroes?: FanbaseEntity[];

  constructor(user: Omit<UserEntity, 'createdAt' | 'id'>, id?: string) {
    super(user, id);
    Object.assign(this, user);

    if (!this.fans) {
      this.fans = [];
    }

    if (!this.heroes) {
      this.heroes = [];
    }
  }
}
