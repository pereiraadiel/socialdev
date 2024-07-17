import { Injectable } from '@nestjs/common';
import { FanbaseEntity } from '../../domain/entities/fanbase.entity';
import { FanbaseRepository } from '../../domain/repositories/fanbase.repository';
import { PrismaIntegration } from '../integrations/prisma.integration';

@Injectable()
export class FanbasePrismaRepository implements FanbaseRepository {
  constructor(private readonly prisma: PrismaIntegration) {}

  async create(heroId: string, fanId: string): Promise<FanbaseEntity> {
    const entity = await this.prisma.fanbase.create({
      data: {
        heroId,
        fanId,
      },
      include: {
        hero: true,
        fan: true,
      },
    });

    return new FanbaseEntity(entity);
  }

  async findOneByHeroIdAndFanId(
    heroId: string,
    fanId: string,
  ): Promise<FanbaseEntity | null> {
    const entity = await this.prisma.fanbase.findUnique({
      where: {
        heroId_fanId: {
          heroId,
          fanId,
        },
      },
      include: {
        hero: true,
        fan: true,
      },
    });

    if (!entity) {
      return null;
    }

    return new FanbaseEntity(entity);
  }

  async findManyByHeroId(heroId: string): Promise<FanbaseEntity[]> {
    const entities = await this.prisma.fanbase.findMany({
      where: {
        heroId,
      },
      include: {
        hero: true,
        fan: true,
      },
    });

    return entities.map((entity) => new FanbaseEntity(entity));
  }

  async findManyByFanId(fanId: string): Promise<FanbaseEntity[]> {
    const entities = await this.prisma.fanbase.findMany({
      where: {
        fanId,
      },
      include: {
        hero: true,
        fan: true,
      },
    });

    return entities.map((entity) => new FanbaseEntity(entity));
  }

  async findManyHeroesNotFanOfFan(fanId: string): Promise<FanbaseEntity[]> {
    const entities = await this.prisma.fanbase.findMany({
      where: {
        NOT: {
          fan: {
            id: fanId,
          },
        },
        AND: {
          // prevent the suggest heroes containing the fanId (the user itself)
          NOT: {
            hero: {
              id: fanId,
            },
          },
        },
      },
      include: {
        hero: true,
        fan: true,
      },
    });

    return entities.map((entity) => new FanbaseEntity(entity));
  }

  async delete(heroId: string, fanId: string): Promise<void> {
    await this.prisma.fanbase.delete({
      where: {
        heroId_fanId: {
          heroId,
          fanId,
        },
      },
    });
  }
}
