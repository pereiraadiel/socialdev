import {
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FanbaseService } from '../../domain/services/fanbase.service';
import { RequestFanbaseQueryDTO } from './dtos/fanbase.dto';
import { RequestWithUser } from './dtos/request.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('fanbase')
export class FanbaseController {
  constructor(private readonly fanbaseService: FanbaseService) {}

  @Post()
  @UseGuards(AuthGuard)
  async becomeFan(
    @Query() { heroId }: RequestFanbaseQueryDTO,
    @Req() req: RequestWithUser,
  ) {
    const fanId = req.user.id;
    return await this.fanbaseService.becomeFan(fanId, heroId);
  }

  @Delete()
  @UseGuards(AuthGuard)
  async stopBeingFan(
    @Query() { heroId }: RequestFanbaseQueryDTO,
    @Req() req: RequestWithUser,
  ) {
    const fanId = req.user.id;
    return await this.fanbaseService.stopBeingFan(fanId, heroId);
  }
}
