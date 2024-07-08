import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { GetUserByIdDTO } from './dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getById(@Param() { id }: GetUserByIdDTO) {
    return await this.usersService.getById(id);
  }
}
