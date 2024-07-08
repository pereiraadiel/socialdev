import { Entity } from './entity';
import { UserSex } from '../enums/usersex.enum';
import { CommunityDepoimentJoinEntity } from './communityDepoiment.join.entity';
import { CommunityMemberJoinEntity } from './communityMember.join.entity';
import { FanbaseJoinEntity } from './fanbase.join.entity';
import { FriendshipJoinEntity } from './friendship.join.entity';
import { UserSkillJoinEntity } from './userSkill.join.entity';

export class UserEntity extends Entity {
  firstName: string;
  lastName: string;
  biography: string;
  sex: UserSex;
  pictureURL: string;
  username: string;
  password: string;

  fans?: FanbaseJoinEntity[];
  heroes?: FanbaseJoinEntity[];
  myFriends?: FriendshipJoinEntity[];
  friends?: FriendshipJoinEntity[];
  skills?: UserSkillJoinEntity[];
  skillVotes?: UserSkillJoinEntity[];
  communities?: CommunityMemberJoinEntity[];
  depoiments?: CommunityDepoimentJoinEntity[];

  constructor(user: Omit<UserEntity, 'createdAt' | 'id'>, id?: string) {
    super(user, id);
    Object.assign(this, user);

    if (!this.fans) {
      this.fans = [];
    }

    if (!this.heroes) {
      this.heroes = [];
    }

    if (!this.myFriends) {
      this.myFriends = [];
    }

    if (!this.friends) {
      this.friends = [];
    }

    if (!this.skills) {
      this.skills = [];
    }

    if (!this.skillVotes) {
      this.skillVotes = [];
    }

    if (!this.communities) {
      this.communities = [];
    }

    if (!this.depoiments) {
      this.depoiments = [];
    }
  }
}
