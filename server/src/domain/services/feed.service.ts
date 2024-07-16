import {
  ConflictException,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  POSTS_REPOSITORY,
  PostsRepository,
} from '../repositories/posts.repository';
import { PostViewer } from '../viewers/post.viewer';
import {
  USERS_REPOSITORY,
  UsersRepository,
} from '../repositories/users.repository';

@Injectable()
export class FeedService {
  constructor(
    @Inject(POSTS_REPOSITORY)
    private readonly postsRepository: PostsRepository,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    private readonly postViewer: PostViewer,
  ) {}

  async getHeroesPosts(userId: string, pag = 1, pagSize = 10) {
    try {
      const page = Number(pag - 1) || 0;
      const pageSize = Number(pagSize) || 10;
      const user = await this.usersRepository.findById(userId);
      const heroes = user.heroes.map((hero) => hero.heroId);

      console.log(page, pageSize, heroes, userId);
      if (heroes.length === 0) {
        const posts = await this.postsRepository.findMany(page, pageSize);
        return posts.map((post) => this.postViewer.setPost(post).response());
      }

      const posts = await this.postsRepository.findManyByHeroes(
        heroes,
        page,
        pageSize,
      );

      return posts.map((post) => this.postViewer.setPost(post).response());
    } catch (error) {
      console.error(error);
      if (error instanceof ConflictException) throw error;
      throw new UnprocessableEntityException();
    }
  }
}
