import { Link } from 'react-router-dom';
import MainTemplate from '../templates/main.template';

const NoMatchPage = () => {
  return (
    <MainTemplate >
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl mb-8">404 | Page Not Found</h1>
        <Link to="/" className='text-xl my-4 bg-blue-500 p-2 rounded-lg uppercase text-white'>Go Back to Home Page</Link>
      </div>
    </MainTemplate>
  );
};

export default NoMatchPage;
