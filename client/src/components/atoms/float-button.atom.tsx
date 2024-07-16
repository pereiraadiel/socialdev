import { Plus } from 'lucide-react';
import React from 'react';

type FloatButtonProps = {
	onClick?: () => void;
  className?: string;
	text?: string
};

const FloatButton: React.FC<FloatButtonProps> = ({ onClick, className, text }) => (
  <button 
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center fixed right-[5%] bottom-[5%] ${className}`}
    onClick={onClick}
    type='button'
  >
    <Plus/>
		<p className='ml-1 uppercase'>{text}</p>
  </button>
);

export default FloatButton;
