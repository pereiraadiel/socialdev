import MainTemplate from './main.template';
import ProfileHeader from '../organisms/profile-header.organism';
import { UserInterface } from '../../interfaces/user.interface';

type ProfileTemplateProps = {
	user: UserInterface,
	children: React.ReactNode;
	isOwnProfile: boolean;
	onClickMyFans?: () => void;
	onClickMyHeroes?: () => void;
};

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ user, children, isOwnProfile, onClickMyFans, onClickMyHeroes }) => (
  <MainTemplate>
    <ProfileHeader user={user} isOwnProfile={isOwnProfile} onClickMyFans={onClickMyFans} onClickMyHeroes={onClickMyHeroes} />
		<h2 className='text-lg mt-8 mb-2'>Publicações</h2>
    {children}
  </MainTemplate>
);

export default ProfileTemplate;
