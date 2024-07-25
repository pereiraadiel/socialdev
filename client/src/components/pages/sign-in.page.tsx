import { FormEvent, useEffect, useState } from 'react';
import InputField from '../atoms/input-field.atom';
import Button from '../atoms/button.atom';
import Form from '../molecules/form.molecule';
import { Link, useNavigate } from 'react-router-dom';
import { ApiIntegration } from '../../integrations/api.integration';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
	const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
		setIsLoading(true);
    ApiIntegration.authenticateUser(username, password)
      .then(response => {
        setIsLoading(false);
        setIsLogged(true);
        window.location.reload();
      })
      .catch(error => { 
        console.error(error) 
        setIsLoading(false)
      });
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('@socialdev:username');
    if (storedUsername) {
      setIsLogged(true);
    }
  }, []);

  if(isLogged) {
    navigate('/');
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Form onSubmit={handleSubmit} isLoading={isLoading}>
        <h2 className="text-2xl font-bold mb-6 text-center">SocialDEV</h2>
        <InputField 
          label="Usuário" 
          type="text" 
          name="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <InputField 
          label="Senha" 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
				<div className='flex items-center'>
					<Button text="Entrar" type="submit" className='flex-1'/>
					<Link to="/sign/up" className='text-blue-500 font-bold ml-4'>Registrar-se</Link>
				</div>
      </Form>
    </div>
  );
};

export default SignInPage;
