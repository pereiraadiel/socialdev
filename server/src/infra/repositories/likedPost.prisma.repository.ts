import { Injectable } from '@nestjs/common';
import { LikedPostEntity } from '../../domain/entities/likedPost.entity';
import { LikedPostRepository } from '../../domain/repositories/likedPost.repository';
import { PrismaIntegration } from '../integrations/prisma.integration';

@Injectable()
export class LikedPostPrismaRepository implements LikedPostRepository {
  constructor(private readonly prisma: PrismaIntegration) {}

  async create(userId: string, postId: string): Promise<LikedPostEntity> {
    const entity = await this.prisma.likedPost.create({
      data: {
        userId,
        postId,
      },
      include: {
        user: true,
        post: {
          include: {
            likes: true,
          },
        },
      },
    });

    return new LikedPostEntity(entity);
  }

  async findOneByUserIdAndPostId(
    userId: string,
    postId: string,
  ): Promise<LikedPostEntity | null> {
    const entity = await this.prisma.likedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
      include: {
        user: true,
        post: {
          include: {
            likes: true,
          },
        },
      },
    });

    if (!entity) {
      return null;
    }

    return new LikedPostEntity(entity);
  }

  async findManyByUserId(userId: string): Promise<LikedPostEntity[]> {
    const entities = await this.prisma.likedPost.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        post: {
          include: {
            likes: true,
          },
        },
      },
    });

    return entities.map((entity) => new LikedPostEntity(entity));
  }

  async findManyByPostId(postId: string): Promise<LikedPostEntity[]> {
    const entities = await this.prisma.likedPost.findMany({
      where: {
        postId,
      },
      include: {
        user: true,
        post: {
          include: {
            likes: true,
          },
        },
      },
    });

    return entities.map((entity) => new LikedPostEntity(entity));
  }

  async delete(userId: string, postId: string): Promise<void> {
    await this.prisma.likedPost.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  }
}
