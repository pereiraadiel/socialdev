import { PostEntity } from '../entities/post.entity';

export const POSTS_REPOSITORY = 'POSTS_REPOSITORY';

export interface PostsRepository {
  create(post: PostEntity): Promise<PostEntity>;
  findById(id: string): Promise<PostEntity | null>;
  findBySlug(slug: string): Promise<PostEntity | null>;
  findMany(page: number, pageSize: number): Promise<PostEntity[]>;
  findManyByOwnerId(
    ownerId: string,
    page?: number,
    pageSize?: number,
  ): Promise<PostEntity[]>;
  findManyByHeroes(
    heroIds: string[],
    page?: number,
    pageSize?: number,
  ): Promise<PostEntity[]>;
  count(page: number, pageSize: number): Promise<number>;
  update(id: string, post: Partial<PostEntity>): Promise<PostEntity>;
  delete(id: string): Promise<void>;
}
