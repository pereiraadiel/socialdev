export const UserSex = {
  MALE: 0,
  FEMALE: 1,
};

export type UserSex = (typeof UserSex)[keyof typeof UserSex];
