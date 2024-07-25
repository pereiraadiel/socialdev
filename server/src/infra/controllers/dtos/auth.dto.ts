import { IsEnum, IsJWT, IsString, IsUrl, Matches } from 'class-validator';
import { UserSex } from '../../../domain/enums/usersex.enum';

export class SignInBodyDTO {
  @Matches(/^[a-zA-Z0-9]{4,}$/, {
    message: 'o usuário deve ter pelo menos 4 caracteres.',
  })
  username: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'a senha deve conter pelo menos 1 letra e 1 número e ter pelo menos 8 caracteres.',
  })
  password: string;
}

export class SignUpBodyDTO {
  @Matches(/^[a-zA-Z]{3,}$/, {
    message: 'o nome deve ter pelo menos 3 caracteres.',
  })
  firstName: string;

  @Matches(/^[a-zA-Z]{3,}$/, {
    message: 'o sobrenome deve ter pelo menos 3 caracteres.',
  })
  lastName: string;

  @IsString({
    message: 'a biografia deve ser preenchida',
  })
  biography: string;

  @IsEnum(UserSex)
  sex: UserSex;

  @IsUrl()
  pictureURL: string;

  @Matches(/^[a-zA-Z0-9]{4,}$/, {
    message: 'o usuário deve ter pelo menos 4 caracteres.',
  })
  username: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'a senha deve conter pelo menos 1 letra e 1 número e ter pelo menos 8 caracteres.',
  })
  password: string;
}

export class RefreshTokenBodyDTO {
  @IsJWT()
  refreshToken: string;
}
