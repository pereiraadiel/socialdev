import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { RequestWithUser } from './dtos/request.dto';
import { AuthGuard } from '../guards/auth.guard';
import { FeedService } from '../../domain/services/feed.service';
import { PaginatedQueryDTO } from './dtos/paginated.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getHeroesPosts(
    @Req() req: RequestWithUser,
    @Query() paginated: PaginatedQueryDTO,
  ) {
    const id = req.user.id;
    return await this.feedService.getHeroesPosts(
      id,
      Number(paginated.page),
      Number(paginated.limit),
    );
  }
}
