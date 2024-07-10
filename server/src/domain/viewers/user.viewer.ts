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
      firstName: this.entity.firstName,
      lastName: this.entity.lastName,
      biography: this.entity.biography,
      pictureURL: this.entity.pictureURL,
      fans: this.entity.fans.length,
      heroes: this.entity.heroes.length,
      createdAt: this.entity.createdAt,
      updatedAt: this.entity.updatedAt,
    };
  }

  payloadResponse() {
    return {
      id: this.entity.id,
      username: this.entity.username,
      fullname: `${this.entity.firstName} ${this.entity.lastName}`,
    };
  }

  response() {
    return {
      ...this.maskedResponse(),
      fans: this.entity.fans,
      heroes: this.entity.heroes,
    };
  }
}

type MaskedResponseType = ReturnType<UserViewer['maskedResponse']>;
type ResponseType = ReturnType<UserViewer['response']>;

export type UserViewerType = MaskedResponseType | ResponseType;
