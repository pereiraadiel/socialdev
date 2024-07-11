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

  async getHeroesPosts(userId: string, page = 1, pageSize = 10) {
    try {
      const user = await this.usersRepository.findById(userId);
      const heroes = user.heroes.map((hero) => hero.heroId);

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
