import * as jwt from 'jsonwebtoken';
import { AuthConstants } from '../constants/auth.constant';

export class TokenUtil {
  static sign(payload: any, expiresIn: string = '1d') {
    return jwt.sign(payload, AuthConstants.secret, {
      expiresIn,
    });
  }

  static validate(token: string) {
    return jwt.verify(token, AuthConstants.secret);
  }

  static decode(token: string) {
    return jwt.decode(token);
  }
}
