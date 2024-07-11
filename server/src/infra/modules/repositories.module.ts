import { Module } from '@nestjs/common';
import { USERS_REPOSITORY } from '../../domain/repositories/users.repository';
import { UsersPrismaRepository } from '../repositories/users.prisma.repository';
import { IntegrationsModule } from './integrations.module';
import { FANBASE_REPOSITORY } from '../../domain/repositories/fanbase.repository';
import { FanbasePrismaRepository } from '../repositories/fanbase.prisma.repository';
import { POSTS_REPOSITORY } from '../../domain/repositories/posts.repository';
import { PostsPrismaRepository } from '../repositories/posts.prisma.repository';
import { LIKED_POST_REPOSITORY } from '../../domain/repositories/likedPost.repository';
import { LikedPostPrismaRepository } from '../repositories/likedPost.prisma.repository';

const userRepository = {
  provide: USERS_REPOSITORY,
  useClass: UsersPrismaRepository,
};

const fanbaseRepository = {
  provide: FANBASE_REPOSITORY,
  useClass: FanbasePrismaRepository,
};

const postRepository = {
  provide: POSTS_REPOSITORY,
  useClass: PostsPrismaRepository,
};

const likedPostRepository = {
  provide: LIKED_POST_REPOSITORY,
  useClass: LikedPostPrismaRepository,
};

@Module({
  imports: [IntegrationsModule],
  controllers: [],
  providers: [
    userRepository,
    fanbaseRepository,
    postRepository,
    likedPostRepository,
  ],
  exports: [
    userRepository,
    fanbaseRepository,
    postRepository,
    likedPostRepository,
  ],
})
export class RepositoriesModule {}
