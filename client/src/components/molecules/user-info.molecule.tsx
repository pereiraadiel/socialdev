import { UserInterface } from '../../interfaces/user.interface';
import UserAvatar from '../atoms/user-avatar.atom';

type UserInfoProps = {
	user: UserInterface
};

const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <div className="flex items-center space-x-4">
    <UserAvatar src={user.pictureURL} alt={`${user.fullname}'s avatar`} />
    <div>
      <h2 className="text-xl font-bold">{user.fullname}</h2>
      <p className="text-gray-600">@{user.username}</p>
    </div>
  </div>
);

export default UserInfo;
