import { Module } from '@nestjs/common';
import { UserViewer } from '../../domain/viewers/user.viewer';
import { FanbaseViewer } from '../../domain/viewers/fanbase.viewer';
import { PostViewer } from '../../domain/viewers/post.viewer';

@Module({
  imports: [],
  controllers: [],
  providers: [UserViewer, FanbaseViewer, PostViewer],
  exports: [UserViewer, FanbaseViewer, PostViewer],
})
export class ViewersModule {}
