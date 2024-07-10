import { FanbaseEntity } from '../entities/fanbase.entity';

export class FanbaseViewer {
  entity: FanbaseEntity;

  setEntity(entity: FanbaseEntity) {
    this.entity = entity;
    console.log(entity, 'fanbase viewer');
    return this;
  }

  response() {
    return {
      heroId: this.entity.heroId,
      fanId: this.entity.fanId,
      hero: {
        id: this.entity.hero.id,
        username: this.entity.hero.username,
        fullname: `${this.entity.hero.firstName} ${this.entity.hero.lastName}`,
        pictureURL: this.entity.hero.pictureURL,
      },
      fan: {
        id: this.entity.fan.id,
        username: this.entity.fan.username,
        fullname: `${this.entity.fan.firstName} ${this.entity.fan.lastName}`,
        pictureURL: this.entity.fan.pictureURL,
      },
    };
  }

  heroOnlyResponse() {
    return {
      id: this.entity.hero.id,
      username: this.entity.hero.username,
      fullname: `${this.entity.hero.firstName} ${this.entity.hero.lastName}`,
      pictureURL: this.entity.hero.pictureURL,
    };
  }

  fanOnlyResponse() {
    return {
      id: this.entity.fan.id,
      username: this.entity.fan.username,
      fullname: `${this.entity.fan.firstName} ${this.entity.fan.lastName}`,
      pictureURL: this.entity.fan.pictureURL,
    };
  }
}
