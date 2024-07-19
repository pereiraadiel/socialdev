import { useEffect, useState, useCallback } from 'react';
import MainTemplate from '../templates/main.template';
import Post from '../organisms/post.organism';
import Pagination from '../molecules/pagination.molecule';
import FloatButton from '../atoms/float-button.atom';
import NewPostModalOrganism from '../organisms/new-post-modal.organism';
import { ApiIntegration } from '../../integrations/api.integration';
import { PostInterface } from '../../interfaces/post.interface';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../../interfaces/user.interface';
import SuggestedHeroesOrganism from '../organisms/suggested-heroes.organism';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [suggestedHeroes, setSuggestedHeroes] = useState<UserInterface[]>([]);
  const navigate = useNavigate();
  const postsPerPage = 5;

  const fetchPosts = useCallback(async () => {
    ApiIntegration.getPosts().then(response => {
      setPosts(response);
    }).catch((error) => {
      console.error(error);
      if (error.message === 'Você não está autenticado, por favor faça login') {
        ApiIntegration.refreshAuthentication()
        .then(() => {
          fetchPosts().catch(() => {
            alert('Erro ao buscar posts, por favor tente novamente')
          })
        })
        .catch(() => {
          ApiIntegration.logout();
          navigate('/sign/in');
        });
      }
    });
  }, [navigate]);

  const fetchSuggestedHeroes = useCallback(async () => {
    ApiIntegration.getSuggestedHeroes().then(response => {
      setSuggestedHeroes(response);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    Promise.all([fetchPosts(), fetchSuggestedHeroes()]);
  }, [fetchPosts, fetchSuggestedHeroes]);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const [displayedPosts, setDisplayedPosts] = useState<typeof posts>([]);
  const [openNewPostModal, setOpenNewPostModal] = useState(false);

  useEffect(() => {
    setDisplayedPosts([]);
    setDisplayedPosts(posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage));
  }, [currentPage, posts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const userHasLikedPost = (post: PostInterface) => {
    const loggedUsername = localStorage.getItem('@socialdev:username');
    return post.likedBy.some(like => like.username === loggedUsername);
  };

  const handleToggleLike = async () => {
    await fetchPosts();
  };

  return (
    <MainTemplate>
      {suggestedHeroes.length > 0 && <SuggestedHeroesOrganism users={suggestedHeroes} />}
      {displayedPosts.map((post) => (
        <Post key={post.id} post={post} isLiked={userHasLikedPost(post)} onToggleLike={handleToggleLike} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <FloatButton text='Novo post' onClick={() => setOpenNewPostModal(true)} />
      <NewPostModalOrganism isOpen={openNewPostModal} onClose={() => { setOpenNewPostModal(false); }} />
    </MainTemplate>
  );
};

export default HomePage;
