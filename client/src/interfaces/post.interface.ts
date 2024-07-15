import { UserInterface } from "./user.interface";

export interface PostInterface {
	id: string;
  author: UserInterface;
  title: string;
  content: string;
}
