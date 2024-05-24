import { Module } from '@nestjs/common';
import { AuthService } from '../../domain/services/auth.service';
import { ViewersModule } from './viewers.module';
import { RepositoriesModule } from './repositories.module';

@Module({
  imports: [ViewersModule, RepositoriesModule],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class ServicesModule {}
