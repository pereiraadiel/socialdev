import {
  BadRequestException,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  FANBASE_REPOSITORY,
  FanbaseRepository,
} from '../repositories/fanbase.repository';
import { FanbaseViewer } from '../viewers/fanbase.viewer';
import {
  USERS_REPOSITORY,
  UsersRepository,
} from '../repositories/users.repository';
import { UserViewer } from '../viewers/user.viewer';

@Injectable()
export class FanbaseService {
  constructor(
    @Inject(FANBASE_REPOSITORY)
    private readonly fanbaseRepository: FanbaseRepository,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    private readonly fanbaseViewer: FanbaseViewer,
    private readonly userViewer: UserViewer,
  ) {}

  async becomeFan(fanId: string, heroId: string) {
    try {
      if (heroId === fanId) {
        throw new BadRequestException('You cannot be a fan of yourself');
      }

      const alreadyFan = await this.fanbaseRepository.findOneByHeroIdAndFanId(
        heroId,
        fanId,
      );

      if (alreadyFan)
        return this.fanbaseViewer.setEntity(alreadyFan).response();

      const fanbase = await this.fanbaseRepository.create(heroId, fanId);

      return this.fanbaseViewer.setEntity(fanbase).response();
    } catch (error) {
      if (
        error.message.includes('Foreign key constraint failed on the field')
      ) {
        throw new BadRequestException('Invalid heroId or fanId');
      }

      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new UnprocessableEntityException();
    }
  }

  async stopBeingFan(fanId: string, heroId: string) {
    try {
      if (heroId === fanId) {
        throw new BadRequestException('You cannot be a fan of yourself');
      }

      const fanbase = await this.fanbaseRepository.findOneByHeroIdAndFanId(
        heroId,
        fanId,
      );

      if (!fanbase) {
        throw new BadRequestException('You are not a fan of this hero');
      }

      await this.fanbaseRepository.delete(fanbase.heroId, fanbase.fanId);

      return this.fanbaseViewer.setEntity(fanbase).response();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new UnprocessableEntityException();
    }
  }

  async getFansByHeroId(heroId: string) {
    try {
      const fans = await this.fanbaseRepository.findManyByHeroId(heroId);

      return fans.map((fan) =>
        this.fanbaseViewer.setEntity(fan).fanOnlyResponse(),
      );
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async getHeroesByFanId(fanId: string) {
    try {
      const heroes = await this.fanbaseRepository.findManyByFanId(fanId);

      return heroes.map((hero) =>
        this.fanbaseViewer.setEntity(hero).heroOnlyResponse(),
      );
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async suggestHeroes(userId: string) {
    try {
      const users = await this.usersRepository.findManyNotHeroOfUserId(userId);

      // remove the user itself from the list
      const index = users.findIndex((user) => user.id === userId);
      if (index > -1) {
        users.splice(index, 1);
      }

      return users.map((user) =>
        this.userViewer.setUser(user).minimalResponse(),
      );
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }
}
