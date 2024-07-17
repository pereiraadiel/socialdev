import { useState } from "react";
import { PostInterface } from "../../interfaces/post.interface";
import PostAuthor from "../molecules/post-author.molecule";
import { useNavigate } from "react-router-dom";
import { Heart, HeartCrack } from "lucide-react";
import { ApiIntegration } from "../../integrations/api.integration";

type PostProps = {
  post: PostInterface;
  isLiked?: boolean;
  onToggleLike?: (isLiked: boolean) => void;
}

const Post: React.FC<PostProps> = ({ post, isLiked = false, onToggleLike }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const handleNavigateToProfile = () => {
    navigate(`/u/${post.owner.username}`);
  }

  const handleLike = () => {
    ApiIntegration.likePost(post.id)
    .then(() => {
      onToggleLike && onToggleLike(true);
    })
    .catch((error) => {
      console.error(error)
    });
  }

  const handleUnlike = () => {
    ApiIntegration.unlikePost(post.id)
    .then(() => {
      onToggleLike && onToggleLike(false);
    })
    .catch((error) => {
      console.error(error)
    });
  }

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4 relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isHovered && (
        <PostAuthor user={post.owner} className="absolute bottom-0 left-[50%] translate-x-[-50%]" onClick={handleNavigateToProfile}/>
      )}
      <div className="font-bold text-lg">{post.title}</div>
      <div className="text-gray-700">{post.content}</div>

      <div className="flex items-center mt-2">
        {isLiked ? (
          <HeartCrack color="#09f" fill="#05f" className="cursor-pointer" onClick={handleUnlike}/>
        ) : (
          <Heart color="#09f" className="cursor-pointer" onClick={handleLike}/>
        )}
        <p className="ml-2">{post.likes} curtidas</p>
      </div>
    </div>
  )
};

export default Post;
