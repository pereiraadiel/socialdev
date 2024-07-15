import React, { useState, useMemo } from 'react';
import ProfileTemplate from '../templates/profile.template';
import Post from '../organisms/post.organism';
import Pagination from '../molecules/pagination.molecule';

const ProfilePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const user = {
		id: 'a',
    fullname: 'Adiel Pereira',
    username: 'adiel',
		fans: 1,
		heroes: 2,
		createdAt: '2021-01-01T00:00:00Z',
		updatedAt: '2021-01-01T00:00:00Z',
    pictureURL: 'https://eu.ui-avatars.com/api/?name=Adiel+Pereira&size=200'
  };

  // Mock posts data for profile
  const profilePosts = useMemo(() => [
    {id: 'asfsao', author: {
      id: 'dasfasf',
      username: 'adiel',
      fullname: 'Adiel Pereira',
      pictureURL: 'https://picsum.photos/seed/adiel/200/200',
      fans: 2,
      heroes: 1,
      createdAt: '',
      updatedAt: ''
    }, title: 'Primeiro post', content: 'Conteudo do primeiro post'}
  ], []);

  const totalPages = Math.ceil(profilePosts.length / postsPerPage);
  const displayedPosts = profilePosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ProfileTemplate user={user} isOwnProfile>
      {displayedPosts.map((post) => (
        <Post key={post.id} post={post} />
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
