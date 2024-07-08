import { IsEnum, IsJWT, IsString, IsUrl, Matches } from 'class-validator';
import { UserSex } from '../../../domain/enums/usersex.enum';

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

export class SignUpBodyDTO {
  @Matches(/^[a-zA-Z]{3,}$/, {
    message: 'firstName must be at least 3 characters long.',
  })
  firstName: string;

  @Matches(/^[a-zA-Z]{3,}$/, {
    message: 'lastName must be at least 3 characters long.',
  })
  lastName: string;

  @IsString()
  biography: string;

  @IsEnum(UserSex)
  sex: UserSex;

  @IsUrl()
  pictureURL: string;

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
