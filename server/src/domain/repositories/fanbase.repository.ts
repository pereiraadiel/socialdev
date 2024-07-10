import { FanbaseEntity } from './../entities/fanbase.entity';

export const FANBASE_REPOSITORY = 'FANBASE_REPOSITORY';

export interface FanbaseRepository {
  create(heroId: string, fanId: string): Promise<FanbaseEntity>;
  findOneByHeroIdAndFanId(
    heroId: string,
    fanId: string,
  ): Promise<FanbaseEntity | null>;
  findManyByHeroId(heroId: string): Promise<FanbaseEntity[]>; // get all fans of the heroId
  findManyByFanId(fanId: string): Promise<FanbaseEntity[]>; // get all heroes of the fanId
  delete(heroId: string, fanId: string): Promise<void>;
}
