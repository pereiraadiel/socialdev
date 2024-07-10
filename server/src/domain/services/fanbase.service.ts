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

@Injectable()
export class FanbaseService {
  constructor(
    @Inject(FANBASE_REPOSITORY)
    private readonly fanbaseRepository: FanbaseRepository,
    private readonly fanbaseViewer: FanbaseViewer,
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
      console.error(error.message);
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

      console.log(fanbase);

      return this.fanbaseViewer.setEntity(fanbase).response();
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new UnprocessableEntityException();
    }
  }
}
