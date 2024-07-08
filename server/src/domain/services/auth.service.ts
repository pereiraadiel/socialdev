import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  USERS_REPOSITORY,
  UsersRepository,
} from '../repositories/users.repository';
import { CryptUtil } from '../../utils/crypt.util';
import { UserViewer, UserViewerType } from '../viewers/user.viewer';
import { TokenUtil } from '../../utils/token.util';
import { TokenExpiredError } from 'jsonwebtoken';
import { SignUpBodyDTO } from '../../infra/controllers/dtos/auth.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userRepository: UsersRepository,
    private readonly userViewer: UserViewer,
  ) {}

  async login(username: string, password: string) {
    try {
      const user = await this.userRepository.findByUsername(username);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const passwordMatch = await CryptUtil.compare(password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = this.userViewer.setUser(user).payloadResponse();
      const accessToken = TokenUtil.sign(payload);
      const refreshToken = TokenUtil.sign(payload, '3d');

      return {
        token: {
          access: accessToken,
          refresh: refreshToken,
        },
        user: payload,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnprocessableEntityException();
    }
  }

  async register(dto: SignUpBodyDTO) {
    try {
      const entity = new UserEntity(dto);
      const userExists = await this.userRepository.findByUsername(
        entity.username,
      );
      if (userExists) {
        throw new ConflictException('Username already exists');
      }

      const password = await CryptUtil.hash(entity.password);
      delete entity.password;

      const user = await this.userRepository.create({
        ...entity,
        password,
      });

      return this.userViewer.setUser(user).response();
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error);
      }
      throw new UnprocessableEntityException();
    }
  }

  async refresh(refreshToken: string) {
    try {
      const isTokenValid = TokenUtil.validate(refreshToken);
      if (!isTokenValid) {
        throw new UnauthorizedException();
      }
      const payload = isTokenValid as UserViewerType;

      delete payload['iat'];
      delete payload['exp'];

      const newAccessToken = TokenUtil.sign(payload);
      const newRefreshToken = TokenUtil.sign(payload, '3d');

      return {
        token: {
          access: newAccessToken,
          refresh: newRefreshToken,
        },
        user: payload,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnprocessableEntityException();
    }
  }

  async validateUser(token: string) {
    try {
      const isTokenValid = TokenUtil.validate(token);
      if (!isTokenValid) {
        throw new UnauthorizedException();
      }
      const payload = isTokenValid as UserViewerType;

      const user = await this.userRepository.findById(payload.id);
      return this.userViewer.setUser(user).response();
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnprocessableEntityException();
    }
  }
}
