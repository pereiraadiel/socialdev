import React from 'react';

type ButtonProps = {
	text: string;
  type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, className, type = 'submit' }) => (
  <button 
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);

export default Button;
