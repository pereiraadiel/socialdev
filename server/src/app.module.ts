import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './domain/services/auth.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
