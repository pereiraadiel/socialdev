import { UserEntity } from '../entities/user.entity';

export class UserViewer {
  entity: UserEntity;

  setUser(user: UserEntity) {
    delete user.password;
    this.entity = user;
    return this;
  }

  maskedResponse() {
    return {
      id: this.entity.id,
      username: this.entity.username,
      createdAt: this.entity.createdAt,
      updatedAt: this.entity.updatedAt,
    };
  }

  response() {
    return {
      ...this.maskedResponse(),
      firstName: this.entity.firstName,
      lastName: this.entity.lastName,
      biography: this.entity.biography,
      fans: this.entity.fans,
      heroes: this.entity.heroes,
      myFriends: this.entity.myFriends,
      skills: this.entity.skills,
      communities: this.entity.communities,
      depoiments: this.entity.depoiments,
    };
  }
}

type MaskedResponseType = ReturnType<UserViewer['maskedResponse']>;
type ResponseType = ReturnType<UserViewer['response']>;

export type UserViewerType = MaskedResponseType | ResponseType;
