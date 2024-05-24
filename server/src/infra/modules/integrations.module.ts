import { Module } from '@nestjs/common';
import { PrismaIntegration } from '../integrations/prisma.integration';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaIntegration],
  exports: [PrismaIntegration],
})
export class IntegrationsModule {}
