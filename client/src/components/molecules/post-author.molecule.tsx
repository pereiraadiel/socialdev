import { UserInterface } from '../../interfaces/user.interface';
import UserAvatar from '../atoms/user-avatar.atom';

type PostAuthorProps = {
	user: UserInterface,
	className?: string;
	onClick?: () => void;
};

const PostAuthor: React.FC<PostAuthorProps> = ({ user, className, onClick }) =>  {
	if(!user) {
		return null
	}
	return (
		<div className={`flex items-center space-x-4 bg-gray-100 w-[240px] p-1 rounded-lg ${className} cursor-pointer`} onClick={onClick}>
			<UserAvatar src={user.pictureURL} alt={`${user.fullname}'s avatar`} size='sm' />
			<div>
				<h2 className="text-md font-semibold text-gray-600">{user.fullname}</h2>
				<p className="text-gray-500 text-sm">@{user.username}</p>
			</div>
		</div>
	)
};

export default PostAuthor;
