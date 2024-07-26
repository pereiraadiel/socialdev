import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from '../../domain/services/post.service';
import { RequestWithUser } from './dtos/request.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CreatePostBodyDTO, GetManyPostsQueryDTO } from './dtos/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() req: RequestWithUser, @Body() body: CreatePostBodyDTO) {
    const id = req.user.id;
    return await this.postsService.create(body, id);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getManyByOwnerId(
    @Query() { ownerId, page, pageSize }: GetManyPostsQueryDTO,
  ) {
    const pageInt = page ? Number(page) - 1 : 0;
    const pageSizeInt = pageSize ? Number(pageSize) : 10;

    return await this.postsService.getManyByOwnerId(
      ownerId,
      pageInt,
      pageSizeInt,
    );
  }

  @Post(':id/like')
  @UseGuards(AuthGuard)
  async like(@Req() req: RequestWithUser, @Param() { id: postId }: any) {
    const userId = req.user.id;
    return await this.postsService.like(userId, postId);
  }
  @Delete(':id/unlike')
  @UseGuards(AuthGuard)
  async unlike(@Req() req: RequestWithUser, @Param() { id: postId }: any) {
    const userId = req.user.id;
    return await this.postsService.unlike(userId, postId);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async delete(@Req() req: RequestWithUser, @Param() { slug }: any) {
    const id = req.user.id;
    return await this.postsService.delete(slug, id);
  }
}
