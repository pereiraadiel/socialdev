import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { ServicesModule } from './services.module';
import { UsersController } from '../controllers/users.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthConstants } from '../../constants/auth.constant';
import { FanbaseController } from '../controllers/fanbase.controller';
import { PostsController } from '../controllers/posts.controller';
import { FeedController } from '../controllers/feed.controller';

@Module({
  imports: [
    ServicesModule,
    JwtModule.register({
      global: true,
      secret: AuthConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [
    AuthController,
    UsersController,
    FanbaseController,
    PostsController,
    FeedController,
  ],
  providers: [],
})
export class ControllersModule {}
