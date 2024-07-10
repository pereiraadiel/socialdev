export class RequestWithUser extends Request {
  user: {
    id: string;
    username: string;
  };
}
