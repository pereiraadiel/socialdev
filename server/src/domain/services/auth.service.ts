import {
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CryptUtil } from '../../utils/crypt.util';
import { UserViewer, UserViewerType } from '../viewers/user.viewer';
import JWT from 'jsonwebtoken';
import { AuthConstants } from '../../constants/auth.constant';

export class AuthService {
  constructor(
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

      const payload = this.userViewer.setUser(user).maskedResponse();
      const token = JWT.sign(payload, AuthConstants.secret, {
        expiresIn: '1d',
      });

      return {
        token,
        user: payload,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnprocessableEntityException();
    }
  }

  async validateUser(token: string) {
    try {
      const isTokenValid = JWT.verify(token, AuthConstants.secret);
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
