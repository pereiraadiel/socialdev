import { Module } from '@nestjs/common';
import { USERS_REPOSITORY } from '../../domain/repositories/users.repository';
import { UsersPrismaRepository } from '../repositories/users.prisma.repository';
import { IntegrationsModule } from './integrations.module';

const userRepository = {
  provide: USERS_REPOSITORY,
  useClass: UsersPrismaRepository,
};

@Module({
  imports: [IntegrationsModule],
  controllers: [],
  providers: [userRepository],
  exports: [userRepository],
})
export class RepositoriesModule {}
