export interface UserInterface {
  id: string;
  username: string;
  fullname: string;
  firstName?: string;
  lastName?: string;
  pictureURL: string;
  fans: number;
  heroes: number;
  createdAt: string;
  updatedAt?: string;
}


export interface UserRegisterInterface {
  username: string;
  firstName: string;
  lastName: string;
  pictureURL: string;
  password: string;
  biography: string;
  sex: 'MALE' | 'FEMALE'
}