import { useEffect, useMemo, useState } from 'react';
import MainTemplate from '../templates/main.template';
import Post from '../organisms/post.organism';
import Pagination from '../molecules/pagination.molecule';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const posts = useMemo(() => [
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

  const totalPages = Math.ceil(posts.length / postsPerPage);
	const [displayedPosts, setDisplayedPosts] = useState<typeof posts>([]);

	useEffect(() => {
		setDisplayedPosts([])
		setDisplayedPosts(posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage));
	}, [currentPage, posts])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <MainTemplate>
      {displayedPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </MainTemplate>
  );
};

export default HomePage;
