type UserAvatarProps = {
	src: string;
	alt: string;
  size?: 'sm' | 'md' | 'lg';
};

const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  }
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`rounded-full ${sizeClasses[size]}`}
    />
  )
};

export default UserAvatar;
