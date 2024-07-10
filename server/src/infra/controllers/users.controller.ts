import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { GetUserByIdDTO } from './dtos/users.dto';
import { RequestWithUser } from './dtos/request.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: RequestWithUser) {
    const id = req.user.id;
    return await this.usersService.getMe(id);
  }

  @Get(':id')
  async getById(@Param() { id }: GetUserByIdDTO) {
    return await this.usersService.getById(id);
  }
}
