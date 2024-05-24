import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../domain/services/auth.service';

@Controller('sign')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('in')
  authenticate(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(username, password);
  }
}
