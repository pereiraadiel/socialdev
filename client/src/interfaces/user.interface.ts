export interface UserInterface {
  id: string;
  username: string;
  fullname: string;
  pictureURL: string;
  fans: number;
  heroes: number;
  createdAt: string;
  updatedAt?: string;
}
