import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { ServicesModule } from './services.module';

@Module({
  imports: [ServicesModule],
  controllers: [AuthController],
  providers: [],
})
export class ControllersModule {}
