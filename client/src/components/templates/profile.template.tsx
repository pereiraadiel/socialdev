import MainTemplate from './main.template';
import ProfileHeader from '../organisms/profile-header.organism';
import { UserInterface } from '../../interfaces/user.interface';

type ProfileTemplateProps = {
	user: UserInterface,
	children: React.ReactNode;
	isOwnProfile: boolean;
};

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ user, children, isOwnProfile }) => (
  <MainTemplate>
    <ProfileHeader user={user} isOwnProfile={isOwnProfile} />
		<h2 className='text-lg mt-8 mb-2'>Publicações</h2>
    {children}
  </MainTemplate>
);

export default ProfileTemplate;
