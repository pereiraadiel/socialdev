import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { ServicesModule } from './services.module';
import { UsersController } from '../controllers/users.controller';

@Module({
  imports: [ServicesModule],
  controllers: [AuthController, UsersController],
  providers: [],
})
export class ControllersModule {}
