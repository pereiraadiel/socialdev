import { UserInterface } from "./user.interface";

export interface PostInterface {
	id: string;
  title: string;
  content: string;
  likes: number;
  likedBy: UserInterface[];
  slug: string;
  createdAt: string;
  owner: UserInterface;
  updatedAt?: string;
}
