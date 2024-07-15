import { useState } from "react";
import { PostInterface } from "../../interfaces/post.interface";
import PostAuthor from "../molecules/post-author.molecule";
import { useNavigate } from "react-router-dom";

type PostProps = {
  post: PostInterface;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const handleNavigateToProfile = () => {
    navigate(`/u/${post.author.username}`);
  }

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4 relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isHovered && (
        <PostAuthor user={post.author} className="absolute bottom-0 left-[50%] translate-x-[-50%]" onClick={handleNavigateToProfile}/>
      )}
      <div className="font-bold text-lg">{post.title}</div>
      <div className="text-gray-700">{post.content}</div>
    </div>
  )
};

export default Post;
