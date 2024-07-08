import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../domain/services/auth.service';
import { RefreshTokenBodyDTO, SignInBodyDTO } from './dtos/auth.dto';

@Controller('sign')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('in')
  authenticate(@Body() { username, password }: SignInBodyDTO) {
    return this.authService.login(username, password);
  }

  @Post('refresh')
  refresh(
    @Body()
    { refreshToken }: RefreshTokenBodyDTO,
  ) {
    return this.authService.refresh(refreshToken);
  }
}
