import { IsJWT, Matches } from 'class-validator';

export class SignInBodyDTO {
  @Matches(/^[a-zA-Z0-9]{4,}$/, {
    message: 'username must be at least 4 characters long.',
  })
  username: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'password must contain at least 1 letter and 1 number, and be at least 8 characters long.',
  })
  password: string;
}

export class RefreshTokenBodyDTO {
  @IsJWT()
  refreshToken: string;
}
