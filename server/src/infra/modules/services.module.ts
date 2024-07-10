import { Module } from '@nestjs/common';
import { AuthService } from '../../domain/services/auth.service';
import { ViewersModule } from './viewers.module';
import { RepositoriesModule } from './repositories.module';
import { UsersService } from '../../domain/services/users.service';
import { FanbaseService } from '../../domain/services/fanbase.service';

@Module({
  imports: [ViewersModule, RepositoriesModule],
  controllers: [],
  providers: [AuthService, UsersService, FanbaseService],
  exports: [AuthService, UsersService, FanbaseService],
})
export class ServicesModule {}
