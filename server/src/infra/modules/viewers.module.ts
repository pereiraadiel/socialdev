import { Module } from '@nestjs/common';
import { UserViewer } from '../../domain/viewers/user.viewer';
import { FanbaseViewer } from '../../domain/viewers/fanbase.viewer';

@Module({
  imports: [],
  controllers: [],
  providers: [UserViewer, FanbaseViewer],
  exports: [UserViewer, FanbaseViewer],
})
export class ViewersModule {}
