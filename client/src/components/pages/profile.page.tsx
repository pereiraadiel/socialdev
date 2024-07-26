import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileTemplate from '../templates/profile.template';
import Post from '../organisms/post.organism';
import Pagination from '../molecules/pagination.molecule';
import Loader from '../atoms/loader.atom';
import { ApiIntegration } from '../../integrations/api.integration';
import { UserInterface } from '../../interfaces/user.interface';
import { PostInterface } from '../../interfaces/post.interface';
import FriendsModalOrganism from '../organisms/friends-modal.organism';

const useProfileData = (username: string) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [profilePosts, setProfilePosts] = useState<PostInterface[]>([]);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await ApiIntegration.getUser(username);
      setUser(response);
    } catch (error) {
      console.error(error);
    }
  }, [username]);

  const fetchPosts = useCallback(async (userId: string) => {
    try {
      const response = await ApiIntegration.getPostsByOwnerId(userId);
      setProfilePosts(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (username) {
      fetchProfile();
    }
  }, [username, fetchProfile]);

  useEffect(() => {
    if (user) {
      fetchPosts(user.id);
    }
  }, [user, fetchPosts]);

  return { user, profilePosts, setProfilePosts };
};

const ProfilePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [localUsername, setLocalUsername] = useState('');
  const { username } = useParams();
  const navigate = useNavigate();
  const postsPerPage = 5;

  const { user, profilePosts, setProfilePosts } = useProfileData(username || '');
  const isOwnProfile = username === localUsername;
  const [openFriendsModal, setOpenFriendsModal] = useState(false);
  const [friendsModalTitle, setFriendsModalTitle] = useState('');
  const [friends, setFriends] = useState<UserInterface[]>([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('@socialdev:username');
    if (!storedUsername) {
      navigate('/sign/in');
    } else {
      setLocalUsername(storedUsername);
    }
  }, [navigate]);

  const totalPages = Math.ceil(profilePosts.length / postsPerPage);
  const displayedPosts = profilePosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleToggleLike = async (isLiked: boolean, post: PostInterface) => {
    if(!user) return;

    post.likedBy = isLiked 
      ? post.likedBy.filter((like) => like.username !== localUsername) 
      : [...post.likedBy, user];
    
    const posts = profilePosts.filter((p) => (p.id === post.id))
    console.log('posts: ', posts);
    setProfilePosts([...posts, post]);
  };
  

  const handleMyFansClick = () => {
    if (!user) return;
    ApiIntegration.getFans(user.id)
      .then((fans) => {
        setFriends(fans);
        setFriendsModalTitle('Meus Fãs');
        setOpenFriendsModal(true);
      })
      .catch();
  };

  const handleMyHeroesClick = () => {
    if (!user) return;
    ApiIntegration.getHeroes(user.id)
      .then((heroes) => {
        setFriends(heroes);
        setFriendsModalTitle('Meus Heróis');
        setOpenFriendsModal(true);
      })
      .catch();
  };

  const userHasLikedPost = (post: PostInterface) => {
    const loggedUsername = localStorage.getItem('@socialdev:username');
    return post.likedBy.some(like => like.username === loggedUsername);
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <ProfileTemplate
      user={user}
      isOwnProfile={isOwnProfile}
      onClickMyFans={handleMyFansClick}
      onClickMyHeroes={handleMyHeroesClick}
    >
      {displayedPosts.map((post) => (
        <Post key={post.id} post={post} onToggleLike={(isLiked) => handleToggleLike(isLiked, post)} isLiked={userHasLikedPost(post)} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <FriendsModalOrganism
        isOpen={openFriendsModal}
        onClose={() => setOpenFriendsModal(false)}
        friends={friends}
        title={friendsModalTitle}
      />
    </ProfileTemplate>
  );
};

export default ProfilePage;
