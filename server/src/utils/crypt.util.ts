import * as bcrypt from 'bcrypt';

export class CryptUtil {
  static async hash(password: string) {
    return bcrypt.hash(password, 12);
  }

  static async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
