export const UserSex = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
} as const;

export type UserSex = (typeof UserSex)[keyof typeof UserSex];
