import { Module } from '@nestjs/common';
import { ServicesModule } from './services.module';
import { ViewersModule } from './viewers.module';
import { ControllersModule } from './controllers.module';
import { RepositoriesModule } from './repositories.module';
import { IntegrationsModule } from './integrations.module';

@Module({
  imports: [
    ServicesModule,
    ViewersModule,
    ControllersModule,
    RepositoriesModule,
    IntegrationsModule,
  ],
})
export class AppModule {}
