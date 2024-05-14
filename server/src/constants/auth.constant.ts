import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined');
  process.exit(1);
}

export const AuthConstants = {
  secret: process.env.JWT_SECRET,
} as const;
