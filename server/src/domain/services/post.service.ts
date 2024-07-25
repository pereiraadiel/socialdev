import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  POSTS_REPOSITORY,
  PostsRepository,
} from '../repositories/posts.repository';
import { PostViewer } from '../viewers/post.viewer';
import {
  LIKED_POST_REPOSITORY,
  LikedPostRepository,
} from '../repositories/likedPost.repository';
import { CreatePostBodyDTO } from '../../infra/controllers/dtos/post.dto';
import { PostEntity } from '../entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject(POSTS_REPOSITORY)
    private readonly postsRepository: PostsRepository,
    @Inject(LIKED_POST_REPOSITORY)
    private readonly likedPostsRepository: LikedPostRepository,
    private readonly postViewer: PostViewer,
  ) {}

  async create(dto: CreatePostBodyDTO, ownerId: string) {
    try {
      const title = dto.title;
      const slug = dto.title.replaceAll(' ', '-').toLowerCase();
      dto.title = title;
      const alreadyExists = await this.postsRepository.findBySlug(slug);
      if (alreadyExists) {
        throw new ConflictException('Already exists an post with this slug');
      }

      const entity = new PostEntity({
        ...dto,
        ownerId,
        slug,
      });

      console.log(entity);

      const post = await this.postsRepository.create(entity);
      console.log(post);
      return this.postViewer.setPost(post).response();
    } catch (error) {
      console.error(error);
      if (error instanceof ConflictException) throw error;
      throw new UnprocessableEntityException();
    }
  }

  async getManyByOwnerId(ownerId: string) {
    try {
      const posts = await this.postsRepository.findManyByOwnerId(ownerId);
      return posts.map((post) =>
        this.postViewer.setPost(post).maskedResponse(),
      );
    } catch (error) {
      console.error(error);
      throw new UnprocessableEntityException();
    }
  }

  async like(userId: string, postId: string) {
    try {
      const alreadyLiked =
        await this.likedPostsRepository.findOneByUserIdAndPostId(
          userId,
          postId,
        );
      if (alreadyLiked)
        return this.postViewer.setPost(alreadyLiked.post).maskedResponse();

      const likedPost = await this.likedPostsRepository.create(userId, postId);
      return this.postViewer.setPost(likedPost.post).maskedResponse();
    } catch (error) {
      console.error(error);
      throw new UnprocessableEntityException();
    }
  }
  async unlike(userId: string, postId: string) {
    try {
      const hasLiked = await this.likedPostsRepository.findOneByUserIdAndPostId(
        userId,
        postId,
      );
      if (!hasLiked)
        throw new BadRequestException('you does not have liked this post');

      await this.likedPostsRepository.delete(userId, postId);
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) throw error;
      throw new UnprocessableEntityException();
    }
  }

  async delete(slug: string, userId: string) {
    try {
      const postExists = await this.postsRepository.findBySlug(slug);
      if (postExists || postExists.ownerId !== userId) {
        throw new NotFoundException('Post not found');
      }
      await this.postsRepository.delete(slug);
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new UnprocessableEntityException();
    }
  }
}
