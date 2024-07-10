import { Module } from '@nestjs/common';
import { USERS_REPOSITORY } from '../../domain/repositories/users.repository';
import { UsersPrismaRepository } from '../repositories/users.prisma.repository';
import { IntegrationsModule } from './integrations.module';
import { FANBASE_REPOSITORY } from '../../domain/repositories/fanbase.repository';
import { FanbasePrismaRepository } from '../repositories/fanbase.prisma.repository';

const userRepository = {
  provide: USERS_REPOSITORY,
  useClass: UsersPrismaRepository,
};

const fanbaseRepository = {
  provide: FANBASE_REPOSITORY,
  useClass: FanbasePrismaRepository,
};

@Module({
  imports: [IntegrationsModule],
  controllers: [],
  providers: [userRepository, fanbaseRepository],
  exports: [userRepository, fanbaseRepository],
})
export class RepositoriesModule {}
