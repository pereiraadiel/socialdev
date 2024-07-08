import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { PrismaIntegration } from '../integrations/prisma.integration';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaIntegration) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const entity = await this.prisma.user.create({
      data: {
        ...user,
        fans: undefined,
        heroes: undefined,
        myFriends: undefined,
        friends: undefined,
        skills: undefined,
        skillVotes: undefined,
        communities: undefined,
        depoiments: undefined,
      },
    });

    return new UserEntity(entity);
  }

  async findById(id: string): Promise<UserEntity> {
    const entity = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        fans: true,
        heroes: true,
      },
    });

    if (!entity) return null;

    return new UserEntity(entity);
  }

  async findByUsername(username: string): Promise<UserEntity> {
    const entity = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!entity) return null;

    return new UserEntity(entity);
  }

  async findMany(page: number, pageSize: number): Promise<UserEntity[]> {
    const entities = await this.prisma.user.findMany({
      skip: page * pageSize,
      take: pageSize,
    });

    return entities.map((entity) => new UserEntity(entity));
  }

  async count(page: number, pageSize: number): Promise<number> {
    return this.prisma.user.count({
      skip: page * pageSize,
      take: pageSize,
    });
  }

  async update(id: string, user: Partial<UserEntity>): Promise<UserEntity> {
    const entity = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
        fans: undefined,
        heroes: undefined,
        myFriends: undefined,
        friends: undefined,
        skills: undefined,
        skillVotes: undefined,
        communities: undefined,
        depoiments: undefined,
      },
    });

    if (!entity) return null;

    return new UserEntity(entity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
