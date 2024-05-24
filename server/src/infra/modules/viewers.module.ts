import { Module } from '@nestjs/common';
import { UserViewer } from '../../domain/viewers/user.viewer';

@Module({
  imports: [],
  controllers: [],
  providers: [UserViewer],
  exports: [UserViewer],
})
export class ViewersModule {}
