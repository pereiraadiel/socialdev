import { Module } from '@nestjs/common';
import { AuthService } from '../../domain/services/auth.service';
import { ViewersModule } from './viewers.module';
import { RepositoriesModule } from './repositories.module';
import { UsersService } from '../../domain/services/users.service';
import { FanbaseService } from '../../domain/services/fanbase.service';
import { PostService } from '../../domain/services/post.service';
import { FeedService } from '../../domain/services/feed.service';

@Module({
  imports: [ViewersModule, RepositoriesModule],
  controllers: [],
  providers: [
    AuthService,
    UsersService,
    FanbaseService,
    PostService,
    FeedService,
  ],
  exports: [
    AuthService,
    UsersService,
    FanbaseService,
    PostService,
    FeedService,
  ],
})
export class ServicesModule {}
