import { Injectable } from '@nestjs/common';
import { PostEntity } from '../../domain/entities/post.entity';
import { PostsRepository } from '../../domain/repositories/posts.repository';
import { PrismaIntegration } from '../integrations/prisma.integration';

@Injectable()
export class PostsPrismaRepository implements PostsRepository {
  constructor(private readonly prisma: PrismaIntegration) {}

  async create(post: PostEntity): Promise<PostEntity> {
    const entity = await this.prisma.post.create({
      data: {
        content: post.content,
        slug: post.slug,
        title: post.slug,
        createdAt: post.createdAt,
        id: post.id,
        // likes: post.likes,
        updatedAt: post.updatedAt,
        owner: {
          connect: {
            id: post.ownerId,
          },
        },
      },
    });

    return new PostEntity(entity);
  }

  async findById(id: string): Promise<PostEntity> {
    const entity = await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        likes: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!entity) return null;

    return new PostEntity(entity);
  }

  async findBySlug(slug: string): Promise<PostEntity> {
    const entity = await this.prisma.post.findUnique({
      where: {
        slug,
      },
      include: {
        likes: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!entity) return null;

    return new PostEntity(entity);
  }

  async findMany(page: number, pageSize: number): Promise<PostEntity[]> {
    const entities = await this.prisma.post.findMany({
      skip: page * pageSize,
      take: pageSize,
    });

    return entities.map((entity) => new PostEntity(entity));
  }

  async findManyByHeroes(
    heroIds: string[],
    page: number,
    pageSize: number,
  ): Promise<PostEntity[]> {
    const entities = await this.prisma.post.findMany({
      skip: page * pageSize,
      take: pageSize,
      where: {
        owner: {
          id: {
            in: heroIds,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return entities.map((entity) => new PostEntity(entity));
  }

  async count(page: number, pageSize: number): Promise<number> {
    return this.prisma.post.count({
      skip: page * pageSize,
      take: pageSize,
    });
  }

  async update(id: string, post: Partial<PostEntity>): Promise<PostEntity> {
    const entity = await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        content: post.content,
        slug: post.slug,
        title: post.slug,
        createdAt: post.createdAt,
        id: post.id,
        // likes: post.likes,
        updatedAt: new Date(),
        owner: {
          connect: {
            id: post.ownerId,
          },
        },
      },
    });

    if (!entity) return null;

    return new PostEntity(entity);
  }

  async delete(slug: string): Promise<void> {
    await this.prisma.post.delete({
      where: {
        slug,
      },
    });
  }
}
