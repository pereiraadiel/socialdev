import { useEffect, useState } from 'react';
import MainTemplate from '../templates/main.template';
import Post from '../organisms/post.organism';
import Pagination from '../molecules/pagination.molecule';
import FloatButton from '../atoms/float-button.atom';
import NewPostModalOrganism from '../organisms/new-post-modal.organism';
import { ApiIntegration } from '../../integrations/api.integration';
import { PostInterface } from '../../interfaces/post.interface';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const navigate = useNavigate();
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      ApiIntegration.getPosts().then(response => {
        setPosts(response);
      }).catch((error) => {
        console.error(error)
        if(error.message === 'Você não está autenticado, por favor faça login') {
          navigate('/sign/in');
        }
      });
    };
    fetchPosts();
  }, [navigate]);

  const totalPages = Math.ceil(posts.length / postsPerPage);
	const [displayedPosts, setDisplayedPosts] = useState<typeof posts>([]);
  const [openNewPostModal, setOpenNewPostModal] = useState(false);

	useEffect(() => {
		setDisplayedPosts([])
		setDisplayedPosts(posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage));
	}, [currentPage, posts])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const userHasLikedPost = (postId: string) => {
    return postId === 'asfsao';
  }

  return (
    <MainTemplate>
      {displayedPosts.map((post) => (
        <Post key={post.id} post={post} isLiked={userHasLikedPost(post.id)} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <FloatButton text='Novo post' onClick={() => setOpenNewPostModal(true)}/>
      <NewPostModalOrganism isOpen={openNewPostModal} onClose={() => {setOpenNewPostModal(false)}}/>
    </MainTemplate>
  );
};

export default HomePage;
