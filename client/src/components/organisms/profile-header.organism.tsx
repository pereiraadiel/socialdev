import { Heart, HeartOff, Star } from 'lucide-react';
import UserInfo from '../molecules/user-info.molecule';
import { useState } from 'react';
import { UserInterface } from '../../interfaces/user.interface';

type ProfileHeaderProps = {
	user: UserInterface,
	isOwnProfile: boolean
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isOwnProfile }) => {

	const [loggedUserIsFan, setLoggedUserIsFan] = useState(false);
	
	const handleFanClick = () => {
		setLoggedUserIsFan(!loggedUserIsFan);
	}

	return (
		<>
		<div className="bg-white shadow-md rounded p-4 mb-4 flex items-center justify-between relative">
			<UserInfo user={user} />
	
			<div className='flex'>
				<div className='bg-gray-100 p-2 rounded-lg mx-2 flex flex-col items-center w-[140px]'>
					<p className='flex items-center mx-2 mb-2'>
						<Heart className='mx-2'/>
						Fãs
					</p>
					<span className="ml-2 text-2xl">{user.fans}</span>
				</div>
				<div className='bg-gray-100 p-2 rounded-lg flex flex-col items-center w-[140px]'>
					<p className='flex items-center mx-2 mb-2'>
						<Star className='mx-2'/>
						Heróis
					</p>
					<span className="ml-2 text-2xl">{user.heroes}</span>
				</div>
			</div>
	
			{!isOwnProfile && (
				<button className='bg-blue-500 text-white px-4 py-2 rounded-lg absolute bottom-[-20%] left-[50%] translate-x-[-50%] uppercase flex items-center' onClick={handleFanClick}>
					{	loggedUserIsFan ? (
						<>
							<HeartOff className='mx-2'/>
							<p className='text-lg font-semibold'>
								Deixe de ser um fã
							</p>
						</>
					)
					: (
						<>
							<Heart className='mx-2'/>
							<p className='text-lg font-semibold'>
								Seja um fã
							</p>
						</>
					)
				}
				</button>
			)}
		</div>
		</>
	)
};

export default ProfileHeader;
