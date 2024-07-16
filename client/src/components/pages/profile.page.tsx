import React, { useState, useMemo, useEffect } from 'react';
import ProfileTemplate from '../templates/profile.template';
import Post from '../organisms/post.organism';
import Pagination from '../molecules/pagination.molecule';
import { useNavigate, useParams } from 'react-router-dom';
import { UserInterface } from '../../interfaces/user.interface';
import { ApiIntegration } from '../../integrations/api.integration';
import Loader from '../atoms/loader.atom';

const ProfilePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [username, setUsername] = useState('');
  const params = useParams();
  const [user, setUser] = useState<UserInterface | null>(null);
  const navigate = useNavigate();
  const postsPerPage = 5;

  const isOwnProfile = params.username === username;

  useEffect(() => {
    const response = localStorage.getItem('@socialdev:username');
    if(!response) {
      navigate('/sign/in');
      return;
    } 
    setUsername(response);
  }, [navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      ApiIntegration.getUser(params.username)
      .then(response => {
        setUser(response);
      })
      .catch((error) => { 
        console.error(error)
       })
    };
    // pictureURL: 'https://eu.ui-avatars.com/api/?name=Adiel+Pereira&size=200'
    fetchProfile();
  }, [username, params]);


  // Mock posts data for profile
  const profilePosts = useMemo(() => [], []);

  const totalPages = Math.ceil(profilePosts.length / postsPerPage);
  const displayedPosts = profilePosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!user) {
    return <Loader/>;
  }

  return (
    <ProfileTemplate user={user} isOwnProfile={isOwnProfile}>
      {displayedPosts.map((post) => (
        <Post key={`post.id`} post={post} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </ProfileTemplate>
  );
};

export default ProfilePage;
